const Title = ({ title, className }: { title: string; className?: string }) => {
  return (
    <h2
      className={` ${className ? className : "md:text-3xl text-2xl font-bold mb-4 md:mb-5 text-primary"}`}
    >
      {title}
    </h2>
  );
};

export default Title;
