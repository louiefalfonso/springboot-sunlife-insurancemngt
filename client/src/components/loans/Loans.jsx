import React, { useState, useEffect } from "react";
import Modal from "../layout/Modal";
import { createPortal } from "react-dom";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import LoanService from '../../services/LoanService.js'
import AddNewLoan from "./AddNewLoan.jsx";

const Loans = () => {

  const [loans, setLoans] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await LoanService.getAllLoans();
        setLoans(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLoans();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Loan List</h2>
              <button
                type="button"
                onClick={toggleModal}
                className="btn py-1 px-3.5 text-xs bg-warning border border-warning rounded-md text-black transition-all duration-300 hover:bg-warning/[0.85] hover:border-warning/[0.85]"
              >
                + Add New Loan
              </button>
            </div>
            <div className="overflow-auto">
              <table className="min-w-[640px] w-full mt-4 table-striped">
                <thead>
                  <tr className="ltr:text-left rtl:text-right">
                    <th>Loan Number</th>
                    <th>Loan Status</th>
                    <th>Loan Amount</th>
                    <th>Issued To</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {loans.map((loan, index) => (
                    <tr
                      key={loan._id || index}
                      className="ltr:text-left rtl:text-right"
                    >
                      <td>{loan.loanNumber}</td>
                      <td>{loan.loanStatus}</td>
                      <td>£{loan.loanAmount}</td>
                      <td>
                        {loan.client.firstName} {loan.client.lastName}
                      </td>

                      <td>
                        <Link to={`/loans/${loan.id}`}>
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
            content={<AddNewLoan toggleModal={toggleModal} />}
            sizeClass="relative w-full max-w-lg p-0 my-8 overflow-hidden bg-white border rounded-lg border-black/10 dark:bg-darklight dark:border-darkborder"
            spaceClass="p-5 space-y-4"
          />,
          document.body
        )}
      <Toaster duration={12000} />
    </>
  );
}

export default Loans