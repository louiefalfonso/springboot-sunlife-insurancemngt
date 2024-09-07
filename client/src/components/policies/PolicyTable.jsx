import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PolicyService from "../../services/PolicyService.js";
import PolicyChart from "./PolicyChart.jsx";

const PolicyTable = () => {

  const [policies, setPolicies] = useState([]);

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
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Policy List</h2>
              <Link to="/policies">
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
                    <th>Policy Number</th>
                    <th>Policy Type</th>
                    <th>Coverage Amount</th>
                    <th>Issued To</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Policy Chart</h2>
            </div>
            <PolicyChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default PolicyTable