import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClientService from "../../services/ClientService.js";

const ClientTable = () => {

  const [clients, setClients] = useState([]);

    useEffect(() => {
      const fetchClients = async () => {
        try {
          const response = await ClientService.getAllClients();
          setClients(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchClients();
    }, []);
    
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Client List</h2>
              <Link to="/clients">
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
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                    <th>Contact Number</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {clients.map((client, index) => (
                    <tr
                      key={client._id || index}
                      className="ltr:text-left rtl:text-right"
                    >
                      <td>{client.firstName}</td>
                      <td>{client.lastName}</td>
                      <td>{client.email}</td>
                      <td>{client.dateOfBirth}</td>
                      <td>{client.phoneNumber}</td>
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
}

export default ClientTable