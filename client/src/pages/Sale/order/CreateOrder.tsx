import { findLead } from "@entities/lead/api";
import type { LeadItem } from "@entities/lead/model/types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const CreateOrder = () => {
  const [lead, setLead] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const ok = await findLead({ status: "READY_TO_ORDER" });
        if (ok) {
          setLead(ok.content);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const toggleLeadSelection = (leadId: string) => {
    setSelectedLeadId((curr) => (curr === leadId ? null : leadId));
  };

  const handleCreateOrder = () => {
    if (!selectedLeadId) return;
    console.log(selectedLeadId);
    navigate(`/create-orders/${selectedLeadId}`);
    console.log("Creating order for lead:", selectedLeadId);
  };

  const selectedCount = selectedLeadId ? 1 : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className=" bg-[#1e2023] z-50 overflow-hidden flex"
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-gradient-to-r from-[#2a2c2e] to-[#323437] border-b border-[#3f4245] px-8 py-6 shadow-xl">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#dcdcdc] tracking-tight">
                  Create New Order
                </h1>
                <p className="text-[#90999a] mt-2 text-lg">
                  Create and management lead in progress
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: selectedCount > 0 ? 1.05 : 1 }}
                whileTap={{ scale: selectedCount > 0 ? 0.95 : 1 }}
                onClick={handleCreateOrder}
                disabled={selectedCount === 0}
                className={`px-8 py-4 rounded-xl cursor-pointer font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg ${
                  selectedCount > 0
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-green-500/25 hover:shadow-xl"
                    : "bg-[#3f4245] text-[#90999a] cursor-not-allowed"
                }`}
              >
                Create Orders ({selectedCount})
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-4 rounded-xl bg-[#323437] border border-[#3f4245] text-[#90999a] hover:text-[#dcdcdc] hover:border-blue-500/30 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#2a2c2e] border-b border-[#3f4245] px-8 py-6"
        >
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-xl p-4 border border-blue-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-[#90999a] text-sm font-medium">
                  Tổng leads
                </span>
              </div>
              <p className="text-2xl font-bold text-[#dcdcdc] mt-2">
                {lead.length}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-xl p-4 border border-green-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-[#90999a] text-sm font-medium">
                  Đã chọn
                </span>
              </div>
              <p className="text-2xl font-bold text-[#dcdcdc] mt-2">
                {selectedCount}
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-xl p-4 border border-amber-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-[#90999a] text-sm font-medium">
                  In Progress
                </span>
              </div>
              <p className="text-2xl font-bold text-[#dcdcdc] mt-2">
                {lead.length}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-[#90999a] text-sm font-medium">
                  Sẵn sàng
                </span>
              </div>
              <p className="text-2xl font-bold text-[#dcdcdc] mt-2">
                {lead.filter((l) => l.assignee).length}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 overflow-hidden bg-[#1e2023] p-8">
          <div className="grid grid-cols-12 gap-8 h-full">
            <div className="col-span-8 flex flex-col">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-[#2a2c2e] to-[#252729] rounded-2xl border border-[#3f4245] shadow-2xl h-full flex flex-col overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#323437] to-[#2a2c2e] px-6 py-5 border-b border-[#3f4245]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-3 rounded-xl shadow-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#dcdcdc] tracking-wide">
                          Lead list with status: IN_PROGRESS
                        </h2>
                        <p className="text-sm text-[#90999a] mt-1">
                          Note: You can only create one order for one lead at a
                          time — multiple leads are not allowed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button className="px-4 py-2 bg-[#3f4245] rounded-lg text-[#90999a] hover:text-[#dcdcdc] hover:bg-[#525559] transition-all duration-200">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
                          />
                        </svg>
                      </button>

                      <button className="px-4 py-2 bg-[#3f4245] rounded-lg text-[#90999a] hover:text-[#dcdcdc] hover:bg-[#525559] transition-all duration-200">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
                      ></motion.div>
                    </div>
                  ) : lead.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="bg-[#323437] rounded-full p-6 mb-6">
                        <svg
                          className="w-12 h-12 text-[#90999a]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-[#dcdcdc] mb-2">
                        Không có leads nào
                      </h3>
                      <p className="text-[#90999a] max-w-md">
                        Hiện tại không có leads nào trong trạng thái "In
                        Progress" để tạo đơn hàng
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {lead.map((l, index) => {
                        const idStr = l.leadId.toString();
                        const isSelected = selectedLeadId === idStr;
                        const hasSelection = !!selectedLeadId;
                        const isDisabled = hasSelection && !isSelected;

                        return (
                          <motion.div
                            key={l.leadId}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => {
                              if (isDisabled) return;
                              toggleLeadSelection(idStr);
                            }}
                            aria-disabled={isDisabled}
                            className={`group relative transition-all duration-300 ${
                              isSelected
                                ? "scale-[1.02] cursor-pointer"
                                : isDisabled
                                ? "opacity-50 cursor-not-allowed pointer-events-none"
                                : "hover:scale-[1.01] cursor-pointer"
                            }`}
                          >
                            <div
                              className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                                isSelected
                                  ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-100"
                                  : "bg-gradient-to-r from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100"
                              }`}
                            ></div>

                            <div
                              className={`relative bg-[#323437] rounded-xl p-4 border transition-all duration-300 ${
                                isSelected
                                  ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
                                  : "border-[#3f4245] group-hover:border-blue-500/30"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div>
                                      <span className="text-xs text-[#90999a] uppercase tracking-wider">
                                        ID
                                      </span>
                                      <p className="text-sm font-bold text-[#dcdcdc]">
                                        #{l.leadId}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div>
                                      <span className="text-xs text-[#90999a] uppercase tracking-wider">
                                        Creator
                                      </span>
                                      <p className="text-sm font-bold text-[#dcdcdc] truncate">
                                        {l.createdByName}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <div>
                                      <span className="text-xs text-[#90999a] uppercase tracking-wider">
                                        Product
                                      </span>
                                      <p className="text-sm font-bold text-[#dcdcdc] truncate">
                                        {l.product}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    <div>
                                      <span className="text-xs text-[#90999a] uppercase tracking-wider">
                                        Assignee
                                      </span>
                                      <p className="text-sm font-bold text-[#dcdcdc] truncate">
                                        {l.assignee
                                          ? `${l.assignee}`
                                          : "Chưa gán"}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-3 ml-4">
                                  <div
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      l.status === "READY_TO_ORDER"
                                        ? "bg-amber-500/20 text-amber-400"
                                        : "bg-gray-500/20 text-gray-400"
                                    }`}
                                  >
                                    {l.status}
                                  </div>

                                  <div
                                    className={`w-5 h-5 rounded-md border transition-all duration-300 flex items-center justify-center ${
                                      isSelected
                                        ? "bg-blue-500 border-blue-500"
                                        : "border-[#3f4245] group-hover:border-blue-500/50"
                                    }`}
                                  >
                                    {isSelected && (
                                      <motion.svg
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-3 h-3 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={3}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </motion.svg>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="col-span-4 space-y-6">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-[#2a2c2e] to-[#252729] rounded-2xl border border-[#3f4245] shadow-2xl"
              >
                <div className="bg-gradient-to-r from-[#323437] to-[#2a2c2e] p-6 border-b border-[#3f4245] rounded-t-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-cyan-500 to-teal-600 p-3 rounded-xl shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#dcdcdc] tracking-wide">
                        Action
                      </h3>
                      <p className="text-sm text-[#90999a] mt-1">
                        Thao tác với leads được chọn
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <button
                    disabled={selectedCount === 0}
                    className={`w-full p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedCount > 0
                        ? "bg-gradient-to-r from-green-500/10 to-emerald-600/10 border-green-500/30 text-green-400 hover:bg-green-500/20"
                        : "bg-[#323437] border-[#3f4245] text-[#90999a] cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5"
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
                      <span className="font-bold">Create Orders</span>
                    </div>
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-[#2a2c2e] to-[#252729] rounded-2xl border border-[#3f4245] shadow-2xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5 text-white"
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
                  </div>
                  <h4 className="text-lg font-bold text-[#dcdcdc]">
                    Tóm tắt lựa chọn
                  </h4>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-[#323437] rounded-lg border border-[#3f4245]">
                    <span className="text-[#90999a] text-sm font-medium">
                      Leads đã chọn:
                    </span>
                    <span className="text-[#dcdcdc] font-bold">
                      {selectedCount}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-[#323437] rounded-lg border border-[#3f4245]">
                    <span className="text-[#90999a] text-sm font-medium">
                      Tổng leads:
                    </span>
                    <span className="text-[#dcdcdc] font-bold">
                      {lead.length}
                    </span>
                  </div>

                  {selectedCount > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="mt-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-600/10 rounded-xl border border-green-500/20"
                    >
                      <p className="text-green-400 text-sm font-medium text-center">
                        ✓ Sẵn sàng tạo {selectedCount} đơn hàng
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2a2c2e;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3f4245, #5a5d61);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #5a5d61, #6b7075);
        }
      `}</style>
    </motion.div>
  );
};
