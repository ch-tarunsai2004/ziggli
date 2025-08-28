import { useState, useEffect } from "react";
import { Edit, Users, Video, Grid, Tag, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SettingsDialog from "@/components/SettingsDialog";
import EditProfileDialog from "@/components/EditProfileDialog";
import { useAuth } from "@/contexts/AuthContext";

const mockVideos = [
  {
    id: "1",
    thumbnail: "/api/placeholder/300/200",
    title: "Intro to React",
    views: "15K",
    duration: "12:34",
    isShort: false,
  },
  {
    id: "2",
    thumbnail: "/api/placeholder/300/200",
    title: "CSS Tips & Tricks",
    views: "10K",
    duration: "8:20",
    isShort: true,
  },
  {
    id: "3",
    thumbnail: "/api/placeholder/300/200",
    title: "Advanced TypeScript",
    views: "5K",
    duration: "1:23:45",
    isShort: false,
  },
];

const mockTaggedVideos = [
  {
    id: "t1",
    thumbnail: "/api/placeholder/300/200",
    title: "Collab: Building Apps Together",
    views: "67K",
    duration: "18:26",
    isShort: false,
  },
  {
    id: "t2",
    thumbnail: "/api/placeholder/300/200",
    title: "Design Review Session",
    views: "23K",
    duration: "25:12",
    isShort: false,
  },
];



const Profile = () => {
  const { profile, loading, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<"videos" | "shorts" | "tagged">("videos");
  const [showSettings, setShowSettings] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Fallback timeout to prevent infinite loading
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.warn('Profile loading timeout - showing fallback');
        setLoadingTimeout(true);
      }
    }, 3000); // 3 second timeout

    return () => clearTimeout(timeoutId);
  }, [loading]);

  // Reset timeout when loading changes
  useEffect(() => {
    if (!loading) {
      setLoadingTimeout(false);
    }
  }, [loading]);

  const filteredVideos =
    activeTab === "videos"
      ? mockVideos.filter((v) => !v.isShort)
      : activeTab === "shorts"
      ? mockVideos.filter((v) => v.isShort)
      : mockTaggedVideos;

  // Get display name from profile or fallback to username or default
  const getDisplayName = () => {
    if (profile?.full_name) return profile.full_name;
    if (profile?.username) return profile.username;
    return "Your Username";
  };

  // Get avatar URL from profile or fallback
  const getAvatarUrl = () => {
    if (profile?.avatar_url) {
      // Add timestamp to prevent caching issues with updated avatars
      return profile.avatar_url.includes('?') 
        ? profile.avatar_url 
        : `${profile.avatar_url}?t=${profile.updated_at || Date.now()}`;
    }
    return "";
  };

  // Get initials for avatar fallback
  const getInitials = () => {
    const displayName = getDisplayName();
    if (displayName && displayName !== "Your Username") {
      return displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return "U";
  };

  if (loading && !loadingTimeout) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show fallback content if loading times out
  if (loadingTimeout) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Loading Timeout</h2>
          <p className="text-muted-foreground mb-4">
            The profile is taking longer than expected to load.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <div className="relative bg-gradient-instagram p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 rounded-full bg-white/20 p-1">
              <Avatar className="w-full h-full">
                <AvatarImage
                  src={getAvatarUrl() || "/api/placeholder/100/100"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                />
                <AvatarFallback>
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{getDisplayName()}</h1>
                              <p className="text-white/90 mb-4">
                  {profile?.bio || "Content creator passionate about tech, design, and coding tutorials. Building the future one video at a time! 🚀"}
                </p>

              {/* Stats */}
              <div className="flex space-x-6 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-white/80 text-sm">Videos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.2K</div>
                  <div className="text-white/80 text-sm">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">892</div>
                  <div className="text-white/80 text-sm">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">156K</div>
                  <div className="text-white/80 text-sm">Likes</div>
                </div>
              </div>
            </div>
          </div>

          <Button variant="secondary" size="icon" onClick={() => setShowSettings(true)}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-4">
          <Button variant="secondary" className="flex-1" onClick={() => setShowEditProfile(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <Users className="h-4 w-4 mr-2" />
            Share Profile
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border z-40">
        <div className="flex space-x-0 overflow-x-auto">
          <Button
            variant={activeTab === "videos" ? "default" : "ghost"}
            onClick={() => setActiveTab("videos")}
            className="flex-1 rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
            data-active={activeTab === "videos"}
          >
            <Video className="h-4 w-4 mr-2" />
            Videos ({mockVideos.filter((v) => !v.isShort).length})
          </Button>
          <Button
            variant={activeTab === "shorts" ? "default" : "ghost"}
            onClick={() => setActiveTab("shorts")}
            className="flex-1 rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
            data-active={activeTab === "shorts"}
          >
            <Grid className="h-4 w-4 mr-2" />
            Shorts ({mockVideos.filter((v) => v.isShort).length})
          </Button>
          <Button
            variant={activeTab === "tagged" ? "default" : "ghost"}
            onClick={() => setActiveTab("tagged")}
            className="flex-1 rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
            data-active={activeTab === "tagged"}
          >
            <Tag className="h-4 w-4 mr-2" />
            Tagged ({mockTaggedVideos.length})
          </Button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-4">
        {activeTab === "shorts" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="relative bg-card rounded-lg overflow-hidden shadow-video hover:shadow-float transition-all duration-300 cursor-pointer aspect-[9/16]"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-sm font-medium line-clamp-2 mb-1">
                    {video.title}
                  </p>
                  <p className="text-white/80 text-xs">{video.views} views</p>
                </div>
                <div className="absolute top-2 right-2">
                  <Video className="h-4 w-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-card rounded-lg overflow-hidden shadow-video hover:shadow-float transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Video className="h-12 w-12 text-white opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold line-clamp-2 mb-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">{video.views} views</p>
                  {activeTab === "tagged" && (
                    <Button variant="secondary" className="mt-2 text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      Collaboration
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Video className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No {activeTab} yet</h3>
            <p className="text-muted-foreground mb-4">
              {activeTab === "videos" && "Upload your first video to get started!"}
              {activeTab === "shorts" && "Create your first short video!"}
              {activeTab === "tagged" && "No tagged collaborations yet."}
            </p>
            <Button>
              {activeTab === "tagged" ? "Discover Creators" : "Create Content"}
            </Button>
          </div>
        )}
      </div>

      <SettingsDialog isOpen={showSettings} onClose={() => setShowSettings(false)} />

      <EditProfileDialog 
        isOpen={showEditProfile} 
        onClose={() => {
          setShowEditProfile(false);
          // Force refresh the profile data after editing
          refreshProfile();
        }} 
      />
    </div>
  );
};

export default Profile;
