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
  

  return <div>AddNewLoan</div>;
}

export default AddNewLoan