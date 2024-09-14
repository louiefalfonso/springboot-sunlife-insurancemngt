import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import ClaimService from "../../services/ClaimService.js";

const CountClaims = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await ClaimService.getAllClaims();
        const statusCounts = {};

        response.data.forEach((claim) => {
          const status = claim.claimStatus;
          if (!statusCounts[status]) {
            statusCounts[status] = 0;
          }
          statusCounts[status]++;
        });

        setClaims(statusCounts);
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
      <div className="overflow-auto">
        <div className="flex flex-nowrap gap-4">
          {Object.keys(claims).map((status) => (
            <div
              key={status}
              className={`${getStatusColor(status)}
            flex-1 mt-4 text-center border rounded py-9 border-black/10 dark:bg-darklight dark:border-darkborder`}
            >
              <div className="dark:bg-white/5 text-gray flex flex-nowrap gap-4 flex-col">
                <h1 className="mt-6 text-4xl font-semibold dark:text-white">
                  <CountUp end={claims[status]} />
                </h1>
              </div>
              <p
                className={`${getStatusColor(
                  status
                )} inline-flex items-center rounded-full text-xs justify-center px-1.5 py-0.5 mt-4`}
              >
                {" "}
                {status} Claims
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CountClaims