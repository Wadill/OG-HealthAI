import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import WalletInput from './components/WalletInput';
import HealthScoreCard from './components/HealthScoreCard';
import ExplanationSection from './components/ExplanationSection';
import HealthPendulum from './components/HealthPendulum';
import { HealthScore } from './types';

const App: React.FC = () => {
  const [healthScores, setHealthScores] = useState<{ address: string; chain: string; score: HealthScore }[]>([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const calculateHealthScore = (address: string, chain: string): HealthScore => ({
    overallScore: 75,
    activityScore: 80,
    diversificationScore: 70,
    profitabilityScore: 65,
    securityScore: 85,
    riskScore: 90,
    explanations: {
      activity: 'High transaction activity observed.',
      diversification: 'Moderate asset diversity.',
      profitability: 'Stable ROI performance.',
      security: 'Strong security measures in place.',
      risk: 'Low risk profile detected.',
      mcpInsights: 'Wallet shows balanced activity and holdings.',
    },
  });

  const fetchWalletData = (address: string, chain: string) => {
    setLoading(true);
    if (!address.match(/^0x[a-fA-F0-9]{40}$/) && chain !== 'Aptos') {
      toast.error('Invalid wallet address');
      setLoading(false);
      return;
    }
    setTimeout(() => {
      const score = calculateHealthScore(address, chain);
      setHealthScores((prev) => [...prev, { address, chain, score }]);
      setLoading(false);
    }, 1000);
  };

  const generatePDF = (score: HealthScore, address: string, chain: string) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('MultiChain HealthAI Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Wallet: ${address}`, 20, 30);
    doc.text(`Chain: ${chain}`, 20, 40);
    doc.text(`Overall Score: ${score.overallScore}/100`, 20, 50);
    Object.entries(score.explanations).forEach(([key, value], i) => {
      doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, 20, 60 + i * 10);
    });
    doc.save(`health_report_${address}_${chain}.pdf`);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div
      className="min-h-screen py-10 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 text-gray-200 transition-colors duration-300"
      style={{ backgroundColor: darkMode ? '#1A202C' : '#F7FAFC' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            OG HealthAI
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
            onClick={toggleDarkMode}
            className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white shadow-lg"
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </motion.button>
        </div>
        <WalletInput onSubmit={fetchWalletData} />
        {loading && (
          <div className="text-center mt-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-400"></div>
          </div>
        )}
        {healthScores.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {healthScores.map(({ address, chain, score }, index) => (
              <div key={`${address}-${chain}-${index}`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                    Wallet: {address.slice(0, 6)}...{address.slice(-4)} ({chain})
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                    onClick={() => generatePDF(score, address, chain)}
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-2 rounded-lg shadow-md"
                  >
                    Download Report
                  </motion.button>
                </div>
                <HealthScoreCard score={score} address={address} chain={chain} />
                <ExplanationSection explanations={score.explanations} />
              </div>
            ))}
          </div>
        )}
        {healthScores.length > 0 && (
          <HealthPendulum overallScore={healthScores[healthScores.length - 1].score.overallScore} />
        )}
        <ToastContainer position="top-right" autoClose={3000} theme={darkMode ? 'dark' : 'light'} />
      </div>
    </div>
  );
};

export default App;