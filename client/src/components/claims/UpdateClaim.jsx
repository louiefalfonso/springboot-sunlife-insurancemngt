import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ClaimService from "../../services/ClaimService";
import PolicyService from "../../services/PolicyService";

const UpdateClaim = () => {
     const navigate = useNavigate();
     const params = useParams();
     const { id } = params;

     const [claimNumber, setClaimNumber] = useState("");
     const [claimDate, setClaimDate] = useState("");
     const [claimStatus, setClaimStatus] = useState("");
     const [claimAmount, setClaimAmount] = useState("");
     const [description, setDescription] = useState("");
     const [policies, setPolicies] = useState([]);
     const [selectedPolicy, setSelectedPolicy] = useState(null);
     
     const [error, setError] = useState(null);
     const [isModalOpen, setIsModalOpen] = useState(false);

     const handlePolicySelect = (policyId) => {
       setSelectedPolicy(policyId === "" ? "" : policyId);
     };


  const fetchPolicies = async () => {
    try {
      const response = await PolicyService.getAllPolicies();
      const policies = response.data.map((policy) => ({
        id: policy.id,
        policyNumber: policy.policyNumber,
      }));
      return policies;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

     useEffect(() => {
       fetchPolicies().then((policies) => {
         setPolicies(policies);
       });
     }, []);


     const toggleModal = () => {
       setIsModalOpen(!isModalOpen);
     };

    


  return <div>UpdateClaim</div>;
};

export default UpdateClaim;
