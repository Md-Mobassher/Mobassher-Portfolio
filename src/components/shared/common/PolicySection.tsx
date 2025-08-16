import React from "react";

type Section = {
  title: string;
  content: string[];
};

type PolicySectionProps = {
  data: Section[];
};

const PolicySection: React.FC<PolicySectionProps> = ({ data }) => {
  return (
    <div className="space-y-8 border border-gray-300 rounded-lg md:p-5 p-4">
      {data.map((section, idx) => (
        <div key={idx}>
          <h2 className="md:text-2xl text-xl font-semibold text-[#AB2929] mb-4">
            {section.title}
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 leading-relaxed">
            {section.content.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PolicySection;
