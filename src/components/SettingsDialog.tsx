import { useState } from "react";
import { Moon, Sun, LogOut, User, Users, Shield, Bell, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsDialog = ({ isOpen, onClose }: SettingsDialogProps) => {
  const { theme, setTheme } = useTheme();
  const { signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const handleChangeUsername = () => {
    // Add change username logic here
    console.log("Change username");
    toast.info('Username change feature coming soon!');
    onClose();
  };

  const handleSwitchAccount = () => {
    // Add switch account logic here
    console.log("Switch account");
    toast.info('Account switching feature coming soon!');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Theme Settings */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Appearance</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="text-sm">Dark Mode</span>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
          </div>

          <Separator />

          {/* Account Settings */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Account</h3>
            
            <Button variant="ghost" className="w-full justify-start p-2" onClick={handleChangeUsername}>
              <User className="h-4 w-4 mr-3" />
              Change Username
            </Button>
            
            <Button variant="ghost" className="w-full justify-start p-2" onClick={handleSwitchAccount}>
              <Users className="h-4 w-4 mr-3" />
              Switch Account
            </Button>
          </div>

          <Separator />

          {/* Notifications */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Notifications</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span className="text-sm">Push Notifications</span>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </div>

          <Separator />

          {/* Other Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Support</h3>
            
            <Button variant="ghost" className="w-full justify-start p-2">
              <Shield className="h-4 w-4 mr-3" />
              Privacy Policy
            </Button>
            
            <Button variant="ghost" className="w-full justify-start p-2">
              <HelpCircle className="h-4 w-4 mr-3" />
              Help & Support
            </Button>
          </div>

          <Separator />

          {/* Logout */}
          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
