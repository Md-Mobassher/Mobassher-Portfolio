const NotFound = ({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div
      className={`bg-gray-100  flex items-center justify-center ${className ? className : "lg:min-h-[350px] md:min-h-[300px] min-h-[280px]"}`}
    >
      <div className="text-center text-gray-600 ">
        {message || "No data found"}
      </div>
    </div>
  );
};

export default NotFound;
