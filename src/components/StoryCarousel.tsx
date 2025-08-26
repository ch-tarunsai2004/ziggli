import { useState } from "react";
import { Plus } from "lucide-react";

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

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 py-4">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center space-y-2 min-w-0">
              <div className="relative">
                {story.id === "your-story" ? (
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-subtle border-2 border-dashed border-muted-foreground/50 flex items-center justify-center">
                      <Plus className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </div>
                ) : (
                  <div className={`p-0.5 rounded-full ${
                    story.hasStory && !story.isViewed 
                      ? 'bg-gradient-story shadow-story' 
                      : story.hasStory && story.isViewed
                      ? 'bg-muted'
                      : 'bg-transparent'
                  }`}>
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
    </div>
  );
};