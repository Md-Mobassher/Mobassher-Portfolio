"use client";

import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import PageTitle from "./PageTitle";

interface DynamicPageTitleProps {
  customTitle?: string;
  className?: string;
  showHomeIcon?: boolean;
  separator?: React.ReactNode;
}

export default function DynamicPageTitle({
  customTitle,
  className = "",
  showHomeIcon = true,
  separator,
}: DynamicPageTitleProps) {
  const { breadcrumbs, currentTitle } = useBreadcrumb();

  const title = customTitle || currentTitle;

  return (
    <PageTitle
      items={breadcrumbs}
      title={title}
      className={className}
      showHomeIcon={showHomeIcon}
      separator={separator}
    />
  );
}
