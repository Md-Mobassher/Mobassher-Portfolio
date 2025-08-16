import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

interface StatusItem {
  id: string;
  label: string;
  value: string;
  status: "online" | "offline" | "warning" | "info";
  icon?: LucideIcon;
}

interface StatusCardProps {
  title: string;
  statusItems: StatusItem[];
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  statusItems,
  icon: Icon,
  iconColor = "text-indigo-600",
  className,
}) => {
  const getStatusColor = (status: StatusItem["status"]) => {
    switch (status) {
      case "online":
        return "text-green-600";
      case "offline":
        return "text-red-600";
      case "warning":
        return "text-yellow-600";
      case "info":
        return "text-gray-900";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className={cn("bg-white border-gray-300", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className={cn("h-5 w-5", iconColor)} />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {statusItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.icon && (
                  <item.icon
                    className={cn("h-4 w-4", getStatusColor(item.status))}
                  />
                )}
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  getStatusColor(item.status)
                )}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
