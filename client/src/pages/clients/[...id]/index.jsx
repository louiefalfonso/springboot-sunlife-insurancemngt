import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";
import ClientDetails from "../../../components/clients/ClientDetails";

const ClientPage = () => {

    const { id } = useParams();

  return (
    <>
        <MainLayout>
            <ClientDetails clientId = {id}/>
        </MainLayout>
    </>
  );
};

export default ClientPage;
