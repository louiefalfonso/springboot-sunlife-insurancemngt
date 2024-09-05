import React, { useState, useEffect } from "react";
import ClaimService from "../../services/ClaimService";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const ClaimChart = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await ClaimService.getAllClaims();
        setClaims(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClaims();
  }, []);

  useEffect(() => {
    if (claims.length > 0) {
      const claimCounts = {};
      claims.forEach((claim) => {
        const type = claim.claimAmount;
        if (!claimCounts[type]) {
          claimCounts[type] = 0;
        }
        claimCounts[type]++;
      });

      const newChartData = Object.keys(claimCounts).map((type, index) => ({
        id: `claim-${index}`, // Generate a unique id for each data point
        claimAmount: type,
        count: claimCounts[type],
      }));
      setChartData(newChartData);
    }
  }, [claims]);

  return (
    <>
      <div className="overflow-auto">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              stroke="#8884d8"
              fill="#8884d8"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="claimAmount" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  );
};

export default ClaimChart;
