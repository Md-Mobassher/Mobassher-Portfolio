"use client";

const Button = ({
  title,
  link,
  target,
  clickEvent,
  onMouseOver,
  onMouseOut,
  className,
}: any) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const hash = e.currentTarget.hash;
    const el = document.querySelector(hash) as HTMLElement;
    const offsetTop = el?.offsetTop || 0;
    window.scrollTo({
      top: offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <a
      target={target}
      onClick={clickEvent && handleClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      rel={target ? "noopener noreferrer" : ""}
      href={link}
      className={`border rounded-lg   border-dark-primary transition-all duration-300 font-semibold  ${
        className
          ? className
          : "dark:bg-dark-secondary bg-light-secondary hover:text-light-background hover:bg-dark-primary dark:hover:bg-dark-primary px-5 py-3"
      }`}
    >
      {title}
    </a>
  );
};

Button.defaultProps = {
  title: "Button",
  link: "https://mobassher.vercel.app",
  target: "",
};

export default Button;
