import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface DashboardCardProps {
  title: string;
  value?: string | number;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  variant?: "stat" | "activity" | "action" | "status";
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-blue-600",
  iconBgColor = "bg-blue-50",
  href,
  children,
  className,
  showIcon = true,
  variant = "stat",
}) => {
  const cardContent = (
    <Card
      className={cn(
        "hover:shadow-lg transition-shadow duration-200 bg-white border-gray-300 p-0 m-0",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md md:text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
        {showIcon && Icon && (
          <div className={cn("p-2 rounded-lg", iconBgColor)}>
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        {variant === "stat" && (
          <>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            {/* {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )} */}
          </>
        )}
        {variant === "activity" && children}
        {variant === "action" && children}
        {variant === "status" && children}
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default DashboardCard;
