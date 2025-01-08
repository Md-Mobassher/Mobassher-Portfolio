const Container = ({ children, className }: any) => {
  return (
    <div
      className={`container mx-auto xl:px-16 lg:px-10 md:px-6 px-4 ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
