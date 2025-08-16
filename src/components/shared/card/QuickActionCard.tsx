import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface QuickAction {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  iconColor: string;
  hoverBgColor: string;
}

interface QuickActionCardProps {
  title: string;
  description?: string;
  actions: QuickAction[];
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  actions,
  icon: Icon,
  iconColor = "text-green-600",
  className,
}) => {
  return (
    <Card className={cn("bg-white border-gray-300", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className={cn("h-5 w-5", iconColor)} />}
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => (
            <Link key={action.id} href={action.href}>
              <div
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer",
                  action.hoverBgColor
                )}
              >
                <action.icon className={cn("h-4 w-4", action.iconColor)} />
                <span className="text-sm font-medium">{action.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionCard;
