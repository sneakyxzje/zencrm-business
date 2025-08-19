import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../components/common/sidebar/Sidebar";
import { menuByRole } from "../../components/common/sidebar/SidebarItems";
import { LeadService } from "../../api/LeadService";
import type { Lead } from "../../types/lead";
import { formatDate, time } from "../../utils/time";

const SaleView = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [filterStatus, setFilterStatus] = useState("all");
  // const [filterPriority, setFilterPriority] = useState("all");
  // const [sortBy, setSortBy] = useState("newest");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [callNotes, setCallNotes] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    LeadService.listLeadAssign({ page: 0, size: 15 })
      .then((res) => {
        setLeads(res.content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-500/15 text-blue-300 border-blue-500/30";
      case "contacted":
        return "bg-yellow-500/15 text-yellow-300 border-yellow-500/30";
      case "interested":
        return "bg-green-500/15 text-green-300 border-green-500/30";
      case "not_interested":
        return "bg-red-500/15 text-red-300 border-red-500/30";
      case "converted":
        return "bg-purple-500/15 text-purple-300 border-purple-500/30";
      default:
        return "bg-gray-500/15 text-gray-300 border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "NEW":
        return "Mới";
      case "contacted":
        return "Đã liên hệ";
      case "interested":
        return "Quan tâm";
      case "not_interested":
        return "Không quan tâm";
      case "converted":
        return "Đã chuyển đổi";
      default:
        return "Khác";
    }
  };

  // const getPriorityColor = (priority: string) => {
  //   switch (priority) {
  //     case "high":
  //       return "bg-red-500/15 text-red-300 border-red-500/30";
  //     case "medium":
  //       return "bg-yellow-500/15 text-yellow-300 border-yellow-500/30";
  //     case "low":
  //       return "bg-green-500/15 text-green-300 border-green-500/30";
  //     default:
  //       return "bg-gray-500/15 text-gray-300 border-gray-500/30";
  //   }
  // };

  // const getPriorityText = (priority: string) => {
  //   switch (priority) {
  //     case "high":
  //       return "Cao";
  //     case "medium":
  //       return "Trung bình";
  //     case "low":
  //       return "Thấp";
  //     default:
  //       return "Khác";
  //   }
  // };

  // const filteredLeads = useMemo(() => {
  //   let filtered = leads;

  //   if (searchTerm) {
  //     filtered = filtered.filter(
  //       (lead) =>
  //         lead.phoneNumber.includes(searchTerm) ||
  //         // lead.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         // lead.source?.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }

  //   if (filterStatus !== "all") {
  //     filtered = filtered.filter((lead) => lead.status === filterStatus);
  //   }

  //   if (filterPriority !== "all") {
  //     filtered = filtered.filter((lead) => lead.priority === filterPriority);
  //   }

  //   // Sort
  //   const sorted = [...filtered].sort((a, b) => {
  //     switch (sortBy) {
  //       case "newest":
  //         return (
  //           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //         );
  //       case "oldest":
  //         return (
  //           new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //         );
  //       case "priority": {
  //         const priorityOrder: Record<Lead["priority"], number> = {
  //           high: 3,
  //           medium: 2,
  //           low: 1,
  //         };
  //         return priorityOrder[b.priority] - priorityOrder[a.priority];
  //       }
  //       default:
  //         return 0;
  //     }
  //   });
  //   return sorted;

  //   return filtered;
  // }, [leads, searchTerm, filterStatus, filterPriority, sortBy]);

  // const stats = useMemo(() => {
  //   const total = leads.length;
  //   const newLeads = leads.filter((l) => l.status === "new").length;
  //   const interested = leads.filter((l) => l.status === "interested").length;
  //   const contacted = leads.filter((l) => l.status === "contacted").length;
  //   const converted = leads.filter((l) => l.status === "converted").length;
  //   const highPriority = leads.filter((l) => l.priority === "high").length;

  //   return { total, newLeads, interested, contacted, converted, highPriority };
  // }, [leads]);

  const handleCall = (lead: Lead) => {
    setSelectedLead(lead);
    setShowCallModal(true);
  };

  // const handleUpdateStatus = (leadId: string, newStatus: string) => {
  //   setLeads((prev) =>
  //     prev.map((lead) =>
  //       lead.id === leadId
  //         ? {
  //             ...lead,
  //             status: newStatus as Lead["status"],
  //             lastContact: new Date().toISOString(),
  //           }
  //         : lead
  //     )
  //   );
  // };

  return (
    <div className="min-h-screen bg-[#232629] flex relative overflow-hidden">
      {/* Sidebar placeholder */}
      <Sidebar sideBarItems={menuByRole.ROLE_SALE} />

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-3 sm:px-6 pt-4 sm:pt-6"
        >
          <div className="rounded-3xl border border-[#3f4245] bg-[#2a2c2e]/80 backdrop-blur-md p-5 sm:p-6 md:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#dcdcdc] flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#f48024] to-[#ff8a00] shadow-[0_10px_30px_rgba(244,128,36,0.35)]">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </span>
                  <span className="truncate">Customer Management</span>
                </h1>
                <p className="text-[#a7b0b1] mt-1 text-sm sm:text-base truncate">
                  Quản lý và theo dõi khách hàng được phân bổ
                </p>
              </div>

              {/* Quick meta: tổng số */}
              <div className="flex items-center gap-2 text-sm text-[#a7b0b1]">
                <span className="inline-flex items-center gap-2 rounded-xl border border-[#3f4245] bg-[#26282a] px-3 py-2">
                  <svg
                    className="w-4 h-4 text-[#f48024]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                  </svg>
                  Tổng:
                  <span className="ml-1 font-semibold text-[#dcdcdc]">
                    {leads.length}
                  </span>
                </span>
              </div>
            </div>

            {/* Filters & Search */}
            {/* (giữ nguyên comment cũ) */}
            {/* <div className="mt-6 flex flex-col lg:flex-row gap-3"> ... </div> */}
          </div>
        </motion.div>

        {/* Table + Mobile Cards */}
        <div className="px-3 mt-10 sm:px-6 pb-6">
          <div className="rounded-3xl border border-[#3f4245] bg-[#2a2c2e]/70 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
            {/* MOBILE: Card list */}
            <div className="md:hidden divide-y divide-[#3f4245]">
              {leads.length === 0 ? (
                <div className="px-4 py-12">
                  <EmptyState />
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {leads.map((lead, idx) => (
                    <motion.button
                      key={lead.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, delay: idx * 0.02 }}
                      onClick={() => {
                        setSelectedLead(lead);
                        setShowDetails(true);
                      }}
                      className="w-full text-left px-4 py-4 active:bg-[#26282a] focus:bg-[#26282a] transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#f48024] to-[#ff8a00] text-white flex items-center justify-center text-sm font-bold shrink-0">
                          {lead.customerName
                            ? lead.customerName.charAt(0).toUpperCase()
                            : lead.phoneNumber.slice(-2)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="text-[#dcdcdc] font-medium truncate">
                              {lead.customerName || "Chưa có tên"}
                            </div>
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${getStatusColor(
                                lead.status
                              )}`}
                            >
                              {getStatusText(lead.status)}
                            </span>
                          </div>
                          <div className="mt-1 text-[#90999a] text-sm truncate">
                            {lead.phoneNumber}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#a7b0b1]">
                            <span className="inline-flex items-center gap-1">
                              <svg
                                className="w-3.5 h-3.5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" />
                              </svg>
                              {lead.address || "Không có"}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <svg
                                className="w-3.5 h-3.5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm8-2h-3.17A3.001 3.001 0 0014 4h-4a3 3 0 00-2.83 2H4a2 2 0 00-2 2v10a2 2 0 002 2h5v-2H4V8h3.17A3.001 3.001 0 0010 10h4a3 3 0 002.83-2H20v12h-5v2h5a2 2 0 002-2V8a2 2 0 00-2-2z" />
                              </svg>
                              {lead.createdByName + "_" + lead.createdByTeam}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-3 text-[12px] text-[#a7b0b1]">
                            <span>
                              Ngày tạo:{" "}
                              <span className="text-[#dcdcdc]">
                                {time(lead.createdAt)}
                              </span>
                            </span>
                            <span>
                              Nhận:{" "}
                              <span className="text-[#dcdcdc]">
                                {time(lead.assignedAt)
                                  ? time(lead.assignedAt)
                                  : "Không rõ"}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* DESKTOP: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#26282a]/80 backdrop-blur sticky top-0 z-10">
                  <tr>
                    {[
                      "Tên khách hàng",
                      "Số điện thoại",
                      "Địa chỉ",
                      "Người lên số",
                      "Trạng thái",
                      "Ngày tạo",
                      "Ngày nhận",
                    ].map((header, i) => (
                      <th
                        key={i}
                        className="px-6 py-3.5 text-left text-[11px] font-semibold tracking-wider text-[#a7b0b1] uppercase"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3f4245]">
                  <AnimatePresence initial={false}>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-16">
                          <EmptyState />
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead, idx) => (
                        <motion.tr
                          key={lead.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.22, delay: idx * 0.02 }}
                          className="group cursor-pointer hover:bg-[#26282a]/60 transition-colors"
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowDetails(true);
                          }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-[#dcdcdc] truncate max-w-[220px]">
                                  {lead.customerName || "Chưa có tên"}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-gray-500/15 text-gray-300 border-gray-500/30">
                              {lead.phoneNumber}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-gray-500/15 text-gray-300 border-gray-500/30 max-w-[260px] truncate">
                              {lead.address ? lead.address : "Không có"}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="text-sm text-[#dcdcdc]">
                              {lead.createdByName + "_" + lead.createdByTeam}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                lead.status
                              )}`}
                            >
                              {getStatusText(lead.status)}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="text-sm text-[#dcdcdc]">
                              {time(lead.createdAt)}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="text-sm text-[#dcdcdc]">
                              {time(lead.assignedAt)
                                ? time(lead.assignedAt)
                                : "Không rõ"}
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-t border-[#3f4245] text-sm text-[#a7b0b1]">
              <span className="hidden sm:inline">
                {/* Hiển thị {Math.min(15, filteredLeads.length)} /{" "}
                {filteredLeads.length} */}
              </span>
              <div className="ml-auto inline-flex items-center gap-2">
                <button className="h-9 px-3 rounded-lg bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234] transition-colors">
                  Trước
                </button>
                <button className="h-9 px-3 rounded-lg bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234] transition-colors">
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Sidebar */}
      <AnimatePresence>
        {showDetails && selectedLead && (
          <motion.aside
            initial={{ x: 360, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 360, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed right-0 top-0 bottom-0 w-full md:max-w-md z-50 bg-[#2a2c2e] border-l border-[#3f4245] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="p-4 sm:p-6 border-b border-[#3f4245]">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-[#dcdcdc] truncate">
                    Thông tin khách hàng
                  </h3>
                  <p className="text-[#90999a] text-xs">Chi tiết và thao tác</p>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-[#90999a] hover:text-[#dcdcdc] p-2 rounded-lg transition-colors"
                  aria-label="Đóng chi tiết"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
              {/* Customer Info */}
              <div className="text-center">
                <div className="h-14 w-14 sm:h-16 sm:w-16 mx-auto rounded-full bg-gradient-to-br from-[#f48024] to-[#ff8a00] flex items-center justify-center text-white font-bold text-lg sm:text-xl mb-3">
                  {selectedLead.customerName
                    ? selectedLead.customerName.charAt(0).toUpperCase()
                    : selectedLead.phoneNumber.slice(-2)}
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-[#dcdcdc]">
                  {selectedLead.customerName || "Chưa có tên"}
                </h4>
                <p className="text-[#90999a]">{selectedLead.phoneNumber}</p>
              </div>

              {/* Status & Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-[11px] text-[#90999a] mb-2">
                    Trạng thái
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      selectedLead.status
                    )}`}
                  >
                    {getStatusText(selectedLead.status)}
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-[11px] text-[#90999a] mb-2">Ưu tiên</div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border`}
                  >
                    {/* {getPriorityText(selectedLead.priority)} */}
                    Không rõ
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <InfoItem label="Nguồn" value={"Chưa rõ"} />
                <InfoItem
                  label="Ngày tạo"
                  value={formatDate(selectedLead.createdAt)}
                />
                <InfoItem
                  label="Ngày nhận"
                  value={
                    selectedLead.assignedAt
                      ? formatDate(selectedLead.assignedAt)
                      : "Chưa rõ"
                  }
                />
                <InfoItem
                  label="Lần liên hệ cuối"
                  value={"Test"}
                  // muted={!selectedLead.lastContact}
                />
              </div>

              {/* Notes */}
              {selectedLead.note && (
                <div>
                  <div className="text-[11px] text-[#90999a] mb-2">Ghi chú</div>
                  <div className="bg-[#27292b] border border-[#3f4245] rounded-xl p-3 text-sm text-[#dcdcdc]">
                    {/* {selectedLead.notes} */}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="space-y-3 pb-4">
                <div className="text-[11px] text-[#90999a] mb-2">
                  Thao tác nhanh
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCall(selectedLead)}
                    className="h-10 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2"
                  >
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
                    Gọi
                  </motion.button>
                  <button className="h-10 rounded-xl bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234] transition-colors">
                    Email
                  </button>
                </div>
                <button className="w-full h-10 rounded-xl bg-[#f48024] hover:bg-[#e06a00] text-white transition-colors font-medium">
                  Cập nhật trạng thái
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Call Modal */}
      <AnimatePresence>
        {showCallModal && selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="w-full sm:max-w-md sm:mx-4 bg-[#2a2c2e] border border-[#3f4245] rounded-t-2xl sm:rounded-2xl p-5 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            >
              <div className="text-center mb-6">
                <div className="h-14 w-14 sm:h-16 sm:w-16 mx-auto rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 mb-4">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8"
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
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#dcdcdc] mb-2">
                  Gọi điện cho khách hàng
                </h3>
                <p className="text-[#90999a]">{selectedLead.phoneNumber}</p>
                <p className="text-[#dcdcdc] font-medium">
                  {selectedLead.customerName || "Khách hàng"}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                    Ghi chú cuộc gọi
                  </label>
                  <textarea
                    value={callNotes}
                    onChange={(e) => setCallNotes(e.target.value)}
                    placeholder="Nhập ghi chú về cuộc gọi..."
                    rows={4}
                    className="w-full px-4 py-3 bg-[#27292b] border border-[#3f4245] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] focus:border-transparent transition resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setShowCallModal(false);
                      setCallNotes("");
                    }}
                    className="flex-1 px-4 py-3 bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] rounded-xl font-medium hover:bg-[#303234] transition-colors"
                  >
                    Hủy
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      // Handle call completion
                      console.log("Call completed with notes:", callNotes);
                      setShowCallModal(false);
                      setCallNotes("");
                      // Update lead status if needed
                      // handleUpdateStatus(selectedLead.id, "contacted");
                    }}
                    className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors shadow-lg"
                  >
                    Hoàn thành
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Sub-components
// const StatCard = ({
//   label,
//   value,
//   accent,
// }: {
//   label: string;
//   value: number;
//   accent?: boolean;
// }) => (
//   <div
//     className={`rounded-2xl border ${
//       accent
//         ? "border-[#f48024]/40 bg-[#2a2c2e]"
//         : "border-[#3f4245] bg-[#26282a]"
//     } p-4 relative overflow-hidden`}
//   >
//     <div className="text-[11px] text-[#90999a]">{label}</div>
//     <div className="text-2xl font-semibold text-[#dcdcdc] mt-1">{value}</div>
//     {accent && (
//       <div className="absolute -right-5 -bottom-5 h-16 w-16 rounded-full bg-gradient-to-br from-[#f48024] to-[#ff8a00] opacity-20" />
//     )}
//   </div>
// );

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center text-center">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-16 w-16 rounded-2xl bg-[#27292b] flex items-center justify-center mb-3 border border-[#3f4245]"
    >
      <svg
        className="w-8 h-8 text-[#90999a]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </motion.div>
    <p className="text-[#dcdcdc] font-medium">Không có khách hàng nào</p>
    <p className="text-[#90999a] text-sm mt-1">
      Thử thay đổi bộ lọc hoặc tìm kiếm khác.
    </p>
  </div>
);

const InfoItem = ({
  label,
  value,
  muted,
}: {
  label: string;
  value: string | number;
  muted?: boolean;
}) => (
  <div>
    <div className="text-[11px] text-[#90999a] mb-1">{label}</div>
    <div className={`text-sm ${muted ? "text-[#90999a]" : "text-[#dcdcdc]"}`}>
      {value}
    </div>
  </div>
);

export default SaleView;
