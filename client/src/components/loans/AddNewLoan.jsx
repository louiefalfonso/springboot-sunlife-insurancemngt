import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

const AddNewLoan = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;

    
  return (
    <div>AddNewLoan</div>
  )
}

export default AddNewLoan