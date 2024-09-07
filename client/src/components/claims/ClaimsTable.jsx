import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClaimService from "../../services/ClaimService.js";
import ClaimChart from "./ClaimChart.jsx";

const ClaimsTable = () => {
    const [claims, setClaims] = useState([]);

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

     const getStatusColor = (claimStatus) => {
       switch (claimStatus) {
         case "Rejected":
           return "bg-danger text-white";
         case "Approved":
           return "bg-success text-white";
         case "In-Progress":
           return "bg-purple text-white";
         default:
           return "bg-info text-white dark:bg-darkmuted";
       }
     };  

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Claim List</h2>
              <Link to="/claims">
                <button
                  type="button"
                  className="btn py-1 px-3.5 text-xs bg-info border border-info border-info rounded-md text-white transition-all duration-300 hover:bg-info/[0.85] hover:border-info/[0.85]"
                >
                  View Full List
                </button>
              </Link>
            </div>
            <div className="overflow-auto">
              <table className="min-w-[640px] w-full mt-4 table-striped">
                <thead>
                  <tr className="ltr:text-left rtl:text-right">
                    <th>Claim Number</th>
                    <th>Claim Date</th>
                    <th>Status</th>
                    <th>Claim Amout</th>
                    <th>Policy Number</th>
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
                      <td
                        className={`${getStatusColor(
                          claim.claimStatus
                        )} inline-flex items-center rounded-full text-xs justify-center px-1.5 py-0.5 mt-4`}
                      >
                        {claim.claimStatus}
                      </td>
                      <td>£{claim.claimAmount}</td>
                      <td>{claim.policy?.policyNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Claim Chart</h2>
            </div>
            <ClaimChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClaimsTable;
