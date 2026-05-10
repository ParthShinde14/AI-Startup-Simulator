// src/pages/Dashboard.jsx

import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

import RevenueChart from "../charts/RevenueChart";
import UserChart from "../charts/UserChart";

import AIAdvisor from "../components/AIAdvisor";
import SimulationPanel from "../components/SimulationPanel";
import EmployeePanel from "../components/EmployeePanel";
import PricingPanel from "../components/PricingPanel"

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);

  const [startupData, setStartupData] = useState(null);

  const [chartData, setChartData] = useState([]);

  // =========================
  // FETCH DATA
  // =========================

  const fetchStartupData = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:5000/startup",

        {
          params: {
            user_id: localStorage.getItem("user_id"),
          },
        },
      );

      setStartupData(res.data);

      setChartData((prev) => [
        ...prev,

        {
          month: `M${res.data.month}`,

          revenue: res.data.mrr,

          users: res.data.activeUsers,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStartupData();
  }, []);

  if (!startupData) {
    return (
      <div
        className="
      text-white
      min-h-screen
      flex
      items-center
      justify-center
      text-3xl
      "
      >
        Loading Startup Data...
      </div>
    );
  }

  return (
    <div
      className={`
    flex
    min-h-screen

    ${darkMode ? "bg-black text-white" : "bg-gray-100 text-black"}
    `}
    >
      <Sidebar />

      <div className="flex-1">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div
          className="
        p-10
        space-y-8
        "
        >
          {/* KPI GRID */}

          <div
            className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-5
          gap-5
          "
          >
            <StatCard
              title="Revenue"
              value={`$${startupData.revenue}`}
              growth="Total Revenue"
            />

            <StatCard
              title="MRR"
              value={`$${startupData.mrr}`}
              growth="Recurring Revenue"
            />

            <StatCard
              title="ARR"
              value={`$${startupData.arr}`}
              growth="Annual Revenue"
            />

            <StatCard
              title="Active Users"
              value={startupData.activeUsers}
              growth="Engaged Customers"
            />

            <StatCard
              title="New Users"
              value={startupData.newUsers}
              growth="Monthly Acquisition"
            />

            <StatCard
              title="Burn Rate"
              value={`$${startupData.burnRate}`}
              growth="Monthly Expenses"
            />

            <StatCard
              title="Cash"
              value={`$${startupData.cash}`}
              growth="Available Capital"
            />

            <StatCard
              title="Runway"
              value={`${startupData.runway} Months`}
              growth="Survival Timeline"
            />

            <StatCard
              title="LTV"
              value={`$${startupData.ltv}`}
              growth="Customer Value"
            />

            <StatCard
              title="CAC"
              value={`$${startupData.cac}`}
              growth="Acquisition Cost"
            />

            <StatCard
              title="Valuation"
              value={`$${startupData.valuation}`}
              growth="Company Worth"
            />

            <StatCard
              title="Retention Rate"
              value={`${Math.round(startupData.retentionRate * 100)}%`}
              growth="Customer Loyalty"
            />

            <StatCard
              title="Product Quality"
              value={`${Math.round(startupData.productQuality)}%`}
              growth="Platform Stability"
            />

            <StatCard
              title="Investor Confidence"
              value={`${Math.round(startupData.investorConfidence)}%`}
              growth="Funding Potential"
            />

            <StatCard
              title="Team Size"
              value={startupData.teamSize}
              growth="Employees"
            />

            <StatCard
              title="Customer Satisfaction"
              value={`${Math.round(startupData.customerSatisfaction)}%`}
              growth="User Experience"
            />

            <StatCard
              title="Market Share"
              value={`${Math.round(startupData.marketShare)}%`}
              growth="Industry Position"
            />

            <StatCard
              title="Growth Rate"
              value={`${Math.round(startupData.growthRate)}%`}
              growth="Monthly Expansion"
            />

            <StatCard
              title="Risk Score"
              value={`${Math.round(startupData.riskScore)}/100`}
              growth="Business Risk"
            />

            <StatCard
              title="Competitor Pressure"
              value={`${Math.round(startupData.competitorPressure)}%`}
              growth="Market Competition"
            />

            <StatCard
              title="Funding Round"
              value={startupData.fundingRound}
              growth="Investor Stage"
            />

            <StatCard
              title="Projected ARR"
              value={`$${startupData.projectedARR}`}
              growth="12 Month Forecast"
            />

            <StatCard
              title="Projected Runway"
              value={`${startupData.projectedRunway} Months`}
              growth="Future Survival"
            />

            <StatCard
              title="Bankruptcy Risk"
              value={`${startupData.bankruptcyRisk}%`}
              growth="Failure Probability"
            />

            <StatCard
              title="Investor Readiness"
              value={`${startupData.investorReadiness}%`}
              growth="Funding Potential"
            />

            <StatCard
              title="Pricing Strategy"
              value={startupData.pricingStrategy}
              growth="Monetization Model"
            />
          </div>

          {/* CHARTS */}

          <div
            className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-8
          "
          >
            <RevenueChart chartData={chartData} />

            <UserChart chartData={chartData} />
          </div>

          {/* EMPLOYEE PANEL */}

          <EmployeePanel fetchStartupData={fetchStartupData} />

          {/* SIMULATION */}

          <SimulationPanel fetchStartupData={fetchStartupData} />

          {/* AI ADVISOR */}

          <AIAdvisor startupData={startupData} />

          <PricingPanel fetchStartupData={fetchStartupData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
