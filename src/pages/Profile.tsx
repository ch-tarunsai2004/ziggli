import { useState } from "react";
import { Settings, Edit, Users, Video, Tag, Grid, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VideoItem {
  id: string;
  thumbnail: string;
  title: string;
  views: string;
  duration: string;
  isShort: boolean;
}

const mockVideos: VideoItem[] = [
  {
    id: "1",
    thumbnail: "/api/placeholder/300/200",
    title: "React Tutorial Series",
    views: "125K",
    duration: "12:34",
    isShort: false,
  },
  {
    id: "2", 
    thumbnail: "/api/placeholder/300/200",
    title: "CSS Quick Tip",
    views: "89K",
    duration: "0:45",
    isShort: true,
  },
  {
    id: "3",
    thumbnail: "/api/placeholder/300/200", 
    title: "Live Coding Stream",
    views: "45K",
    duration: "1:23:45",
    isShort: false,
  },
];

const mockTaggedVideos: VideoItem[] = [
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
  const [activeTab, setActiveTab] = useState<"videos" | "shorts" | "tagged">("videos");

  const filteredVideos = activeTab === "videos" 
    ? mockVideos.filter(v => !v.isShort)
    : activeTab === "shorts"
    ? mockVideos.filter(v => v.isShort) 
    : mockTaggedVideos;

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <div className="relative bg-gradient-instagram p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 rounded-full bg-white/20 p-1">
              <img
                src="/api/placeholder/100/100"
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-2 border-white"
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">YourUsername</h1>
              <p className="text-white/90 mb-4">
                Content creator passionate about tech, design, and coding tutorials. 
                Building the future one video at a time! 🚀
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
          
          <Button variant="secondary" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3 mt-4">
          <Button variant="secondary" className="flex-1">
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
            Videos ({mockVideos.filter(v => !v.isShort).length})
          </Button>
          <Button
            variant={activeTab === "shorts" ? "default" : "ghost"}
            onClick={() => setActiveTab("shorts")}
            className="flex-1 rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
            data-active={activeTab === "shorts"}
          >
            <Grid className="h-4 w-4 mr-2" />
            Shorts ({mockVideos.filter(v => v.isShort).length})
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
                  <Play className="h-4 w-4 text-white" />
                </div>
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs">
                  Short
                </Badge>
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
                    <Play className="h-12 w-12 text-white opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold line-clamp-2 mb-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">{video.views} views</p>
                  {activeTab === "tagged" && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      Collaboration
                    </Badge>
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
    </div>
  );
};

export default Profile;