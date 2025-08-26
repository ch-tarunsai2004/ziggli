import { useState } from "react";
import { Send, Heart, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
}

interface CommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
}

const mockComments: Comment[] = [
  {
    id: "1",
    username: "alex_dev",
    avatar: "/api/placeholder/32/32",
    text: "Amazing tutorial! Really helped me understand React hooks better 🔥",
    likes: 23,
    isLiked: false,
    timestamp: "2h"
  },
  {
    id: "2", 
    username: "sarah_ui",
    avatar: "/api/placeholder/32/32",
    text: "Could you make a video about TypeScript next?",
    likes: 12,
    isLiked: true,
    timestamp: "1h"
  },
  {
    id: "3",
    username: "mike_design",
    avatar: "/api/placeholder/32/32", 
    text: "The explanation at 5:30 was perfect! Finally understand useEffect cleanup",
    likes: 8,
    isLiked: false,
    timestamp: "45m"
  }
];

export const CommentDialog = ({ isOpen, onClose, videoTitle }: CommentDialogProps) => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        username: "YourUsername",
        avatar: "/api/placeholder/32/32",
        text: newComment,
        likes: 0,
        isLiked: false,
        timestamp: "now"
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked, 
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 
          }
        : comment
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[600px] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-lg font-semibold">Comments</DialogTitle>
          <p className="text-sm text-muted-foreground line-clamp-1">{videoTitle}</p>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.avatar} alt={comment.username} />
                  <AvatarFallback>{comment.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{comment.username}</span>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                  
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      <Heart className={`h-3 w-3 mr-1 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      {comment.likes > 0 && comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="h-auto p-0">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/api/placeholder/32/32" alt="You" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex space-x-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};