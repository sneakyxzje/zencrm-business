import { motion } from "framer-motion";
import { time } from "@shared/lib/time";
import { useParams } from "react-router-dom";
import { LogComponent } from "@shared/ui/logs/log";
import { useLeadDetail } from "@features/shared/detail-lead/model/useLeadDetail";
import { SectionCard } from "@shared/ui/SectionCard";
import { InfoRow } from "@shared/ui/InfoRow";

export default function LeadPage() {
  const { leadId } = useParams();
  const numericId = leadId ? parseInt(leadId) : 0;
  const { lead, logs, page, setPage, totalPages, isLoading, isError } =
    useLeadDetail("marketing", numericId, 10);
  if (isLoading)
    return (
      <div className="p-10 text-center text-[#90999a]">Đang tải dữ liệu...</div>
    );
  if (isError)
    return (
      <div className="p-10 text-center text-red-500">
        Lỗi tải dữ liệu hệ thống.
      </div>
    );
  return (
    <motion.div className="h-full w-full bg-[#1e2023] z-50 overflow-hidden flex">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-[#2a2c2e] border-b border-[#3f4245] px-8 py-5 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-[#dcdcdc]">
                    {lead?.customerName}
                  </h1>
                  <span className="px-3 py-1 bg-[#35383c] text-[#90999a] text-xs font-semibold rounded-md border border-[#3f4245]">
                    Lead #{lead?.id}
                  </span>
                </div>
                <p className="text-sm text-[#90999a]">
                  Tạo lúc {time(lead?.createdAt || "")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#1e2023] p-8">
          <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <SectionCard
                title="Thông tin Lead"
                icon={
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                }
              >
                <p className="text-xs text-[#90999a] font-medium mb-2 uppercase tracking-wider">
                  Khách hàng
                </p>
                <div className="space-y-3 mb-5">
                  <InfoRow
                    icon={
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    }
                    label="Tên khách hàng"
                    value={lead?.customerName}
                  />
                  <InfoRow
                    icon={
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    }
                    label="Số điện thoại"
                    value={lead?.phoneNumber}
                  />
                  <InfoRow
                    icon={
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
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    }
                    label="Địa chỉ"
                    value={lead?.address || "Chưa cập nhật"}
                  />
                </div>

                <p className="text-xs text-[#90999a] font-medium mb-2 uppercase tracking-wider">
                  Marketing
                </p>
                <div className="space-y-3 mb-5">
                  <InfoRow
                    icon={
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
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    }
                    label="Nguồn"
                    value={`${lead?.createdByName} - ${lead?.createdByTeamName}`}
                  />
                  <InfoRow
                    icon={
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
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    }
                    label="Sản phẩm"
                    value={lead?.product?.productName}
                  />
                  <InfoRow
                    icon={
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    }
                    label="Ngày tạo"
                    value={time(lead?.createdAt || "")}
                  />
                </div>

                <p className="text-xs text-[#90999a] font-medium mb-2 uppercase tracking-wider">
                  Sale
                </p>
                <div className="space-y-3">
                  <InfoRow
                    icon={
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    }
                    label="Sale phụ trách"
                    value={
                      lead?.assignee && lead?.assigneeTeam
                        ? `${lead?.assignee} - ${lead?.assigneeTeam}`
                        : "Chưa được gán"
                    }
                  />
                  <InfoRow
                    icon={
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    }
                    label="Ngày gán"
                    value={
                      lead?.assignedAt ? time(lead?.assignedAt) : "Chưa gán"
                    }
                  />
                </div>

                {lead?.note && (
                  <div className="pt-4 border-t border-[#3f4245] mt-4">
                    <p className="text-xs text-[#90999a] font-medium mb-2 uppercase tracking-wider">
                      Ghi chú từ Sale
                    </p>
                    <p className="text-sm text-[#dcdcdc] leading-relaxed bg-[#35383c] p-4 rounded-lg border border-[#3f4245]">
                      {lead?.note}
                    </p>
                  </div>
                )}
              </SectionCard>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-[#2a2c2e] rounded-xl border border-[#3f4245] overflow-hidden h-full flex flex-col"
              >
                <div className="px-5 py-4 border-b border-[#3f4245] bg-[#25272a] flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#dcdcdc]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h2 className="text-base font-semibold text-[#dcdcdc]">
                    Lịch sử hoạt động
                  </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                  <LogComponent
                    logs={logs}
                    leadId={leadId}
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChanges={(p) => setPage(p)}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
