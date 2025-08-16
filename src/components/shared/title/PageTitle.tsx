"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface PageTitleProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
  separator?: React.ReactNode;
  title?: string;
}

export default function PageTitle({
  items,
  title,
  className = "",
  showHomeIcon = true,
  separator = <ChevronRight className="w-4 h-4 text-white" />,
}: PageTitleProps) {
  return (
    <div className={`bg-primary py-5 md:py-5 lg:py-5 ${className}`}>
      <nav className="container mx-auto px-4 flex md:flex-row flex-col justify-between items-center gap-2 space-x-2 text-white font-medium">
        {title && (
          <h1 className="text-2xl font-bold text-white uppercase">{title}</h1>
        )}
        <div className="flex items-center md:gap-2 gap-1">
          {items?.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 flex items-center">{separator}</span>
              )}

              {item.href && !item.isActive ? (
                <Link
                  href={item.href}
                  className="hover:text-secondary transition-colors duration-200 flex items-center"
                >
                  {index === 0 &&
                  showHomeIcon &&
                  item.label.toLowerCase() === "home" ? (
                    <>
                      <Home className="w-4 h-4 mr-1" />
                      {item.label}
                    </>
                  ) : (
                    item.label
                  )}
                </Link>
              ) : (
                <span
                  className={`flex items-center ${item.isActive ? "text-white font-semibold" : ""}`}
                >
                  {index === 0 &&
                  showHomeIcon &&
                  item.label.toLowerCase() === "home" ? (
                    <>
                      <Home className="w-4 h-4 mr-1" />
                      {item.label}
                    </>
                  ) : (
                    item.label
                  )}
                </span>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}

// Convenience component for common breadcrumb patterns
export function SimpleBreadcrumb({
  currentPage,
  parentPage = "Home",
  parentHref = "/",
  className = "",
}: {
  currentPage: string;
  parentPage?: string;
  parentHref?: string;
  className?: string;
}) {
  const items: BreadcrumbItem[] = [
    { label: parentPage, href: parentHref },
    { label: currentPage, isActive: true },
  ];

  return <PageTitle items={items} className={className} />;
}
