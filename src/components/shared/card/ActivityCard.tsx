import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock, LucideIcon } from "lucide-react";
import React from "react";

interface ActivityItem {
  id: string | number;
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
  type?: string;
  priority?: number;
}

interface ActivityCardProps {
  title: string;
  description?: string;
  activities: ActivityItem[];
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  activities,
  icon: Icon,
  iconColor = "text-blue-600",
  className,
}) => {
  return (
    <Card className={cn("bg-white border-gray-300 p-0 m-0", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className={cn("h-5 w-5", iconColor)} />}
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-blue-100 rounded-lg">
                <activity.icon className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{activity.title}</h4>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No activities to show
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
