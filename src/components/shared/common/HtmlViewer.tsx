"use client";

interface HtmlViewerProps {
  html: string;
  className?: string;
  containerClassName?: string;
  allowScripts?: boolean;
  sanitize?: boolean;
  style?: React.CSSProperties;
}

export default function HtmlViewer({
  html,
  className = "",
  containerClassName = "",
  allowScripts = false,
  sanitize = true,
  style,
}: HtmlViewerProps) {
  // Basic HTML sanitization function
  const sanitizeHtml = (htmlString: string): string => {
    if (!sanitize) return htmlString;

    // Remove script tags and their content
    let sanitized = htmlString.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );

    // Remove event handlers
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "");

    // Remove javascript: URLs
    sanitized = sanitized.replace(/javascript:/gi, "");

    // Remove iframe tags
    sanitized = sanitized.replace(
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
      ""
    );

    // Remove object and embed tags
    sanitized = sanitized.replace(
      /<(object|embed)\b[^<]*(?:(?!<\/(object|embed)>)<[^<]*)*<\/(object|embed)>/gi,
      ""
    );

    return sanitized;
  };

  const processedHtml = allowScripts ? html : sanitizeHtml(html);

  return (
    <div className={`html-viewer ${containerClassName}`}>
      <div
        className={`prose prose-sm max-w-none ${className}`}
        dangerouslySetInnerHTML={{ __html: processedHtml }}
        style={{
          // Custom styles for better HTML content rendering
          lineHeight: "1.6",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          ...style,
        }}
      />
    </div>
  );
}
