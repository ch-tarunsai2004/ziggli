import { StoryCarousel } from "@/components/StoryCarousel";
import { VideoCard } from "@/components/VideoCard";

const mockVideos = [
  {
    id: "1",
    title: "Amazing React Tutorial: Build Modern Apps with TypeScript",
    creator: "CodeMaster",
    avatar: "/api/placeholder/40/40",
    thumbnail: "/api/placeholder/400/225",
    views: "125K",
    duration: "12:34",
    likes: 2540,
    isLiked: false,
    isShort: false,
  },
  {
    id: "2",
    title: "Quick CSS Tip #shorts",
    creator: "WebDesignPro",
    avatar: "/api/placeholder/40/40",
    thumbnail: "/api/placeholder/400/225",
    views: "89K",
    duration: "0:45",
    likes: 1823,
    isLiked: true,
    isShort: true,
  },
  {
    id: "3",
    title: "Live Coding Session: Building a Social Media App",
    creator: "TechStreamer",
    avatar: "/api/placeholder/40/40",
    thumbnail: "/api/placeholder/400/225",
    views: "45K",
    duration: "1:23:45",
    likes: 892,
    isLiked: false,
    isShort: false,
  },
  {
    id: "4",
    title: "JavaScript Arrays Explained #shorts",
    creator: "JSNinja",
    avatar: "/api/placeholder/40/40",
    thumbnail: "/api/placeholder/400/225",
    views: "67K",
    duration: "1:12",
    likes: 1456,
    isLiked: false,
    isShort: true,
  },
  {
    id: "5",
    title: "Full Stack Development Roadmap 2024",
    creator: "DevCareer",
    avatar: "/api/placeholder/40/40",
    thumbnail: "/api/placeholder/400/225",
    views: "234K",
    duration: "18:26",
    likes: 5647,
    isLiked: true,
    isShort: false,
  },
  {
    id: "6",
    title: "UI/UX Design Trends #shorts",
    creator: "DesignTrends",
    avatar: "/api/placeholder/40/40",
    thumbnail: "/api/placeholder/400/225",
    views: "92K",
    duration: "0:58",
    likes: 2134,
    isLiked: false,
    isShort: true,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Stories Section */}
      <StoryCarousel />
      
      {/* Video Feed */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;