import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import MainLayout from "../components/layout/MainLayout";
import ClaimsTable from "../components/claims/ClaimsTable";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="gap-5 p-5 bg-white border rounded dark:bg-darklight dark:border-darkborder md:col-span-2 xl:col-span-2 border-black/10">
            <div className="grid grid-cols-1 gap-4">
             Policy List
            </div>
          </div>
          <div className="gap-6 p-5 bg-white border rounded dark:bg-darklight dark:border-darkborder md:col-span-2 xl:col-span-2 border-black/10">
            <div className="grid grid-cols-1 gap-4">
              <ClaimsTable/>
            </div>
          </div>
          <div className="gap-6 p-5 bg-white border rounded dark:bg-darklight dark:border-darkborder md:col-span-2 xl:col-span-2 border-black/10">
            <div className="grid grid-cols-1 gap-4">
             Clients
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </MainLayout>
  )
  
  
  ;
};

export default Dashboard;
