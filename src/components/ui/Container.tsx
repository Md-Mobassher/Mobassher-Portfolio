const Container = ({ children, padding }: any) => {
  return (
    <div
      className="container lg:px-8 md:px-6 px-5"
      style={{
        padding,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
