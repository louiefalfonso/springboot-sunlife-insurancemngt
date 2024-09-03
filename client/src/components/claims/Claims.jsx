import React, { useState, useEffect } from "react";
import Modal from "../layout/Modal";
import { createPortal } from "react-dom";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import ClaimService from "../../services/ClaimService.js"

const Claims = () => {
    const [claims, setClaims] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };


    useEffect(() => {
      const fetchClaims = async () => {
        try {
          const response = await ClaimService.getAllClaims();
          setClaims(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchClaims();
    }, []);


  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Claim List</h2>
              <button
                type="button"
                //onClick={toggleModal}
                className="btn py-1 px-3.5 text-xs bg-warning border border-warning rounded-md text-black transition-all duration-300 hover:bg-warning/[0.85] hover:border-warning/[0.85]"
              >
                + Add Claim
              </button>
            </div>
            <div className="overflow-auto">
              <table className="min-w-[640px] w-full mt-4 table-striped">
                <thead>
                  <tr className="ltr:text-left rtl:text-right">
                    <th>Claim Number</th>
                    <th>Claim Date</th>
                    <th>Status</th>
                    <th>Claim Amout</th>
                    <th>Policy Type</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {claims.map((claim, index) => (
                    <tr
                      key={claim._id || index}
                      className="ltr:text-left rtl:text-right"
                    >
                      <td>{claim.claimNumber}</td>
                      <td>{claim.claimDate}</td>
                      <td>{claim.claimStatus}</td>
                      <td>£{claim.claimAmount}</td>
                      <td>{claim.policy.policyType}</td>
                      <td>
                        <Link to={`/claims/${claim.id}`}>
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
    </>
  );
};

export default Claims;
