interface MobileCountDisplayProps {
  totalCount: number;
  countLabel?: string;
  countSuffix?: string;
  className?: string;
  color?: string;
}

const MobileCountDisplay = ({
  totalCount,
  countLabel = "Total",
  countSuffix = "Found",
  className = "",
  color = "text-cyan-500",
}: MobileCountDisplayProps) => {
  return (
    <div className={`flex md:hidden justify-center mb-5 ${className}`}>
      <h4 className="text-md font-semibold">
        {countLabel}: <span className={`${color} px-1`}>{totalCount}</span>{" "}
        {countSuffix}
      </h4>
    </div>
  );
};

export default MobileCountDisplay;
