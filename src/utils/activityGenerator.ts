import {
  BookOpen,
  Edit,
  Eye,
  LucideIcon,
  MessageSquare,
  Plus,
  Search,
  UserCog,
  Users,
} from "lucide-react";

export interface ActivityItem {
  id: string | number;
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
  type: string;
  priority: number; // Higher number = more recent/important
  action?: string;
  entityId?: string;
}

export interface ActivityData {
  events?: any[];
  publications?: any[];
  research?: any[];
  users?: any[];
  committees?: any[];
  contacts?: any[];
}

export const generateRecentActivities = (
  data: ActivityData
): ActivityItem[] => {
  const activities: ActivityItem[] = [];
  const now = new Date();

  // Helper function to calculate time ago with more precision
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  // Helper function to get priority based on date and type
  const getPriority = (
    dateString: string,
    type: string,
    isRecent: boolean = false
  ) => {
    const date = new Date(dateString);
    const timeDiff = now.getTime() - date.getTime();

    // Base priority from time
    let priority = timeDiff;

    // Boost priority for recent activities (last 24 hours)
    if (isRecent) priority *= 1.5;

    // Type-based priority adjustments
    switch (type) {
      case "user":
        priority *= 1.2; // User activities are important
        break;
      case "event":
        priority *= 1.1; // Events are important
        break;
      case "publication":
        priority *= 1.0; // Standard priority
        break;
      case "research":
        priority *= 0.9; // Slightly lower priority
        break;
      case "contact":
        priority *= 0.8; // Lower priority
        break;
    }

    return priority;
  };

  // Helper function to check if activity is recent (last 24 hours)
  const isRecent = (dateString: string) => {
    const date = new Date(dateString);
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    return diffInHours < 24;
  };

  // Process Events with different activity types
  if (data.events?.length) {
    data.events.slice(0, 2).forEach((event, index) => {
      const eventDate =
        event.createdAt || event.date || new Date().toISOString();
      const recent = isRecent(eventDate);

      activities.push({
        id: `event-${event.id}`,
        title: recent ? "New Event Created" : "Event Updated",
        description: event.title || "Event",
        time: getTimeAgo(eventDate),
        icon: recent ? Plus : Edit,
        type: "event",
        priority: getPriority(eventDate, "event", recent),
        action: recent ? "created" : "updated",
        entityId: event.id,
      });
    });
  }

  // Process Publications with different activity types
  if (data.publications?.length) {
    data.publications.slice(0, 2).forEach((publication, index) => {
      const pubDate =
        publication.createdAt ||
        publication.updatedAt ||
        new Date().toISOString();
      const recent = isRecent(pubDate);

      activities.push({
        id: `publication-${publication.id}`,
        title: recent ? "Publication Published" : "Publication Updated",
        description: publication.title || "Publication",
        time: getTimeAgo(pubDate),
        icon: recent ? BookOpen : Edit,
        type: "publication",
        priority: getPriority(pubDate, "publication", recent),
        action: recent ? "published" : "updated",
        entityId: publication.id,
      });
    });
  }

  // Process Research with status awareness
  if (data.research?.length) {
    data.research.slice(0, 2).forEach((research) => {
      const researchDate =
        research.createdAt || research.updatedAt || new Date().toISOString();
      const recent = isRecent(researchDate);
      const status = research.status || "ONGOING";

      let title = "Research Project Started";
      let icon = Search;

      if (status === "COMPLETED") {
        title = "Research Project Completed";
        icon = Eye;
      } else if (status === "ONGOING" && !recent) {
        title = "Research Project Updated";
        icon = Edit;
      }

      activities.push({
        id: `research-${research.id}`,
        title,
        description: research.title || "Research Project",
        time: getTimeAgo(researchDate),
        icon,
        type: "research",
        priority: getPriority(researchDate, "research", recent),
        action: status.toLowerCase(),
        entityId: research.id,
      });
    });
  }

  // Process Users with registration focus
  if (data.users?.length) {
    data.users.slice(0, 2).forEach((user) => {
      const userDate =
        user.createdAt || user.updatedAt || new Date().toISOString();
      const recent = isRecent(userDate);

      activities.push({
        id: `user-${user.id}`,
        title: recent ? "New User Registered" : "User Profile Updated",
        description: user.fullName || user.email || "New User",
        time: getTimeAgo(userDate),
        icon: recent ? Users : Edit,
        type: "user",
        priority: getPriority(userDate, "user", recent),
        action: recent ? "registered" : "updated",
        entityId: user.id,
      });
    });
  }

  // Process Committees
  if (data.committees?.length) {
    data.committees.slice(0, 1).forEach((committee) => {
      const committeeDate =
        committee.updatedAt || committee.createdAt || new Date().toISOString();
      const recent = isRecent(committeeDate);

      activities.push({
        id: `committee-${committee.id}`,
        title: recent ? "Committee Created" : "Committee Updated",
        description: committee.name || "Committee",
        time: getTimeAgo(committeeDate),
        icon: recent ? UserCog : Edit,
        type: "committee",
        priority: getPriority(committeeDate, "committee", recent),
        action: recent ? "created" : "updated",
        entityId: committee.id,
      });
    });
  }

  // Process Contacts with message focus
  if (data.contacts?.length) {
    data.contacts.slice(0, 1).forEach((contact) => {
      const contactDate = contact.createdAt || new Date().toISOString();
      const recent = isRecent(contactDate);

      activities.push({
        id: `contact-${contact.id}`,
        title: "New Contact Message",
        description: contact.name || contact.email || "Contact",
        time: getTimeAgo(contactDate),
        icon: MessageSquare,
        type: "contact",
        priority: getPriority(contactDate, "contact", recent),
        action: "received",
        entityId: contact.id,
      });
    });
  }

  // Add system activities based on data freshness
  const hasRecentData = activities.some(
    (activity) =>
      activity.time.includes("minutes ago") ||
      activity.time.includes("hours ago")
  );

  if (!hasRecentData) {
    activities.push({
      id: "system-1",
      title: "System Active",
      description: "Dashboard is running smoothly",
      time: "Just now",
      icon: Eye,
      type: "system",
      priority: 0,
      action: "monitoring",
    });
  }

  // Sort by priority (most recent first) and return top 6
  return activities
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 6)
    .map((activity, index) => ({
      ...activity,
      id: index + 1, // Ensure unique IDs for display
    }));
};

// Enhanced fallback activities
export const getFallbackActivities = (): ActivityItem[] => [
  {
    id: 1,
    title: "Dashboard Initialized",
    description: "Welcome to CGCSBD Dashboard",
    time: "Just now",
    icon: Users,
    type: "system",
    priority: 0,
    action: "initialized",
  },
  {
    id: 2,
    title: "System Ready",
    description: "All services are running smoothly",
    time: "1 minute ago",
    icon: Eye,
    type: "system",
    priority: 1,
    action: "monitoring",
  },
  {
    id: 3,
    title: "Ready for Data",
    description: "Start adding content to see activities",
    time: "2 minutes ago",
    icon: Plus,
    type: "system",
    priority: 2,
    action: "waiting",
  },
];

// Utility function to get activity color based on type
export const getActivityColor = (type: string): string => {
  switch (type) {
    case "event":
      return "text-green-600";
    case "publication":
      return "text-purple-600";
    case "research":
      return "text-orange-600";
    case "user":
      return "text-blue-600";
    case "committee":
      return "text-indigo-600";
    case "contact":
      return "text-red-600";
    case "system":
      return "text-gray-600";
    default:
      return "text-blue-600";
  }
};

// Utility function to get activity background color
export const getActivityBgColor = (type: string): string => {
  switch (type) {
    case "event":
      return "bg-green-100";
    case "publication":
      return "bg-purple-100";
    case "research":
      return "bg-orange-100";
    case "user":
      return "bg-blue-100";
    case "committee":
      return "bg-indigo-100";
    case "contact":
      return "bg-red-100";
    case "system":
      return "bg-gray-100";
    default:
      return "bg-blue-100";
  }
};
