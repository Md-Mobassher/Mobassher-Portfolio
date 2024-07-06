export type TPortfolio = {
  _id: string;
  name: string;
  type: string;
  description: string[];
  technology: string[];
  image: {
    cover: string;
    landing: string;
  };
  liveUrl: string;
  clientUrl?: string;
  serverUrl?: string;
};

export type TSkill = {
  _id: string;
  name: string;
  proficiencyLevel: string;
  category: string;
};
