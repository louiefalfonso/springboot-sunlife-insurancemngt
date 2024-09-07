import React, { useState, useEffect } from "react";
import ClaimService from "../../services/ClaimService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from "recharts";

const ClaimChart = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await ClaimService.getAllClaims();
        setClaims(response.data);

        const chartData = response.data.map((claim, index) => {
          return {
            name: `Claim ${index + 1}`,
            value: parseFloat(claim.claimAmount),
            label: claim.claimStatus,
          };
        });

        setChartData(chartData);
        setLoading(false);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchClaims();
  }, []);

  // defaultProps error from XAxis & YAxis  Display (Dev Mode Only)
  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === "string" && /defaultProps/.test(args[0])) {
        return;
      }
      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

 
  return (
    <>
      <div className="overflow-auto">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tickFormatter={(tick) => {
                  const claim = chartData.find((claim) => claim.name === tick);
                  return claim ? claim.label : tick;
                }}
              />
              <YAxis
                domain={[0, Math.max(...chartData.map((data) => data.value))]}
              />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};

export default ClaimChart;
