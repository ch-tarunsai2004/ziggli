import { useState } from "react";
import { Plus } from "lucide-react";
import { StoryViewer } from "./StoryViewer";

interface Story {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
  isViewed: boolean;
}

const mockStories: Story[] = [
  { id: "your-story", username: "Your Story", avatar: "/api/placeholder/60/60", hasStory: false, isViewed: false },
  { id: "1", username: "alex_dev", avatar: "/api/placeholder/60/60", hasStory: true, isViewed: false },
  { id: "2", username: "sarah_ui", avatar: "/api/placeholder/60/60", hasStory: true, isViewed: true },
  { id: "3", username: "mike_design", avatar: "/api/placeholder/60/60", hasStory: true, isViewed: false },
  { id: "4", username: "emma_code", avatar: "/api/placeholder/60/60", hasStory: true, isViewed: true },
  { id: "5", username: "john_dev", avatar: "/api/placeholder/60/60", hasStory: true, isViewed: false },
];

export const StoryCarousel = () => {
  const [stories] = useState<Story[]>(mockStories);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);

  const mockStoryMedia = [
    { id: "1", username: "alex_dev", avatar: "/api/placeholder/60/60", media: "/api/placeholder/300/500", timestamp: "2h ago", isVideo: false },
    { id: "2", username: "sarah_ui", avatar: "/api/placeholder/60/60", media: "/api/placeholder/300/500", timestamp: "4h ago", isVideo: true },
    { id: "3", username: "mike_design", avatar: "/api/placeholder/60/60", media: "/api/placeholder/300/500", timestamp: "6h ago", isVideo: false },
    { id: "4", username: "emma_code", avatar: "/api/placeholder/60/60", media: "/api/placeholder/300/500", timestamp: "8h ago", isVideo: false },
    { id: "5", username: "john_dev", avatar: "/api/placeholder/60/60", media: "/api/placeholder/300/500", timestamp: "1d ago", isVideo: true },
  ];

  const handleStoryClick = (storyIndex: number) => {
    if (stories[storyIndex].id === "your-story") {
      // Handle your story upload
      console.log("Upload your story");
    } else {
      // Open story viewer
      const actualIndex = storyIndex - 1; // Adjust for "your story" being first
      setSelectedStoryIndex(actualIndex);
    }
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 py-4">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {stories.map((story, index) => (
            <div key={story.id} className="flex flex-col items-center space-y-2 min-w-0">
              <div className="relative">
                {story.id === "your-story" ? (
                  <div className="relative cursor-pointer" onClick={() => handleStoryClick(index)}>
                    <div className="w-16 h-16 rounded-full bg-gradient-subtle border-2 border-dashed border-muted-foreground/50 flex items-center justify-center hover:border-primary transition-colors">
                      <Plus className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </div>
                ) : (
                  <div 
                    className={`p-0.5 rounded-full cursor-pointer hover:scale-105 transition-transform ${
                      story.hasStory && !story.isViewed 
                        ? 'bg-gradient-story shadow-story' 
                        : story.hasStory && story.isViewed
                        ? 'bg-muted'
                        : 'bg-transparent'
                    }`}
                    onClick={() => handleStoryClick(index)}
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-background overflow-hidden">
                      <img 
                        src={story.avatar} 
                        alt={story.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
              <span className="text-xs text-muted-foreground max-w-[70px] truncate">
                {story.username}
              </span>
            </div>
          ))}
        </div>
      </div>

      <StoryViewer 
        isOpen={selectedStoryIndex !== null}
        onClose={() => setSelectedStoryIndex(null)}
        stories={mockStoryMedia}
        initialStoryIndex={selectedStoryIndex || 0}
      />
    </div>
  );
};