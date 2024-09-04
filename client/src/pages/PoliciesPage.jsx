import React from "react";
import MainLayout from "../components/layout/MainLayout";
import Policies from "../components/policies/Policies";

const PoliciesPage = () => {
  return (
    <>
      <MainLayout>
        <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
          <Policies/>
        </div>
      </MainLayout>
    </>
  );
}

export default PoliciesPage