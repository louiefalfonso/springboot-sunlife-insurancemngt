import React from 'react'
import { useParams } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";
import PolicyDetails from '../../../components/policies/PolicyDetails';

const PolicyPage = () => {

  const { id } = useParams();

  return (
    <>
      <MainLayout>
        <PolicyDetails policyId = {id}/>
      </MainLayout>
    </>
  )
}

export default PolicyPage