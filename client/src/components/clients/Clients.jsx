import React, { useState, useEffect } from "react";
import Modal from "../layout/Modal";
import { createPortal } from "react-dom";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import ClientService from "../../services/ClientService.js"
import AddNewClients from "./AddNewClients.jsx";

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        const fetchClients = async () => {
        try {
            const response = await ClientService.getAllClients();
            setClients(response.data);
        } catch (error) {
            console.error(error);
        }
        };
        fetchClients();
    }, []);

  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Client List</h2>
              <button
                type="button"
                onClick={toggleModal}
                className="btn py-1 px-3.5 text-xs bg-warning border border-warning rounded-md text-black transition-all duration-300 hover:bg-warning/[0.85] hover:border-warning/[0.85]"
              >
                + Add Client
              </button>
            </div>
            <div className="overflow-auto">
              <table className="min-w-[640px] w-full mt-4 table-striped">
                <thead>
                  <tr className="ltr:text-left rtl:text-right">
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                    <th>Contact Number</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {clients.map((client, index) => (
                    <tr
                      key={client._id || index}
                      className="ltr:text-left rtl:text-right"
                    >
                      <td>{client.firstName}</td>
                      <td>{client.lastName}</td>
                      <td>{client.email}</td>
                      <td>{client.dateOfBirth}</td>
                      <td>{client.phoneNumber}</td>
                      <td>
                        <Link to={`/clients/${client.id}`}>
                          <button
                            type="button"
                            className="btn py-1 px-3.5 text-xs bg-black border border-black rounded-md text-white transition-all duration-300 hover:bg-black/[0.85] hover:border-black/[0.85]"
                          >
                            View Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen &&
        createPortal(
          <Modal
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            title="Create New Client"
            divClass="flex items-start justify-center min-h-screen px-4"
            content={<AddNewClients toggleModal={toggleModal} />}
            sizeClass="relative w-full max-w-lg p-0 my-8 overflow-hidden bg-white border rounded-lg border-black/10 dark:bg-darklight dark:border-darkborder"
            spaceClass="p-5 space-y-4"
          />,
          document.body
        )}
      <Toaster duration={12000} />
    </>
  );
};

export default Clients;
