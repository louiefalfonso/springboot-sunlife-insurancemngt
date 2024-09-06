import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../layout/Modal";
import { createPortal } from "react-dom";
import ClientService from "../../services/ClientService";
import DeleteClient from "./DeleteClient";
import UpdateClient from "./UpdateClient";

const ClientDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [currentClient, setCurrentClient] = useState({});
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
    const fetchCurrentClient = async () => {
      try {
        const response = await ClientService.getClientById(id);
        setCurrentClient(response.data);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };
    fetchCurrentClient();
  }, [id]);


  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Client Details</h2>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="btn py-1 px-3.5 text-xs bg-warning border border-warning rounded-md text-black transition-all duration-300 hover:bg-warning/[0.85] hover:border-warning/[0.85]"
            >
              Back
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 ">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            {Object.keys(currentClient).length > 0 ? (
              <div className="space-y-4">
                <div className="overflow-auto" key={currentClient}>
                  <table className="w-full mt-4">
                    <tbody>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">First Name:</td>
                        <td>{currentClient.firstName}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Last Name:</td>
                        <td>{currentClient.lastName}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Date Of Birth:</td>
                        <td>{currentClient.dateOfBirth}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Email Address:</td>
                        <td>{currentClient.email}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Phone Number:</td>
                        <td>{currentClient.phoneNumber}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Address</td>
                        <td>{currentClient.address}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Additional Details:</td>
                        <td className="break-words whitespace-normal">{currentClient.notes}</td>
                      </tr>

                      <tr className="ltr:text-left rtl:text-right">
                        <td>
                          <button
                            type="button"
                            onClick={toggleUpdateModal}
                            className="btn py-1 px-3.5  mr-2 text-xs bg-info border border-info border-info rounded-md text-white transition-all duration-300 hover:bg-info/[0.85] hover:border-info/[0.85]"
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            onClick={toggleDeleteModal}
                            className="btn py-1 px-3.5 text-xs bg-danger border border-danger border-danger rounded-md text-white transition-all duration-300 hover:bg-danger/[0.85] hover:border-danger/[0.85]"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p>No Details Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {isUpdateModalOpen &&
        createPortal(
          <Modal
            isOpen={isUpdateModalOpen}
            toggleModal={toggleUpdateModal}
            title="Update Clien Details"
            divClass="flex items-start justify-center min-h-screen px-4"
            content={<UpdateClient toggleModal={toggleUpdateModal} />}
            sizeClass="relative w-full max-w-lg p-0 my-8 overflow-hidden bg-white border rounded-lg border-black/10 dark:bg-darklight dark:border-darkborder"
            spaceClass="p-5 space-y-4"
          />,
          document.body
        )}
      {isDeleteModalOpen &&
        createPortal(
          <Modal
            isOpen={isDeleteModalOpen}
            toggleModal={toggleDeleteModal}
            title="Delete Client"
            divClass="flex items-center justify-center min-h-screen px-4"
            content={<DeleteClient toggleModal={toggleDeleteModal} />}
            sizeClass="relative w-full max-w-lg p-0 my-8 overflow-hidden bg-white border rounded-lg border-black/10 dark:bg-darklight dark:border-darkborder"
            spaceClass="p-5 space-y-4"
          />,
          document.body
        )}
    </>
  );
};

export default ClientDetails;
