import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";

export type TSkills = {
  name: string;
  percent: number;
  category: string;
};

const MySkills = async () => {
  const res = await fetch(` ${process.env.NEXT_PUBLIC_SERVER_URL}/skills`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const skills = await res.json();
  console.log(skills?.data);

  // const skillsName: string[] = Object.keys(skills);

  // const selectedSkills: TSkills[] = (skills as any)[selectedSkill];
  return (
    <div id="myskills" className="lg:mt-28 md:mt-20 mt-14  min-h-20 ">
      {/* <Container>
        <Title title="My Skills" />
        <div className="lg:px-20 md:px-14 lg:mt-10 mt-8">
          <ul className="flex flex-wrap lg:justify-start md:justify-start justify-center lg:mb-7 mb-5 lg:gap-5 md:gap-4 gap-3">
            {skillsName.map((name) => (
              <li
                onClick={() => setSelectedSkill(name)}
                className={
                  name === selectedSkill
                    ? " text-md text-white py-2  btn btn-primary hover:bg-green-400 transition duration-500 lg:px-7 md:px-5 px-4"
                    : "btn btn-outline border-primary py-2 bg-gray-800 lg:px-7 md:px-5 px-4 text-white hover:text-white hover:bg-green-400  transition duration-500"
                }
                key={name}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-5  gap-3 md:gap-4">
          {selectedSkills.map(({ name, percent }) => (
            <div
              key={name}
              className="bg-gray-700  rounded-md flex-col justify-between items-end p-0 m-0"
            >
              <div className="flex justify-between lg:p-4 md:p-3 p-2">
                <h4 className="lg:text-xl md:text-lg text-lg font-bold ">
                  {name}
                </h4>
                <p className="lg:text-xl md:text-lg text-md font-bold px-2 bg-primary rounded-md text-white">
                  {percent}%
                </p>
              </div>
              <progress
                className="progress progress-primary w-100 lg:h-3 md:h-2 h-2 p-0 m-0"
                value={percent}
                max="100"
              ></progress>
            </div>
          ))}
        </div>
      </Container> */}
    </div>
  );
};

export default MySkills;
