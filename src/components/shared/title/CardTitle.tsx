const CardTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="lg:text-2xl md:text-2xl text-xl font-semibold  mb-4 pb-3 border-b-4 border-primary/50 border-rounded-full text-primary uppercase">
      {title}
    </h1>
  );
};

export default CardTitle;
