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

export type TComment = {
  author: string;
  content: string;
  timestamp: Date;
};
export type TAuthor = {
  _id: string;
  name: string;
  email: string;
  contactNumber: string;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TBlog = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  coverImage: string;
  author: TAuthor;
  blogStatus: string;
  category: string;
  comments: TComment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
