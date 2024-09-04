import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../layout/Modal";
import { createPortal } from "react-dom";
import ClaimService from "../../services/ClaimService";
import DeleteClaim from "./DeleteClaim";
import UpdateClaim from "./UpdateClaim";

const ClaimDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;

    const [currentClaim, setCurrentClaim] = useState({});
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
       const fetchCurrentClaim = async () => {
         try {
           const response = await ClaimService.getClaimById(id);
           setCurrentClaim(response.data);
         } catch (error) {
           setError(error.message);
           console.error(error);
         }
       };
       fetchCurrentClaim();
     }, [id]);



  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Claim Details</h2>
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
            {Object.keys(currentClaim).length > 0 ? (
              <div className="space-y-4">
                <div className="overflow-auto" key={currentClaim}>
                  <table className="w-full mt-4">
                    <tbody>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Claim Number:</td>
                        <td>{currentClaim.claimNumber}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Claim Date:</td>
                        <td>{currentClaim.claimDate}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Claim Status:</td>
                        <td>{currentClaim.claimStatus}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Claim Amount:</td>
                        <td>£{currentClaim.claimAmount}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Claim Description:</td>
                        <td className="break-words whitespace-normal">
                          {currentClaim.description}
                        </td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td>
                          <button
                            type="button"
                            //onClick={toggleUpdateModal}
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
            {Object.keys(currentClaim).length > 0 ? (
              <div className="space-y-4">
                <div className="overflow-auto" key={currentClaim}>
                  <table className="w-full mt-4">
                    <tbody>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Policy Number:</td>
                        <td>{currentClaim.policy.policyNumber}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Policy Type:</td>
                        <td>{currentClaim.policy.policyType}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Coverage Amount:</td>
                        <td>£{currentClaim.policy.coverageAmount}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Premium Amount:</td>
                        <td>£{currentClaim.policy.premium}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">Start Date:</td>
                        <td>{currentClaim.policy.startDate}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td className="font-bold">End Date:</td>
                        <td>{currentClaim.policy.endDate}</td>
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
            title="Update Claim Details"
            divClass="flex items-start justify-center min-h-screen px-4"
            content={<UpdateClaim toggleModal={toggleUpdateModal} />}
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
            title="Delete Claim"
            divClass="flex items-center justify-center min-h-screen px-4"
            content={<DeleteClaim toggleModal={toggleDeleteModal} />}
            sizeClass="relative w-full max-w-lg p-0 my-8 overflow-hidden bg-white border rounded-lg border-black/10 dark:bg-darklight dark:border-darkborder"
            spaceClass="p-5 space-y-4"
          />,
          document.body
        )}
    </>
  );
};

export default ClaimDetails;
