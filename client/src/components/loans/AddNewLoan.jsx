import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import ClientService from "../../services/ClientService";
import LoanService from "../../services/LoanService";

const AddNewLoan = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [loanNumber, setLoanNumber] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const [loanStatus, setLoanStatus] = useState("");
  const [loanReason, setLoanReason] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [reasonOthers, setReasonOthers] = useState("");
  const [loanGrossValue, setLoanGrossValue] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [clients, setClients]= useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleClientSelect = (clientId) => {
    setSelectedClient(clientId === "" ? "" : clientId);
  };

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

    const newLoan = {
      loanNumber,
      loanDate: moment(loanDate).format("MM-DD-YYYY"),
      loanStatus,
      loanReason,
      loanAmount,
      reasonOthers,
      loanGrossValue,
      businessAddress,
      client: client
    };

    LoanService.addNewLoan(newLoan)
      .then(() => {
        navigate("/loans");
        toast.success("Loan added successfully!");
        setIsModalOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  };
  

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
                htmlFor="loanNumber"
                className="block text-sm font-medium text-gray-900"
              >
                Loan Number:
              </label>
              <input
                placeholder="Loan Number"
                required
                type="text"
                className="form-input"
                id="loanNumber"
                value={loanNumber}
                onChange={(e) => setLoanNumber(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="loanDate"
                className="block text-sm font-medium text-gray-900"
              >
                Loan Date:
              </label>
              <input
                required
                type="date"
                className="form-input"
                id="loanDate"
                value={
                  moment(loanDate).isValid()
                    ? moment(loanDate).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) => setLoanDate(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="loanAmount"
                className="block text-sm font-medium text-gray-900"
              >
                Loan Amount:
              </label>
              <input
                placeholder="Loan Amount"
                required
                type="text"
                className="form-input"
                id="loanAmount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddNewLoan