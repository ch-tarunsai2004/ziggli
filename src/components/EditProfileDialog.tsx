import { useState, useEffect } from "react";
import { Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileDialog = ({ isOpen, onClose }: EditProfileDialogProps) => {
  const { user, profile, updateProfile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    bio: "",
    website: "",
    location: "",
    birthday: "",
    avatar: ""
  });

  useEffect(() => {
    if (profile && isOpen) {
      setFormData({
        username: profile.username || "",
        displayName: profile.full_name || "",
        bio: profile.bio || "",
        website: "",
        location: "",
        birthday: "",
        avatar: profile.avatar_url || ""
      });
    }
  }, [profile, isOpen]);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
      const filePath = `${user?.id}/${fileName}`;

      console.log('Starting avatar upload...', { filePath, fileSize: file.size });

      // Upload without timeout - let it take the time it needs
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error('Avatar upload error:', uploadError);
        throw uploadError;
      }

      console.log('Avatar upload successful, getting public URL...');

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (!data?.publicUrl) {
        throw new Error('Failed to get public URL for uploaded image');
      }

      console.log('Avatar upload complete:', data.publicUrl);
      setFormData({ ...formData, avatar: data.publicUrl });
      toast.success('Avatar uploaded successfully!');
      
      // Reset the file input
      event.target.value = '';
      
    } catch (error: any) {
      console.error('Avatar upload error:', error);
      toast.error(error.message || 'Failed to upload avatar');
      
      // Reset the file input on error
      event.target.value = '';
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { error } = await updateProfile({
        username: formData.username,
        full_name: formData.displayName,
        bio: formData.bio,
        avatar_url: formData.avatar,
      });

      if (error) throw error;
      
      // Force a profile refresh to ensure UI updates
      await refreshProfile();
      
      toast.success('Profile updated successfully!');
      onClose();
    } catch (error: any) {
      console.error('Save profile error:', error);
      toast.error(error.message || 'Failed to save profile changes');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = () => {
    document.getElementById('avatar-upload')?.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information and customize your appearance.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={formData.avatar || "/api/placeholder/100/100"} alt="Profile" />
                <AvatarFallback>
                  {formData.displayName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="secondary"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                onClick={handleAvatarChange}
                disabled={uploading}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={uploadAvatar}
              style={{ display: 'none' }}
            />
            <Button variant="outline" size="sm" onClick={handleAvatarChange} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Change Profile Photo'}
            </Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                placeholder="Enter display name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell people about yourself"
                className="min-h-[80px] resize-none"
                maxLength={150}
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.bio.length}/150
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://yourwebsite.com"
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Where are you based?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthday">Birthday</Label>
              <Input
                id="birthday"
                type="date"
                value={formData.birthday}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSave} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;