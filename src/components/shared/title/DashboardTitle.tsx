interface DashboardTitleProps {
  title: string;
}

const DashboardTitle = ({ title }: DashboardTitleProps) => {
  return (
    <h1 className="md:text-3xl text-2xl font-bold text-center text-[#1F4F69] mb-6">
      {title}
    </h1>
  );
};

export default DashboardTitle;
