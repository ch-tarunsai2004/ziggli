import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Story {
  id: string;
  username: string;
  avatar: string;
  media: string;
  timestamp: string;
  isVideo: boolean;
}

interface StoryViewerProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  initialStoryIndex?: number;
}

export const StoryViewer = ({ isOpen, onClose, stories, initialStoryIndex = 0 }: StoryViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const currentStory = stories[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    const duration = currentStory?.isVideo ? 15000 : 5000; // 15s for video, 5s for image
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (duration / 100));
        if (newProgress >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, currentIndex, stories.length, onClose, currentStory]);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
    }
  }, [currentIndex, isOpen]);

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!currentStory) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 gap-0 bg-black border-0 rounded-xl overflow-hidden">
        <div className="relative h-[600px] flex flex-col">
          {/* Progress bars */}
          <div className="absolute top-2 left-2 right-2 z-20 flex gap-1">
            {stories.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-100"
                  style={{ 
                    width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Story header */}
          <div className="absolute top-6 left-4 right-4 z-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/50">
                <img src={currentStory.avatar} alt={currentStory.username} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{currentStory.username}</p>
                <p className="text-white/70 text-xs">{currentStory.timestamp}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Story media */}
          <div className="flex-1 relative">
            {currentStory.isVideo ? (
              <video 
                src={currentStory.media} 
                className="w-full h-full object-cover" 
                autoPlay 
                muted 
                loop
              />
            ) : (
              <img 
                src={currentStory.media} 
                alt="Story" 
                className="w-full h-full object-cover" 
              />
            )}

            {/* Navigation areas */}
            <button 
              onClick={goToPrevious}
              className="absolute left-0 top-0 w-1/3 h-full z-10"
            />
            <button 
              onClick={goToNext}
              className="absolute right-0 top-0 w-1/3 h-full z-10"
            />

            {/* Navigation buttons (visible) */}
            {currentIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}
            {currentIndex < stories.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            )}
          </div>

          {/* Story actions */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`text-white hover:bg-white/20 ${isLiked ? 'text-red-400' : ''}`}
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};