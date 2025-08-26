import { motion } from "framer-motion";
import { time } from "@shared/lib/time";
import Sidebar from "@widgets/sidebar/ui/sidebar";
import { menuByRole } from "@widgets/sidebar/model/items";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { LeadDetails } from "@entities/lead/model/types";
import { getleadDetails } from "@entities/lead/api";
import { LogComponent } from "@shared/ui/logs/log";
import { getLog } from "@entities/log/api";
import type { LogType } from "@entities/log/model/types";
import UpdateLeadForm from "@features/update-lead/ui/UpdateLeadForm";

export const LeadDetailsPage = () => {
  const { leadId } = useParams<{ leadId: string }>();
  const [leadDetails, setLeadDetails] = useState<LeadDetails | null>(null);
  const [logs, setLogs] = useState<LogType[] | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (leadId) {
        try {
          const numericLeadId = parseInt(leadId);
          const [detailsResponse, logResponse] = await Promise.all([
            getleadDetails(numericLeadId),
            getLog(numericLeadId),
          ]);
          setLeadDetails(detailsResponse);
          setLogs(logResponse.content);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetch();
  }, [leadId]);

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      qualified: "bg-green-500/20 text-green-400 border-green-500/30",
      lost: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return colors[status] || colors.new;
  };

  if (!leadDetails) {
    return (
      <div className="fixed inset-0 bg-[#1e2023] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a9eff] mx-auto mb-4"></div>
          <p className="text-[#90999a]">Loading lead details...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-[#1e2023] z-50 overflow-hidden flex"
    >
      <Sidebar sideBarItems={menuByRole.ROLE_SALE} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-[#2a2c2e] to-[#323437] border-b border-[#3f4245] px-6 py-3 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-[#90999a] hover:text-[#dcdcdc] hover:bg-[#3f4245] rounded-xl transition-all duration-200">
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#4a9eff] to-[#0066cc] rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-[#dcdcdc] flex items-center">
                    Lead #{leadDetails?.id}
                    <span
                      className={`ml-2 px-2 py-1 text-xs font-medium rounded-lg border ${getStatusColor(
                        "new"
                      )}`}
                    >
                      NEW
                    </span>
                  </h1>
                  <p className="text-xs text-[#90999a]">
                    {leadDetails.customerName}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#90999a]">Created</p>
              <p className="text-sm font-medium text-[#dcdcdc]">
                {time(leadDetails.createdAt)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-[#1e2023] to-[#252830]">
          <div className="grid grid-cols-3 gap-4 h-full max-w-6xl mx-auto">
            <div className="col-span-2 space-y-4">
              {/* Customer Information Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#2a2c2e] to-[#323437] rounded-xl p-5 border border-[#3f4245] shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#4a9eff] to-[#0066cc] rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#dcdcdc]">
                    Customer Information
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {[
                      {
                        label: "Marketing Team",
                        value: `${leadDetails.createdByName}_${leadDetails.createdByTeamName}`,
                      },
                      { label: "Customer", value: leadDetails.customerName },
                      { label: "Phone", value: leadDetails.phoneNumber },
                      { label: "Product", value: leadDetails.productName },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        className="flex justify-between items-center p-3 bg-[#1e2023]/50 rounded-lg border border-[#3f4245]/50 hover:bg-[#3f4245]/30 transition-all duration-200"
                      >
                        <span className="text-[#90999a] font-medium text-sm">
                          {item.label}
                        </span>
                        <span className="text-[#dcdcdc] font-semibold text-sm text-right max-w-[180px] truncate">
                          {item.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Address",
                        value: leadDetails.address || "Not provided",
                      },
                      { label: "Created", value: time(leadDetails.createdAt) },
                      {
                        label: "Assigned",
                        value: leadDetails.assignedAt
                          ? time(leadDetails.assignedAt)
                          : "Not assigned",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        className="flex justify-between items-center p-3 bg-[#1e2023]/50 rounded-lg border border-[#3f4245]/50 hover:bg-[#3f4245]/30 transition-all duration-200"
                      >
                        <span className="text-[#90999a] font-medium text-sm">
                          {item.label}
                        </span>
                        <span className="text-[#dcdcdc] font-semibold text-sm text-right max-w-[180px] truncate">
                          {item.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Action Form Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-[#2a2c2e] to-[#323437] rounded-xl p-5 border border-[#3f4245] shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#dcdcdc]">
                    Sales Action
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Sales Rep Info */}
                  <div className="p-3 bg-[#1e2023]/50 rounded-lg border border-[#3f4245]/50">
                    <div className="flex items-center">
                      <span className="text-[#90999a] font-medium mr-2 text-sm">
                        Sales Rep:
                      </span>
                      <span className="text-[#dcdcdc] font-semibold text-sm">
                        {leadDetails.assignee && leadDetails.assigneeTeam
                          ? `${leadDetails.assignee}_${leadDetails.assigneeTeam}`
                          : "Unassigned"}
                      </span>
                    </div>
                  </div>

                  <UpdateLeadForm leadId={leadDetails.id} />
                </div>
              </motion.div>
            </div>

            <div className="col-span-1">
              <LogComponent logs={logs} leadId={leadId} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
