import { Button } from "@/components/ui/button";

interface DasboardTitleProps {
  title: string;
  buttonText?: string;
  onClick?: () => void;
}

const DasboardTitle = ({ title, buttonText, onClick }: DasboardTitleProps) => {
  return (
    <div className="flex justify-between items-center md:px-6 py-5 ">
      <h1 className="md:text-3xl text-2xl font-bold text-start text-primary">
        {title}
      </h1>
      <div>
        {buttonText && (
          <Button
            onClick={onClick}
            className="bg-primary hover:bg-accent text-white"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default DasboardTitle;
