import { useState } from "react";
import { Camera, Video, Users, Upload, Zap, Settings, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const createOptions = [
  {
    icon: Camera,
    title: "Create Story",
    description: "Share a moment with your followers",
    color: "bg-gradient-instagram",
    action: "story"
  },
  {
    icon: Video,
    title: "Upload Video",
    description: "Share long-form content",
    color: "bg-blue-500",
    action: "video"
  },
  {
    icon: Zap,
    title: "Create Short",
    description: "Quick vertical videos",
    color: "bg-purple-500",
    action: "short"
  },
  {
    icon: Users,
    title: "Go Live",
    description: "Stream live to your audience",
    color: "bg-red-500",
    action: "live"
  }
];

const Create = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const renderCreateInterface = () => {
    if (!selectedOption) return null;

    switch (selectedOption) {
      case "story":
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>Create Story</span>
              </CardTitle>
              <CardDescription>
                Stories disappear after 24 hours and are perfect for sharing quick moments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Tap to capture or upload a photo/video</p>
                <Button>Choose from Gallery</Button>
              </div>
            </CardContent>
          </Card>
        );

      case "video":
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Video className="h-5 w-5" />
                <span>Upload Video</span>
              </CardTitle>
              <CardDescription>
                Share detailed content with your community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Drag and drop your video here</p>
                <Button>Select Video File</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <input className="w-full mt-1 p-2 border rounded-lg" placeholder="Give your video a title..." />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full mt-1 p-2 border rounded-lg">
                    <option>Gaming</option>
                    <option>Education</option>
                    <option>Entertainment</option>
                    <option>Music</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "short":
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Create Short</span>
              </CardTitle>
              <CardDescription>
                Vertical videos up to 60 seconds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center aspect-[9/16] max-w-xs mx-auto">
                <Zap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Record or upload a vertical video</p>
                <Button>Start Recording</Button>
              </div>
            </CardContent>
          </Card>
        );

      case "live":
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Go Live</span>
              </CardTitle>
              <CardDescription>
                Stream live without OBS - built-in streaming technology
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-instagram rounded-lg p-6 text-white">
                <h3 className="font-semibold mb-2">🎥 Professional Live Streaming</h3>
                <p className="text-white/90 text-sm">
                  Our built-in streaming technology eliminates the need for OBS. 
                  Stream directly from your browser with professional quality.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Stream Title</label>
                  <input className="w-full mt-1 p-2 border rounded-lg" placeholder="What are you streaming today?" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <select className="w-full mt-1 p-2 border rounded-lg">
                      <option>Gaming</option>
                      <option>Just Chatting</option>
                      <option>Music</option>
                      <option>Art</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Quality</label>
                    <select className="w-full mt-1 p-2 border rounded-lg">
                      <option>1080p 60fps</option>
                      <option>720p 60fps</option>
                      <option>720p 30fps</option>
                    </select>
                  </div>
                </div>
                
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  🔴 Start Live Stream
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-instagram bg-clip-text text-transparent mb-2">
            Create Content
          </h1>
          <p className="text-muted-foreground">
            Share your creativity with the world
          </p>
        </div>

        {/* Creation Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {createOptions.map(({ icon: Icon, title, description, color, action }) => (
            <Card 
              key={action}
              className={`cursor-pointer transition-all duration-300 hover:shadow-float ${
                selectedOption === action ? 'ring-2 ring-primary shadow-float' : ''
              }`}
              onClick={() => setSelectedOption(selectedOption === action ? null : action)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Option Interface */}
        {renderCreateInterface()}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-card rounded-lg p-4 text-center shadow-video">
            <div className="text-2xl font-bold text-primary">23</div>
            <div className="text-sm text-muted-foreground">Videos Posted</div>
          </div>
          <div className="bg-card rounded-lg p-4 text-center shadow-video">
            <div className="text-2xl font-bold text-accent">156K</div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </div>
          <div className="bg-card rounded-lg p-4 text-center shadow-video">
            <div className="text-2xl font-bold text-green-500">4.2K</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;