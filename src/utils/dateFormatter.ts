export const dateFormatter = (date: string | Date, type?: "short" | "long") => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: type === "short" ? "short" : "long",
    day: "numeric",
  });
};
