"use client";

type ButtonProps = {
  title?: string;
  link?: string;
  target?: string;
  clickEvent?: boolean;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  className?: string;
};

const Button = ({
  title = "Button",
  link = "https://mobassher.vercel.app",
  target = "",
  clickEvent,
  onMouseOver,
  onMouseOut,
  className,
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!link) return;

    // If link is a hash link (starts with #), scroll smoothly
    if (clickEvent && link.startsWith("#")) {
      const el = document.querySelector(link) as HTMLElement;
      if (!el) return;
      const offsetTop = el.offsetTop || 0;
      window.scrollTo({
        top: offsetTop,
        left: 0,
        behavior: "smooth",
      });
    } else {
      // If external or regular link, open it
      if (target === "_blank") {
        window.open(link, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = link;
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className={`cursor-pointer border rounded-lg border-dark-primary transition-all duration-300 font-semibold ${
        className
          ? className
          : "dark:bg-dark-secondary bg-light-secondary hover:text-light-background hover:bg-dark-primary dark:hover:bg-dark-primary px-5 py-3 inline-block"
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleClick(e as any);
      }}
    >
      {title}
    </div>
  );
};

export default Button;
