import { useState } from "react";
import { Search, TrendingUp, Users, Gamepad2, Music, BookOpen, Palette, Code } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VideoCard } from "@/components/VideoCard";

const categories = [
  { icon: TrendingUp, label: "Trending", color: "bg-red-500" },
  { icon: Users, label: "People", color: "bg-blue-500" },
  { icon: Gamepad2, label: "Gaming", color: "bg-purple-500" },
  { icon: Music, label: "Music", color: "bg-pink-500" },
  { icon: BookOpen, label: "Education", color: "bg-green-500" },
  { icon: Palette, label: "Art", color: "bg-orange-500" },
  { icon: Code, label: "Tech", color: "bg-indigo-500" },
];

const trendingVideos = [
  {
    id: "t1",
    title: "Viral Dance Challenge Goes Wrong",
    creator: "DanceKing",
    avatar: "/api/placeholder/40/40",
    thumbnail: "/api/placeholder/400/225",
    views: "2.3M",
    duration: "1:23",
    likes: 45000,
    isLiked: false,
    isShort: true,
  },
  {
    id: "t2",
    title: "Epic Gaming Montage - Best Moments",
    creator: "ProGamer",
    avatar: "/api/placeholder/40/40",
    thumbnail: "/api/placeholder/400/225",
    views: "890K",
    duration: "8:15",
    likes: 23400,
    isLiked: true,
    isShort: false,
  },
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Trending");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border z-40 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search creators, videos, or friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-12 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map(({ icon: Icon, label, color }) => (
            <Button
              key={label}
              variant={selectedCategory === label ? "default" : "outline"}
              onClick={() => setSelectedCategory(label)}
              className="flex flex-col items-center p-6 h-auto space-y-3 bg-gradient-subtle hover:shadow-video transition-all duration-300"
            >
              <div className={`p-3 rounded-full ${color} text-white`}>
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">{label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Trending Content */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Trending in {selectedCategory}</h2>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>

      {/* Suggested Creators */}
      <div className="px-4 pb-6">
        <h2 className="text-xl font-bold mb-4">Suggested for You</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card rounded-lg p-4 text-center shadow-video hover:shadow-float transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-instagram p-0.5">
                <img 
                  src={`/api/placeholder/60/60`} 
                  alt={`Creator ${i}`}
                  className="w-full h-full object-cover rounded-full border border-background"
                />
              </div>
              <h3 className="font-semibold mb-1">Creator{i}</h3>
              <p className="text-sm text-muted-foreground mb-3">{Math.floor(Math.random() * 100)}K followers</p>
              <Button size="sm" className="w-full">Follow</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;