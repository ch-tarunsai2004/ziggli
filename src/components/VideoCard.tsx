import { useState } from "react";
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentDialog } from "./CommentDialog";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    creator: string;
    avatar: string;
    thumbnail: string;
    views: string;
    duration: string;
    likes: number;
    isLiked: boolean;
    isShort: boolean;
  };
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const [isLiked, setIsLiked] = useState(video.isLiked);
  const [likes, setLikes] = useState(video.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <>
      <div className="bg-card rounded-lg overflow-hidden shadow-video hover:shadow-float hover:-translate-y-2 transition-all duration-300 group">
        {/* Video Thumbnail */}
        <div className="relative aspect-video bg-muted">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
            {video.duration}
          </div>
          {video.isShort && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
              Short
            </div>
          )}
        </div>
        
        {/* Video Info */}
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-instagram p-0.5">
              <img 
                src={video.avatar} 
                alt={video.creator}
                className="w-full h-full object-cover rounded-full border border-background"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
                {video.title}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{video.creator}</span>
                <span>•</span>
                <span>{video.views} views</span>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLike}
                className={isLiked ? "text-red-500 hover:text-red-600" : ""}
              >
                <Heart className={`h-5 w-5 mr-2 ${isLiked ? "fill-current" : ""}`} />
                {likes.toLocaleString()}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowComments(true)}>
                <MessageCircle className="h-5 w-5 mr-2" />
                Comment
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CommentDialog 
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        videoTitle={video.title}
      />
    </>
  );
};