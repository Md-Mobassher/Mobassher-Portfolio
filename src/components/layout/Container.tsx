const Container = ({ children, className }: any) => {
  return (
    <div
      className={`container mx-auto xl:px-8 lg:px-6 md:px-5 px-4 ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
