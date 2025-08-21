import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const MCPInsightsDashboard: React.FC<{ data: any }> = ({ data }) => {
  const chartData = data.ethereum.transactions.map((tx: any) => ({
    date: new Date(tx.timestamp).toLocaleDateString(),
    value: tx.value,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-semibold text-purple-300 mb-4">MCP Insights Dashboard</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
          <XAxis dataKey="date" stroke="#D1D5DB" />
          <YAxis stroke="#D1D5DB" />
          <Tooltip contentStyle={{ backgroundColor: '#1A202C' }} />
          <Line type="monotone" dataKey="value" stroke="#6B46C1" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-4 text-gray-400">Insight: {data.mcpInsights || 'Analyzing trends...'}</p>
    </motion.div>
  );
};

export default MCPInsightsDashboard;