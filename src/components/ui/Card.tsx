import Image from "next/image";

type TCardProps = {
  img?: any;
  title: string;
  details: string;
};
const Card = ({ img, title, details }: TCardProps) => {
  return (
    <div className="card max-w-[380px] card-compact  bg-base-100 shadow-xl mx-auto">
      <figure>
        <Image src={img} alt={title} width={400} height={250} />
      </figure>
      <div className="p-5 pb-8 ">
        <h2 className="card-title font-bold">{title}</h2>
        <p className=" mt-3">{details}</p>
      </div>
    </div>
  );
};

export default Card;
