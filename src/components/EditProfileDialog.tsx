import { useState, useEffect } from "react";
import { Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    displayName: "",
    bio: "",
    website: "",
    location: "",
    birthday: "",
    avatar: ""
  });

  useEffect(() => {
    if (user && isOpen) {
      fetchProfile();
    }
  }, [user, isOpen]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      toast.error('Failed to load profile');
      return;
    }

    if (data) {
      setProfile({
        username: data.username || '',
        displayName: data.full_name || '',
        bio: data.bio || '',
        website: '',
        location: '',
        birthday: '',
        avatar: data.avatar_url || ''
      });
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}.${fileExt}`;
      const filePath = `${user?.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setProfile({ ...profile, avatar: data.publicUrl });
      toast.success('Avatar uploaded successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          username: profile.username,
          full_name: profile.displayName,
          bio: profile.bio,
          avatar_url: profile.avatar,
        });

      if (error) throw error;

      toast.success('Profile updated successfully!');
      onClose();
    } catch (error: any) {
      toast.error(error.message);
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
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar || "/api/placeholder/100/100"} alt="Profile" />
                <AvatarFallback>
                  {profile.displayName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
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
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                placeholder="Enter username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={profile.displayName}
                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                placeholder="Enter display name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Tell people about yourself"
                className="min-h-[80px] resize-none"
                maxLength={150}
              />
              <p className="text-xs text-muted-foreground text-right">
                {profile.bio.length}/150
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                placeholder="https://yourwebsite.com"
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                placeholder="Where are you based?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthday">Birthday</Label>
              <Input
                id="birthday"
                type="date"
                value={profile.birthday}
                onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
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