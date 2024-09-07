import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import PolicyService from "../../services/PolicyService";
import ClientService from "../../services/ClientService";

const AddNewPolicy = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [policyNumber, setPolicyNumber] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [premium, setPremium] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [clients, setClients]= useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClientSelect = (clientId) =>{
    setSelectedClient(clientId === "" ? "" : clientId);
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedClient === null || selectedClient === "") {
      alert("Please select a client");
      return;
    }

    const client = clients.find((client) => client.id === selectedClient);
    if (!client) {
      alert("Invalid client selected");
      return;
    }

    const newPolicy = {
      policyNumber, 
      policyType,
      coverageAmount,
      premium,
      startDate: moment(startDate).format("MM-DD-YYYY"),
      endDate: moment(endDate).format("MM-DD-YYYY"),
      client: client
    };

    PolicyService.addNewPolicy(newPolicy)
      .then(() => {
        navigate("/policies");
        toast.success("Policy added successfully!");
        setIsModalOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  };

  const fetchClients = async () => {
    try {
      const response = await ClientService.getAllClients();
      const clients = response.data.map((client) => ({
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
      }));
      return clients;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    fetchClients().then((clients) => {
      setClients(clients);
    });
  });
    
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
                htmlFor="policyNumber"
                className="block text-sm font-medium text-gray-900"
              >
                Policy Number:
              </label>
              <input
                placeholder="Policy Number"
                required
                type="text"
                className="form-input"
                id="policyNumber"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="policyType"
                className="block text-sm font-medium text-gray-900"
              >
                Policy Type:
              </label>
              <select
                required
                type="text"
                className="form-input"
                id="policyType"
                value={policyType}
                onChange={(e) => setPolicyType(e.target.value)}
              >
                <option>Select Policy Type</option>
                <option value="Car Insurance">Car Insurance</option>
                <option value="Home Insurance">Home Insurance</option>
                <option value="Pet Insurance">Pet Insurance</option>
                <option value="Travel Insurance">Travel Insurance</option>
                <option value="Health Insurance">Health Insurance</option>
                <option value="Property Insurance">Property Insurance</option>
                <option value="Life Insurance">Life Insurance</option>
                <option value="Long Term Disability Insurance">
                  Long Term Disability Insurance
                </option>
              </select>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="coverageAmount"
                className="block text-sm font-medium text-gray-900"
              >
                Coverage Amount:
              </label>
              <input
                placeholder="Coverage Amount"
                required
                type="text"
                className="form-input"
                id="coverageAmount"
                value={coverageAmount}
                onChange={(e) => setCoverageAmount(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="premium"
                className="block text-sm font-medium text-gray-900"
              >
                Premium Amount:
              </label>
              <input
                placeholder="Premium Amount"
                required
                type="text"
                className="form-input"
                id="premium"
                value={premium}
                onChange={(e) => setPremium(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-900"
              >
                Start Date:
              </label>
              <input
                required
                type="date"
                className="form-input"
                id="startDate"
                value={
                  moment(startDate).isValid()
                    ? moment(startDate).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-900"
              >
                End Date:
              </label>
              <input
                required
                type="date"
                className="form-input"
                id="endDate"
                value={
                  moment(endDate).isValid()
                    ? moment(endDate).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="clients"
                className="block text-sm font-medium text-gray-900"
              >
                Policy Account Holder:
              </label>

              <select
                required
                className="form-input"
                id="client"
                value={selectedClient || 0}
                onChange={(e) => handleClientSelect(parseInt(e.target.value))}
              >
                <option value={0}>Select a client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.firstName} {client.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="btn w-full py-2 px-4 text-lg bg-warning border border-warning rounded-md text-black transition-all duration-300 hover:bg-warning/[0.85] hover:border-warning/[0.85]"
              >
                Create New Policy
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster duration={12000} />
    </>
  );
};

export default AddNewPolicy;
