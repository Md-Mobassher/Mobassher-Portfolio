const CardSubtitle = ({ title }: { title: string }) => {
  return (
    <h2 className="lg:text-xl md:text-xl text-lg font-semibold text-gray-800 mb-3 pb-3 border-b-4 border-gray-300">
      {title}
    </h2>
  );
};

export default CardSubtitle;
