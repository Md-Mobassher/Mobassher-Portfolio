const Container = ({ children, padding }: any) => {
  return (
    <div
      className="container mx-auto xl:px-28 lg:px-16 md:px-14 px-4"
      style={{
        padding,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
