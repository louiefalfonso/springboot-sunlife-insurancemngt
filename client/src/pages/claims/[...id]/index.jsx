import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";
import ClaimDetails from "../../../components/claims/ClaimDetails";

const ClaimPage = () => {
    
    const { id } = useParams();

  return (
    <>
       <MainLayout>
        <ClaimDetails claimId = {id}/>
      </MainLayout>
    </>
  )
}

export default ClaimPage