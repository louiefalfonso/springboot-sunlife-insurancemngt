import React from "react";
import MainLayout from "../components/layout/MainLayout";
import Clients from "../components/clients/Clients";

const ClientsPage = () => {
  return (
    <>
      <MainLayout>
        <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
          <Clients/>
        </div>
      </MainLayout>
    </>
  );
};

export default ClientsPage;
