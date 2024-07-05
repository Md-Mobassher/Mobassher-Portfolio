/* eslint-disable @typescript-eslint/no-explicit-any */

const Container = ({ children, padding }: any) => {
  return (
    <div
      className="max-w-[1200px] mx-auto lg:px-8 md:px-6 px-5"
      style={{
        padding,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
