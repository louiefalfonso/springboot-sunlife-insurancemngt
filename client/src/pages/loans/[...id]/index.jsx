import React from 'react'
import { useParams } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";
import LoanDetails from '../../../components/loans/LoanDetails';

const LoanPage = () => {

  const { id } = useParams();

  return (
    <>
      <MainLayout>
        <LoanDetails loanId = {id}/>
      </MainLayout>
    </>
  )
}

export default LoanPage