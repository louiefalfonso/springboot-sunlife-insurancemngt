import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../layout/Modal";
import { createPortal } from "react-dom";
import PolicyService from "../../services/PolicyService";
import DeletePolicy from "./DeletePolicy";
import UpdatePolicy from "./UpdatePolicy";

const PolicyDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;

    const [currentPolicy, setCurrentPolicy] = useState({});
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
      const fetchCurrentPolicy = async () => {
        try {
          const response = await PolicyService.getPolicyById(id);
          setCurrentPolicy(response.data);
        } catch (error) {
          setError(error.message);
          console.error(error);
        }
      };
      fetchCurrentPolicy();
    }, [id]);


  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Policy Details</h2>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="btn py-1 px-3.5 text-xs bg-warning border border-warning rounded-md text-black transition-all duration-300 hover:bg-warning/[0.85] hover:border-warning/[0.85]"
            >
              Back
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            {Object.keys(currentPolicy).length > 0 ? (
              <div className="space-y-4">
                <div className="overflow-auto" key={currentPolicy}>
                  <table className="w-full mt-4">
                    <tbody>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Policy Number:</td>
                        <td>{currentPolicy.policyNumber}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Policy Type:</td>
                        <td>{currentPolicy.policyType}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Coverage Amount:</td>
                        <td>£{currentPolicy.coverageAmount}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Premium Amount:</td>
                        <td>£{currentPolicy.premium}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Start Date:</td>
                        <td>{currentPolicy.startDate}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">End Date:</td>
                        <td>{currentPolicy.endDate}</td>
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
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            {Object.keys(currentPolicy).length > 0 ? (
              <div className="space-y-4">
                <div className="overflow-auto" key={currentPolicy}>
                  <table className="w-full mt-4">
                    <tbody>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Policy Holder:</td>
                        <td>
                          {currentPolicy.client.firstName}{" "}
                          {currentPolicy.client.lastName}
                        </td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Date Of Birth</td>
                        <td>{currentPolicy.client.dateOfBirth}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Phone Number</td>
                        <td>{currentPolicy.client.phoneNumber}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Email Address:</td>
                        <td>{currentPolicy.client.email}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Home Address:</td>
                        <td>{currentPolicy.client.address}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Additional Details:</td>
                        <td className="break-words whitespace-normal">
                          {currentPolicy.client.notes}
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
            title="Update Policy Details"
            divClass="flex items-start justify-center min-h-screen px-4"
            content={<UpdatePolicy toggleModal={toggleUpdateModal} />}
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
            title="Delete Policy"
            divClass="flex items-center justify-center min-h-screen px-4"
            content={<DeletePolicy toggleModal={toggleDeleteModal} />}
            sizeClass="relative w-full max-w-lg p-0 my-8 overflow-hidden bg-white border rounded-lg border-black/10 dark:bg-darklight dark:border-darkborder"
            spaceClass="p-5 space-y-4"
          />,
          document.body
        )}
    </>
  );
};

export default PolicyDetails;
