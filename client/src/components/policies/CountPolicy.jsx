import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import PolicyService from "../../services/PolicyService.js";

const CountPolicy = () => {
     const [policies, setPolicies] = useState([]);

     useEffect(() => {
       const fetchPolicies = async () => {
         try {
           const response = await PolicyService.getAllPolicies();
           const statusCounts = {};

           response.data.forEach((policy) => {
             const status = policy.policyType;
             if (!statusCounts[status]) {
               statusCounts[status] = 0;
             }
             statusCounts[status]++;
           });

           setPolicies(statusCounts);
         } catch (error) {
           console.error(error);
         }
       };
       fetchPolicies();
     }, []);

     const getStatusColor = (policyType) => {
       switch (policyType) {
         case "Property Insurance":
           return "bg-success text-white";
         case "Travel Insurance":
           return "bg-purple text-white";
         case "Pet Insurance":
           return "bg-warning text-white";
         default:
           return "bg-info text-white dark:bg-darkmuted";
       }
     };  


  return (
    <>
      <div className="overflow-auto">
        <div className="flex flex-nowrap gap-4">
          {Object.keys(policies).map((status) => (
            <div
              key={status}
              className={`${getStatusColor(status)}
            flex-1 mt-4 text-center border rounded py-9 border-black/10 dark:bg-darklight dark:border-darkborder`}
            >
              <div className="dark:bg-white/5 text-gray flex flex-nowrap gap-4 flex-col">
                <h1 className="mt-6 text-4xl font-semibold dark:text-white">
                  <CountUp end={policies[status]} />
                </h1>
              </div>
              <p
                className={`${getStatusColor(
                  status
                )} inline-flex items-center rounded-full text-xs justify-center px-1.5 py-0.5 mt-4`}
              >
                {" "}
                {status} Cases
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CountPolicy