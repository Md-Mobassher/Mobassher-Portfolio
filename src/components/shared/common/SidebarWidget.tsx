import { ReactNode } from "react";
import CardSubtitle from "../title/CardSubtitle";

interface SidebarWidgetProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function SidebarWidget({
  title,
  children,
  className = "",
}: SidebarWidgetProps) {
  return (
    <div
      className={`bg-white rounded-lg  md:p-5 p-4 border border-gray-300 ${className}`}
    >
      <CardSubtitle title={title} />
      {children}
    </div>
  );
}

// Pre-built widget components
export function LinkListWidget({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; text: string }>;
}) {
  return (
    <SidebarWidget title={title}>
      <div className="space-y-2">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {link.text}
          </a>
        ))}
      </div>
    </SidebarWidget>
  );
}

export function ContactInfoWidget({
  title,
  contactInfo,
}: {
  title: string;
  contactInfo: Array<{ label: string; value: string; href?: string }>;
}) {
  return (
    <SidebarWidget title={title}>
      <div className="space-y-3">
        {contactInfo.map((info, index) => (
          <div key={index}>
            <p className="text-lg font-semibold text-gray-700">{info.label}</p>
            {info.href ? (
              <a
                href={info.href}
                className="text-blue-600 hover:text-blue-800 text-md transition-colors"
              >
                {info.value}
              </a>
            ) : (
              <p className="text-md text-gray-600">{info.value}</p>
            )}
          </div>
        ))}
      </div>
    </SidebarWidget>
  );
}

export function TextWidget({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <SidebarWidget title={title}>
      <p className="text-gray-600 text-md leading-relaxed">{content}</p>
    </SidebarWidget>
  );
}
