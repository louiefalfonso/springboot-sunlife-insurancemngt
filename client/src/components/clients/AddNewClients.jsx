import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import ClientService from "../../services/ClientService";

const AddNewClients = () => {

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
   
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newClient = {
      firstName,
      lastName,
      dateOfBirth: moment(dateOfBirth).format("MM-DD-YYYY"),
      phoneNumber,
      email,
      address,
      notes,
    };

    ClientService.addNewClient(newClient)
      .then(() => {
        navigate("/clients");
        toast.success("Client added successfully!");
      })
      .catch((error) => {
        setError(error.response.data.message);
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
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-900"
              >
                First Name:
              </label>
              <input
                placeholder="First Name"
                required
                type="text"
                className="form-input"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-900"
              >
                Last Name:
              </label>
              <input
                placeholder="Last Name"
                required
                type="text"
                className="form-input"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-900"
              >
                Date Of Birth:
              </label>
              <input
                required
                type="date"
                className="form-input"
                id="dateOfBirth"
                value={
                  moment(dateOfBirth).isValid()
                    ? moment(dateOfBirth).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-900"
              >
                Phone Number:
              </label>
              <input
                placeholder="Phone Number"
                required
                type="text"
                className="form-input"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email Address:
              </label>
              <input
                placeholder="Email Address"
                required
                type="email"
                className="form-input"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-900"
              >
                Home Address:
              </label>
              <input
                placeholder="Home Address"
                required
                type="text"
                className="form-input"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-900"
              >
                Additional Details:
              </label>
              <textarea
                placeholder="Enter Additional Details"
                required
                type="text"
                className="form-input"
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{ height: "100px" }}
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="btn w-full py-2 px-4 text-lg bg-warning border border-warning rounded-md text-black transition-all duration-300 hover:bg-warning/[0.85] hover:border-warning/[0.85]"
              >
                Create New Client
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster duration={12000} />
    </>
  );
};

export default AddNewClients;
