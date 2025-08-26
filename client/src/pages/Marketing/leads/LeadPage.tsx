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

export default function LeadPage() {
  const { leadId } = useParams();

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

  if (!leadDetails) {
    return <div>No lead details found</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-[#1e2023] z-50 overflow-hidden flex"
    >
      {/* Sidebar */}
      <Sidebar sideBarItems={menuByRole.ROLE_MARKETING} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#2a2c2e] border-b border-[#3f4245] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-[#90999a] hover:text-[#dcdcdc] hover:bg-[#3f4245] rounded-lg transition-all">
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
              <div>
                <h1 className="text-xl font-semibold text-[#dcdcdc]">
                  Lead: #{leadDetails?.id}
                </h1>
                <p className="text-sm text-[#90999a]"></p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-3 gap-6 h-full ">
            <div className="col-span-2 space-y-6">
              {/* Combined Information Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-[#2a2c2e] rounded-xl p-6 border border-[#3f4245]"
              >
                {/* Marketing Information - Top Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-[#dcdcdc] mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3a1 1 0 012 0v4m0 0V3a1 1 0 012 0v4m-4 0h4m-4 0a3 3 0 00-3 3v1a1 1 0 001 1h2a1 1 0 001-1V7a3 3 0 00-3-3z"
                      />
                    </svg>
                    Thông tin Marketing
                  </h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-[#3f4245]">
                        <span className="text-[#90999a] font-medium">
                          Marketing
                        </span>
                        <span className="text-[#dcdcdc] font-semibold">
                          {leadDetails.createdByName}_
                          {leadDetails.createdByTeamName}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-[#3f4245]">
                        <span className="text-[#90999a] font-medium">
                          Customer
                        </span>
                        <span className="text-[#dcdcdc] font-semibold">
                          {leadDetails.customerName}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-[#90999a] font-medium">
                          Phone
                        </span>
                        <span className="text-[#dcdcdc] font-semibold">
                          {leadDetails.phoneNumber}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-[#3f4245]">
                        <span className="text-[#90999a] font-medium">
                          Product
                        </span>
                        <span className="text-[#dcdcdc] font-semibold">
                          {leadDetails.productName}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-[#3f4245]">
                        <span className="text-[#90999a] font-medium">
                          Address
                        </span>
                        <span className="text-[#dcdcdc] font-semibold">
                          {leadDetails.address ? leadDetails.address : "Empty"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-[#3f4245]">
                        <span className="text-[#90999a] font-medium">
                          Created at
                        </span>
                        <span className="text-[#dcdcdc] font-semibold">
                          {time(leadDetails.createdAt)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-[#90999a] font-medium">
                          Assigned at
                        </span>
                        <span className="text-[#dcdcdc] font-semibold">
                          {leadDetails.assignedAt
                            ? time(leadDetails.assignedAt)
                            : "Chưa có"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#3f4245] my-6"></div>

                {/* Sale Information - Bottom Section */}
                <div>
                  <h3 className="text-lg font-medium text-[#dcdcdc] mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Thông tin Sale
                  </h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex  items-center py-3 border-b border-[#3f4245]">
                        <span className="text-[#90999a] font-medium">
                          Sale:{" "}
                        </span>
                        <span className="text-[#dcdcdc] ml-2 font-semibold">
                          {leadDetails.assignee && leadDetails.assigneeTeam
                            ? `${leadDetails.assignee}_${leadDetails.assigneeTeam}`
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sale Notes */}
                  <div className="mt-6">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex  items-center py-3 border-b border-[#3f4245]">
                          <span className="text-[#90999a] font-medium">
                            Note:{" "}
                          </span>
                          <span className="text-[#dcdcdc] ml-2 font-semibold">
                            {leadDetails.note ? leadDetails.note : ""}
                          </span>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <LogComponent logs={logs} leadId={leadId} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
