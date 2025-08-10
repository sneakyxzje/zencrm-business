import { useState } from "react";
import Sidebar from "../../components/common/sidebar/Sidebar";
import { menuByRole } from "../../components/common/sidebar/SidebarItems";

type CampaignStatus = "active" | "paused" | "completed" | string;
const MarketingView = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = [
    {
      id: 1,
      title: "Total Campaigns",
      value: "24",
      change: "+12.5%",
      trend: "up",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Email Opens",
      value: "89.2%",
      change: "+5.2%",
      trend: "up",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Click Rate",
      value: "24.8%",
      change: "+8.1%",
      trend: "up",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Conversions",
      value: "1,247",
      change: "+23.1%",
      trend: "up",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  const campaigns = [
    {
      id: 1,
      name: "Summer Sale 2025",
      type: "Email Campaign",
      status: "active",
      progress: 78,
      sent: "12,450",
      opens: "8,912",
      clicks: "2,234",
      budget: "$2,500",
      spent: "$1,950",
    },
    {
      id: 2,
      name: "Product Launch - ZenCRM Pro",
      type: "Social Media",
      status: "active",
      progress: 65,
      sent: "8,200",
      opens: "6,890",
      clicks: "1,876",
      budget: "$5,000",
      spent: "$3,250",
    },
    {
      id: 3,
      name: "Customer Retention Q2",
      type: "Multi-channel",
      status: "paused",
      progress: 45,
      sent: "15,680",
      opens: "11,234",
      clicks: "3,456",
      budget: "$3,800",
      spent: "$1,710",
    },
    {
      id: 4,
      name: "Holiday Special Offers",
      type: "Email Campaign",
      status: "completed",
      progress: 100,
      sent: "9,876",
      opens: "7,654",
      clicks: "2,123",
      budget: "$1,200",
      spent: "$1,180",
    },
  ];
  const getStatusColor = (status: CampaignStatus) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "paused":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: "campaigns",
      label: "Campaigns",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "automation",
      label: "Automation",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#232629] flex">
      {/* Sidebar Component */}
      <Sidebar sideBarItems={menuByRole.ROLE_MARKETING} />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-[#3b3f41]/30 backdrop-blur-sm border-b border-[#4d4d4d] px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#dcdcdc] flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-[#f48024]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
                Marketing Dashboard
              </h1>
              <p className="text-[#90999a] mt-1">
                Manage campaigns, track performance, and optimize your marketing
                efforts
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl px-4 py-2 text-[#dcdcdc] focus:outline-none focus:ring-2 focus:ring-[#f48024]"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button className="bg-[#f48024] hover:bg-[#e06a00] text-white px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                New Campaign
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex space-x-1 bg-[#2d2d2d] rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-[#f48024] text-white shadow-lg"
                    : "text-[#90999a] hover:text-[#dcdcdc] hover:bg-[#3b3f41]"
                }`}
              >
                {tab.icon}
                <span className="ml-2 text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-160px)]">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-[#3b3f41]/60 backdrop-blur-sm border border-[#4d4d4d] rounded-2xl p-6 hover:border-[#f48024]/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[#f48024]/20 rounded-xl text-[#f48024] group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                      stat.trend === "up"
                        ? "text-green-400 bg-green-500/20"
                        : "text-red-400 bg-red-500/20"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#dcdcdc] mb-2">
                  {stat.value}
                </h3>
                <p className="text-[#90999a] text-sm">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Campaigns Table */}
          <div className="bg-[#3b3f41]/60 backdrop-blur-sm border border-[#4d4d4d] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#4d4d4d]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#dcdcdc]">
                  Active Campaigns
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="text-[#90999a] hover:text-[#dcdcdc] p-2 rounded-lg hover:bg-[#2d2d2d] transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </button>
                  <button className="text-[#90999a] hover:text-[#dcdcdc] p-2 rounded-lg hover:bg-[#2d2d2d] transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#2d2d2d]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#90999a] uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#90999a] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#90999a] uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#90999a] uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#90999a] uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#90999a] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4d4d4d]">
                  {campaigns.map((campaign) => (
                    <tr
                      key={campaign.id}
                      className="hover:bg-[#2d2d2d]/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-[#dcdcdc]">
                            {campaign.name}
                          </div>
                          <div className="text-sm text-[#90999a]">
                            {campaign.type}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                            campaign.status
                          )}`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-full bg-[#2d2d2d] rounded-full h-2 mr-2">
                            <div
                              className="bg-gradient-to-r from-[#f48024] to-[#e06a00] h-2 rounded-full transition-all duration-500"
                              style={{ width: `${campaign.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-[#dcdcdc] font-medium">
                            {campaign.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-[#dcdcdc]">
                          <div>Sent: {campaign.sent}</div>
                          <div className="text-[#90999a]">
                            Opens: {campaign.opens} | Clicks: {campaign.clicks}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-[#dcdcdc]">
                          <div>
                            {campaign.spent} / {campaign.budget}
                          </div>
                          <div className="text-[#90999a]">
                            Remaining:{" "}
                            {parseInt(
                              campaign.budget.replace("$", "").replace(",", "")
                            ) -
                              parseInt(
                                campaign.spent.replace("$", "").replace(",", "")
                              )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-[#f48024] hover:text-[#e06a00] p-1 rounded transition-colors">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                          <button className="text-[#90999a] hover:text-[#dcdcdc] p-1 rounded transition-colors">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button className="text-[#90999a] hover:text-red-400 p-1 rounded transition-colors">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingView;
