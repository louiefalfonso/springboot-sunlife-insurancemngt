import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import ClientService from "../../services/ClientService";
import LoanService from "../../services/LoanService";

const UpdateLoan = () => {
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
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClientSelect = (clientId) => {
    setSelectedClient(clientId === "" ? "" : clientId);
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

  useEffect(() => {
    const fetchCurrentLoan = async () => {
      try {
        const response = await LoanService.getLoanById(id);
        const update = response.data;
        const parsedLoanDate = moment(update.loanDate, "MM-DD-YYYY");
        setLoanNumber(update.loanNumber);
        setLoanDate(parsedLoanDate);
        setLoanStatus(update.loanStatus);
        setLoanReason(update.loanReason);
        setLoanAmount(update.loanAmount);
        setReasonOthers(update.reasonOthers);
        setLoanGrossValue(update.loanGrossValue);
        setBusinessAddress(update.businessAddress);
        setSelectedClient(update.clientId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentLoan();
  }, [id]);

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

    const updatedLoan = {
      loanNumber,
      loanDate: moment(loanDate).format("MM-DD-YYYY"),
      loanStatus,
      loanReason,
      loanAmount,
      reasonOthers,
      loanGrossValue,
      businessAddress,
      clientId: selectedClient
    };

    LoanService.updateLoan(id, updatedLoan)
      .then(() => {
        navigate("/loans");
        toast.success("Loan updated successfully!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>UpdateLoan</div>
  )
}

export default UpdateLoan