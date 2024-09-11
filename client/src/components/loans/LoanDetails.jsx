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
    <div>LoanDetails</div>
  )
}

export default LoanDetails