import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../layout/Modal";
import { createPortal } from "react-dom";
import LoanService from "../../services/LoanService";

const LoanDetails = () => {

   const navigate = useNavigate();
   const params = useParams();
   const { id } = params;

   const [currentLoan, setCurrentLoan] = useState({});
   const [error, setError] = useState(null);

   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

   const toggleUpdateModal = () => {
     setIsUpdateModalOpen(!isUpdateModalOpen);
   };

   const toggleDeleteModal = () => {
     setIsDeleteModalOpen(!isDeleteModalOpen);
   };

   useEffect(() => {
     const fetchCurrentLoan = async () => {
       try {
         const response = await LoanService.getLoanById(id);
         setCurrentLoan(response.data);
       } catch (error) {
         setError(error.message);
         console.error(error);
       }
     };
     fetchCurrentLoan();
   }, [id]);


  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Loan Details</h2>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="btn py-1 px-3.5 text-xs bg-warning border border-warning rounded-md text-black transition-all duration-300 hover:bg-warning/[0.85] hover:border-warning/[0.85]"
            >
              Back
            </button>
          </div>
        </div>
      </div>  
    </>
  )
}

export default LoanDetails