"use client";

const Button = ({
  title,
  link,
  target,
  clickEvent,
  onMouseOver,
  onMouseOut,
  color,
  bgColor,
  borderColor,
  margin,
  padding,
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
      style={{
        margin,
        padding,
        color,
        borderColor,
        backgroundColor: bgColor,
      }}
      target={target}
      onClick={clickEvent && handleClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      rel={target ? "noopener noreferrer" : ""}
      href={link}
      className="border rounded-lg"
    >
      {title}
    </a>
  );
};

Button.defaultProps = {
  title: "Button",
  link: "https://mobassher.vercel.app",
  target: "",
  margin: "0 0 0 0",
  padding: "15px 25px",
  color: "black",
  bgColor: "transparent",
  borderColor: "#00cf5d",
};

export default Button;
