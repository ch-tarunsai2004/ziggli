import { useState } from "react";
import { Search, Crown, MessageCircle, Heart, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  user: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
  isSubscribed: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    user: "alex_dev",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Thanks for the amazing tutorial!",
    timestamp: "2m",
    unread: 2,
    isOnline: true,
    isSubscribed: true,
  },
  {
    id: "2", 
    user: "sarah_ui",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Can you collab on a design video?",
    timestamp: "1h",
    unread: 0,
    isOnline: true,
    isSubscribed: false,
  },
  {
    id: "3",
    user: "mike_design",
    avatar: "/api/placeholder/40/40", 
    lastMessage: "Love your content! Keep it up 🔥",
    timestamp: "3h",
    unread: 1,
    isOnline: false,
    isSubscribed: true,
  },
];

interface Subscription {
  id: string;
  creator: string;
  avatar: string;
  tier: string;
  price: string;
  renewDate: string;
  benefits: string[];
}

const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    creator: "CodeMaster",
    avatar: "/api/placeholder/40/40",
    tier: "Pro Tier",
    price: "$9.99/month",
    renewDate: "Jan 15, 2024",
    benefits: ["Exclusive tutorials", "1-on-1 mentoring", "Discord access"],
  },
  {
    id: "2",
    creator: "DesignGuru", 
    avatar: "/api/placeholder/40/40",
    tier: "Premium",
    price: "$14.99/month",
    renewDate: "Jan 20, 2024",
    benefits: ["Design resources", "Weekly live sessions", "Portfolio review"],
  },
];

const Messages = () => {
  const [activeTab, setActiveTab] = useState<"messages" | "subscriptions">("messages");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMessages = mockMessages.filter(msg => 
    msg.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border z-40 p-4">
        <h1 className="text-xl font-bold mb-4">Messages & Subscriptions</h1>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          <Button
            variant={activeTab === "messages" ? "default" : "ghost"}
            onClick={() => setActiveTab("messages")}
            className="flex-1"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Messages
          </Button>
          <Button
            variant={activeTab === "subscriptions" ? "default" : "ghost"}
            onClick={() => setActiveTab("subscriptions")}
            className="flex-1"
          >
            <Crown className="h-4 w-4 mr-2" />
            Subscriptions
          </Button>
        </div>
      </div>

      {activeTab === "messages" && (
        <div className="p-4">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0"
            />
          </div>

          {/* Messages List */}
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className="flex items-center space-x-4 p-4 bg-card rounded-lg shadow-video hover:shadow-float transition-all duration-300 cursor-pointer"
              >
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full ${message.isSubscribed ? 'bg-gradient-instagram p-0.5' : ''}`}>
                    <img
                      src={message.avatar}
                      alt={message.user}
                      className="w-full h-full object-cover rounded-full border border-background"
                    />
                  </div>
                  {message.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                  {message.isSubscribed && (
                    <Crown className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold truncate">{message.user}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{message.timestamp}</span>
                      {message.unread > 0 && (
                        <Badge className="bg-primary text-primary-foreground min-w-[20px] h-5 text-xs">
                          {message.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm truncate">{message.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "subscriptions" && (
        <div className="p-4">
          {/* Subscription Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-card rounded-lg p-4 text-center shadow-video">
              <div className="text-2xl font-bold text-primary">{mockSubscriptions.length}</div>
              <div className="text-sm text-muted-foreground">Active Subscriptions</div>
            </div>
            <div className="bg-card rounded-lg p-4 text-center shadow-video">
              <div className="text-2xl font-bold text-accent">
                ${mockSubscriptions.reduce((sum, sub) => sum + parseFloat(sub.price.replace(/[^0-9.]/g, '')), 0).toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Monthly Total</div>
            </div>
          </div>

          {/* Subscriptions List */}
          <div className="space-y-4">
            {mockSubscriptions.map((sub) => (
              <div
                key={sub.id}
                className="bg-card rounded-lg p-6 shadow-video hover:shadow-float transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-instagram p-0.5">
                      <img
                        src={sub.avatar}
                        alt={sub.creator}
                        className="w-full h-full object-cover rounded-full border border-background"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold flex items-center">
                        {sub.creator}
                        <Crown className="ml-2 h-4 w-4 text-yellow-500" />
                      </h3>
                      <p className="text-sm text-muted-foreground">{sub.tier} • {sub.price}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Benefits:</p>
                  <div className="flex flex-wrap gap-2">
                    {sub.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Renews on {sub.renewDate}
                </div>
              </div>
            ))}
          </div>

          {/* Discover More */}
          <div className="mt-8 p-6 bg-gradient-subtle rounded-lg border border-border text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Support More Creators</h3>
            <p className="text-muted-foreground mb-4">
              Discover amazing creators and support them with exclusive subscriptions
            </p>
            <Button>Browse Creators</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;