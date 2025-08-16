interface SkeletonProps {
  count?: number;
  height?: string;
  width?: string;
  className?: string;
  containerClassName?: string;
  variant?: "default" | "card" | "text" | "avatar" | "button" | "event";
}

const Skeleton = ({
  count = 5,
  height = "h-40",
  width = "w-full",
  className = "bg-gray-200",
  containerClassName = "bg-gray-100",
  variant = "default",
}: SkeletonProps) => {
  // Variant-specific configurations
  const getVariantStyles = () => {
    switch (variant) {
      case "card":
        return {
          height: "h-80",
          width: "w-full",
          className: "bg-gray-200",
          containerClassName: "bg-white p-4 rounded-lg shadow",
        };
      case "text":
        return {
          height: "h-4",
          width: "w-full",
          className: "bg-gray-200",
          containerClassName: "space-y-2",
        };
      case "avatar":
        return {
          height: "h-12",
          width: "w-12",
          className: "bg-gray-200",
          containerClassName: "flex items-center space-x-4",
        };
      case "button":
        return {
          height: "h-10",
          width: "w-24",
          className: "bg-gray-200",
          containerClassName: "inline-block",
        };
      case "event":
        return {
          height: "h-20",
          width: "w-full",
          className: "bg-gray-200",
          containerClassName: "inline-block",
        };
      default:
        return {
          height,
          width,
          className,
          containerClassName,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={styles.containerClassName}>
      <div
        className={` ${variant === "card" ? "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4" : "space-y-4"} `}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div
              className={`${styles.height} ${styles.width} ${styles.className} rounded`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Convenience components for common use cases
export const CardSkeleton = ({
  count = 3,
  ...props
}: Omit<SkeletonProps, "variant">) => (
  <Skeleton variant="card" count={count} {...props} />
);

export const TextSkeleton = ({
  count = 4,
  ...props
}: Omit<SkeletonProps, "variant">) => (
  <Skeleton variant="text" count={count} {...props} />
);

export const AvatarSkeleton = ({
  count = 1,
  ...props
}: Omit<SkeletonProps, "variant">) => (
  <Skeleton variant="avatar" count={count} {...props} />
);

export const ButtonSkeleton = ({
  count = 1,
  ...props
}: Omit<SkeletonProps, "variant">) => (
  <Skeleton variant="button" count={count} {...props} />
);

export default Skeleton;
