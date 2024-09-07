import React, { useState, useEffect } from "react";
import PolicyService from "../../services/PolicyService";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PolicyChart = () => {
  const [policies, setPolicies] = useState([]);
  const [policyTypes, setPolicyTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await PolicyService.getAllPolicies();
        setPolicies(response.data);

        const policyTypeCounts = {};
        response.data.forEach((policy) => {
          if (!policyTypeCounts[policy.policyType]) {
            policyTypeCounts[policy.policyType] = 0;
          }
          policyTypeCounts[policy.policyType]++;
        });

        const chartData = Object.keys(policyTypeCounts).map((policyType) => {
          return {
            name: policyType,
            value: policyTypeCounts[policyType],
          };
        });

        setPolicyTypes(chartData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPolicies();
  }, []);

  const getTotalValue = () => {
    return policyTypes.reduce((acc, current) => acc + current.value, 0);
  };


  return (
    <>
      <div className="overflow-auto">
        {policyTypes.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={policyTypes}
                cx="50%"
                cy="50%"
                outerRadius={95}
                fill="#8884d8"
                dataKey="value"
                label={(entry) => {
                  const totalValue = getTotalValue();
                  const percentage = (entry.value / totalValue) * 100;
                  return `${entry.name}: ${percentage.toFixed(0)}%`;
                }}
              >
                {policyTypes.map((entry, index) => (
                  <Cell key={index} fill={getColorByIndex(index)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};

const getColorByIndex = (index) => {
  const colors = [
    "#0088FE",
    "#00C49F",
    "#FF99FF",
    "#FF69B4",
    "#32CD32",
    "#6495ED",
  ];
  return colors[index % colors.length];
};

export default PolicyChart;
