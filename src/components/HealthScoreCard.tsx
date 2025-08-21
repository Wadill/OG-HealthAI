import React, { useState } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HealthScore } from '../types';

interface HealthScoreCardProps {
  score: HealthScore;
  address: string;
  chain: string;
}

const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ score, address, chain }) => {
  const [showInsights, setShowInsights] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const progressBarVariants: Variants = {
    hidden: { width: 0 },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      transition: {
        duration: 1,
        ease: 'easeInOut' as Easing,
      },
    }),
  };

  const gaugeVariants: Variants = {
    hidden: { rotate: -90 },
    visible: (score: number) => ({
      rotate: -90 + (score / 100) * 180,
      transition: { duration: 1, ease: 'easeInOut' as Easing },
    }),
  };

  const trendData = [
    { date: '2025-07-01', transactions: 5 },
    { date: '2025-07-05', transactions: 8 },
    { date: '2025-07-10', transactions: 3 },
    { date: '2025-07-13', transactions: 6 },
  ];

  const exportToCSV = () => {
    const csvContent = [
      ['Metric', 'Score', 'Explanation'],
      ['Overall', score.overallScore, 'Overall health assessment based on metrics below'], // Added generic explanation
      ['Activity', score.activityScore, score.explanations.activity],
      ['Diversification', score.diversificationScore, score.explanations.diversification],
      ['Profitability', score.profitabilityScore, score.explanations.profitability],
      ['Security', score.securityScore, score.explanations.security],
      ['Risk', score.riskScore, score.explanations.risk],
      ['MCP Insights', 'N/A', score.explanations.mcpInsights],
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `health_metrics_${address}_${chain}.csv`;
    link.click();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(107, 70, 193, 0.3)' }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-gray-800 rounded-xl shadow-xl border border-purple-900"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text mb-4">
        Wallet Health Score
      </h2>
      <motion.div variants={itemVariants} className="space-y-6">
        <div>
          <p className="text-lg font-semibold text-gray-300">
            Overall Score: <span className="text-green-400">{score.overallScore}/100</span>
          </p>
          <motion.div
            className="h-4 bg-gray-700 rounded-full overflow-hidden mt-2"
            variants={progressBarVariants}
            initial="hidden"
            animate="visible"
            custom={score.overallScore}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-teal-500"
              style={{ borderRadius: '9999px' }}
            />
          </motion.div>
        </div>
        {['activityScore', 'diversificationScore', 'profitabilityScore', 'securityScore', 'riskScore'].map((key) => (
          <motion.div
            key={key}
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(75, 94, 252, 0.2)' }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-gray-400 capitalize">
              <span>{`${key.replace('Score', '')}: ${score[key as keyof HealthScore]}/100`}</span>
            </p>
            <motion.div
              className="h-2 bg-gray-700 rounded-full overflow-hidden"
              variants={progressBarVariants}
              initial="hidden"
              animate="visible"
              custom={score[key as keyof HealthScore]}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                style={{ borderRadius: '9999px' }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowInsights(!showInsights)}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          {showInsights ? 'Hide Insights' : 'Show Metric Insights'}
        </motion.button>
        {showInsights && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-gray-900 rounded-lg shadow-inner"
          >
            <h3 className="text-lg font-semibold text-gray-200">AI-Powered Insights</h3>
            <p className="text-gray-400 mt-2">{score.explanations.mcpInsights}</p>
          </motion.div>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Risk Assessment</h3>
        <div className="relative w-32 h-16 mx-auto">
          <svg width="100%" height="100%" viewBox="0 0 100 50">
            <path d="M10,50 A40,40 0 0,1 90,50" stroke="#4B5563" strokeWidth="8" fill="none" />
            <motion.path
              d="M10,50 A40,40 0 0,1 90,50"
              stroke={score.riskScore > 80 ? '#10B981' : score.riskScore > 50 ? '#F59E0B' : '#EF4444'}
              strokeWidth="8"
              fill="none"
              strokeDasharray="125.6"
              strokeDashoffset={125.6 * (1 - score.riskScore / 100)}
              variants={gaugeVariants}
              initial="hidden"
              animate="visible"
              custom={score.riskScore}
            />
            <motion.line
              x1="50"
              y1="50"
              x2="50"
              y2="30"
              stroke="#D1D5DB"
              strokeWidth="4"
              variants={gaugeVariants}
              initial="hidden"
              animate="visible"
              custom={score.riskScore}
            />
          </svg>
          <p className="text-center text-sm text-gray-400 mt-2">Risk Score: {score.riskScore}/100</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Transaction Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="date" stroke="#D1D5DB" />
              <YAxis stroke="#D1D5DB" />
              <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: 'none' }} />
              <Line type="monotone" dataKey="transactions" stroke="#6B46C1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={exportToCSV}
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Export Metrics to CSV
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HealthScoreCard;