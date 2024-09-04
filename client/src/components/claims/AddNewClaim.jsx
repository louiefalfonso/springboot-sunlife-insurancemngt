import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import ClaimService from "../../services/ClaimService";
import PolicyService from "../../services/PolicyService";

const AddNewClaim = () => {

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePolicySelect = (policyId) => {
    setSelectedPolicy(policyId === "" ? "" : policyId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedPolicy === null || selectedPolicy === "") {
      alert("Please select a policy");
      return;
    }

    const policy = policies.find((policy) => policy.id === selectedPolicy);
    if (!policy) {
      alert("Invalid policy selected");
      return;
    }

    const newClaim = {
      claimDate: moment(claimDate).format("DD-MM-YYYY"),
      claimNumber,
      claimStatus,
      claimAmount,
      description,
      policy: policy,
    };

    ClaimService.addNewClaim(newClaim)
      .then(() => {
        navigate("/claims");
        toast.success("Appointment added successfully!");
        setIsModalOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  };

  const fetchPolicies = async () => {
      try {
        const response = await PolicyService.getAllPolicies();
        const policies = response.data.map((policy) => ({
          id: policy.id,
          policyNumber: policy.policyNumber,
          policyFirstName: policy.client.firstName,
          policyLastName: policy.client.lastName,
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

    
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
        <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="sm:col-span-1">
              <label
                htmlFor="claimNumber"
                className="block text-sm font-medium text-gray-900"
              >
                Claim Number:
              </label>
              <input
                placeholder="Claim Number"
                required
                type="text"
                className="form-input"
                id="claimNumber"
                value={claimNumber}
                onChange={(e) => setClaimNumber(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-900"
              >
                Claim Date:
              </label>
              <input
                required
                type="date"
                className="form-input"
                id="claimDate"
                value={
                  moment(claimDate).isValid()
                    ? moment(claimDate).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) => setClaimDate(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="claimStatus"
                className="block text-sm font-medium text-gray-900"
              >
                Claim Status:
              </label>
              <select
                required
                type="text"
                className="form-input"
                id="claimStatus"
                value={claimStatus}
                onChange={(e) => setClaimStatus(e.target.value)}
              >
                <option>Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="claimAmount"
                className="block text-sm font-medium text-gray-900"
              >
                Claim Amount:
              </label>
              <input
                placeholder="Claim Amount"
                required
                type="text"
                className="form-input"
                id="claimAmount"
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="doctors"
                className="block text-sm font-medium text-gray-900"
              >
                Policy Account:
              </label>

              <select
                required
                className="form-input"
                id="policy"
                value={selectedPolicy || 0}
                onChange={(e) => handlePolicySelect(parseInt(e.target.value))}
              >
                {policies.map((policy) => (
                  <option key={policy.id} value={policy.id}>
                    {policy.policyNumber} - {policy.policyFirstName} {policy.policyLastName}
                  </option>
                ))}

          
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-900"
              >
                Claim Description:
              </label>
              <textarea
                placeholder="Enter Claim Description"
                required
                type="text"
                className="form-input"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: "100px" }}
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="btn w-full py-2 px-4 text-lg bg-warning border border-warning rounded-md text-black transition-all duration-300 hover:bg-warning/[0.85] hover:border-warning/[0.85]"
              >
                Create New Claim
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster duration={12000} />
    </>
  );
};

export default AddNewClaim;
