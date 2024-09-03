import React from "react";
import MainLayout from "../components/layout/MainLayout";
import Claims from "../components/claims/Claims";

const ClaimsPage = () => {
  return (
    <>
      <MainLayout>
        <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
          <Claims/>
        </div>
      </MainLayout>
    </>
  );
}

export default ClaimsPage