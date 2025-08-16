// Force dynamic rendering to prevent static generation issues
export const dynamic = "force-dynamic";

import React from "react";
import PersonList from "../components/Committee";

const CommitteePage = () => {
  return (
    <React.Fragment>
      <PersonList />
    </React.Fragment>
  );
};

export default CommitteePage;
