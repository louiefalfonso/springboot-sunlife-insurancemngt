import React, { useState, useEffect } from "react";
import Modal from "../layout/Modal";
import { createPortal } from "react-dom";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import PolicyService from "../../services/PolicyService.js"
import AddNewPolicy from "./AddNewPolicy.jsx";
import CountPolicy from "./CountPolicy.jsx";

const Policies = () => {
    const [policies, setPolicies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
      const fetchPolicies = async () => {
        try {
          const response = await PolicyService.getAllPolicies();
          setPolicies(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchPolicies();
    }, []);

  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="gap-5 p-5 bg-white border rounded dark:bg-darklight dark:border-darkborder md:col-span-2 xl:col-span-2 border-black/10">
            <h2 className="text-base font-semibold text-black dark:text-white/80">
              Policy Stats
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <CountPolicy />
            </div>
          </div>
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Policy List</h2>
              <button
                type="button"
                onClick={toggleModal}
                className="btn py-1 px-3.5 text-xs bg-warning border border-warning rounded-md text-black transition-all duration-300 hover:bg-warning/[0.85] hover:border-warning/[0.85]"
              >
                + Add Policy
              </button>
            </div>
            <div className="overflow-auto">
              <table className="min-w-[640px] w-full mt-4 table-striped">
                <thead>
                  <tr className="ltr:text-left rtl:text-right">
                    <th>Policy Number</th>
                    <th>Policy Type</th>
                    <th>Coverage Amount</th>
                    <th>Issued To</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {policies.map((policy, index) => (
                    <tr
                      key={policy._id || index}
                      className="ltr:text-left rtl:text-right"
                    >
                      <td>{policy.policyNumber}</td>
                      <td>{policy.policyType}</td>
                      <td>£{policy.coverageAmount}</td>
                      <td>
                        {policy.client.firstName} {policy.client.lastName}
                      </td>

                      <td>
                        <Link to={`/policies/${policy.id}`}>
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
            title="Create New Policy"
            divClass="flex items-start justify-center min-h-screen px-4"
            content={<AddNewPolicy toggleModal={toggleModal} />}
            sizeClass="relative w-full max-w-lg p-0 my-8 overflow-hidden bg-white border rounded-lg border-black/10 dark:bg-darklight dark:border-darkborder"
            spaceClass="p-5 space-y-4"
          />,
          document.body
        )}
      <Toaster duration={12000} />
    </>
  );
}

export default Policies