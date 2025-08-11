import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../components/common/sidebar/Sidebar";
import { menuByRole } from "../../components/common/sidebar/SidebarItems";
import { LeadService } from "../../api/Lead";
import type { Lead } from "../../types/lead";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

type CampaignStatus = "active" | "paused" | "completed" | string;

const MarketingCustomer = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [selectedSale, setSelectedSale] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [leads, setLeads] = useState<Lead[]>([]);

  const navigate = useNavigate();

  const [showDetails, setShowDetails] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    LeadService.list({ page: 0, size: 15 })
      .then((res) => {
        setLeads(res.content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const salesTeam = [
    "Nguyễn Văn A",
    "Trần Thị B",
    "Lê Văn C",
    "Phạm Thị D",
    "Hoàng Văn E",
    "Vũ Thị F",
  ];

  const getStatusColor = (status: CampaignStatus) => {
    switch (status) {
      case "NEW":
      case "new":
        return "bg-blue-500/15 text-blue-300 border-blue-500/30";
      case "contacted":
        return "bg-yellow-500/15 text-yellow-300 border-yellow-500/30";
      case "interested":
        return "bg-green-500/15 text-green-300 border-green-500/30";
      case "not_interested":
        return "bg-red-500/15 text-red-300 border-red-500/30";
      case "converted":
        return "bg-purple-500/15 text-purple-300 border-purple-500/30";
      case "unassigned":
        return "bg-gray-500/15 text-gray-300 border-gray-500/30";
      default:
        return "bg-gray-500/15 text-gray-300 border-gray-500/30";
    }
  };

  const getStatusText = (status: CampaignStatus) => {
    switch (status) {
      case "NEW":
      case "new":
        return "Mới";
      case "contacted":
        return "Đã liên hệ";
      case "interested":
        return "Quan tâm";
      case "not_interested":
        return "Không quan tâm";
      case "converted":
        return "Đã chuyển đổi";
      case "unassigned":
        return "Chưa phân bổ";
      default:
        return typeof status === "string" ? status : "Khác";
    }
  };

  const stats = useMemo(() => {
    const total = leads.length;
    const unassigned = leads.filter((l) => !l.assignee?.fullname).length;
    const converted = leads.filter(
      (l) => l.status === ("converted" as Lead["status"])
    ).length;

    const newToday = leads.filter((l) =>
      dayjs(l.createdAt).isSame(dayjs(), "day")
    ).length;
    return { total, unassigned, converted, newToday };
  }, [leads]);

  const handleAddPhone = () => {
    console.log("Adding phone:", newPhone, "to", selectedSale);
    setShowAddModal(false);
    setNewPhone("");
    setSelectedSale("");
  };

  return (
    <div className="min-h-screen bg-[#232629] flex relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar sideBarItems={menuByRole.ROLE_MARKETING} />

      {/* Main content wrapper */}
      <div className="flex-1 overflow-hidden relative z-10">
        {/* Top Hero / Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-6 pt-6"
        >
          <div className="rounded-3xl border border-[#3f4245] bg-[#2a2c2e]/80 backdrop-blur-md p-6 md:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#dcdcdc] flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#f48024] to-[#ff8a00] shadow-[0_10px_30px_rgba(244,128,36,0.35)]">
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  Customer Phone Management
                </h1>
                <p className="text-[#a7b0b1] mt-1">
                  Quản lý danh sách số điện thoại và phân bổ cho sales team
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/upload")}
                className="bg-[#f48024] cursor-pointer hover:bg-[#e06a00] text-white px-4 py-2 rounded-xl font-medium transition-all inline-flex items-center gap-2 shadow-lg"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Thêm Số Điện Thoại
              </motion.button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mt-5">
              <StatCard label="Tổng" value={stats.total} />
              <StatCard label="Chưa phân bổ" value={stats.unassigned} accent />
              <StatCard label="Đã chuyển đổi" value={stats.converted} />
              <StatCard label="Mới hôm nay" value={stats.newToday} />
            </div>

            {/* Toolbar */}
            <div className="mt-6 flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-[#90999a]"
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
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm số điện thoại, sales, nguồn..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#27292b] border border-[#3f4245] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] focus:border-transparent transition"
                />
                <span className="pointer-events-none absolute -inset-[1.5px] rounded-[14px] bg-gradient-to-r from-[#f48024]/0 via-[#f48024]/15 to-[#ff8a00]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#27292b] border border-[#3f4245] rounded-xl px-4 py-3 text-[#dcdcdc] focus:outline-none focus:ring-2 focus:ring-[#f48024]"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="priority">Độ ưu tiên</option>
                <option value="status">Trạng thái</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Table Section */}
        <div className="p-6">
          <div className="rounded-3xl border border-[#3f4245] bg-[#2a2c2e]/70 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#26282a]/80 backdrop-blur sticky top-0 z-10">
                  <tr>
                    {[
                      "Số điện thoại",
                      "Ngày thêm",
                      "Sales phụ trách",
                      "Ngày nhận",
                      "Trạng thái",
                    ].map((h, i) => (
                      <th
                        key={i}
                        className="px-6 py-4 text-left text-[11px] font-semibold tracking-wider text-[#a7b0b1] uppercase"
                      >
                        <div className="inline-flex items-center gap-1.5">
                          {h}
                          <svg
                            className="w-3.5 h-3.5 text-[#6f7678]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M7 10l5-5 5 5H7zm10 4l-5 5-5-5h10z" />
                          </svg>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3f4245]">
                  <AnimatePresence initial={false}>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-16">
                          <EmptyState />
                        </td>
                      </tr>
                    ) : (
                      leads.map((l, idx) => (
                        <motion.tr
                          key={l.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.22, delay: idx * 0.02 }}
                          className="group cursor-pointer hover:bg-[#26282a]/60 transition-colors"
                          onClick={() => {
                            setSelectedLead(l);
                            setShowDetails(true);
                          }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <span className="mr-3 inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#f48024] to-[#ff8a00]" />
                              <div>
                                <div className="text-sm font-medium text-[#dcdcdc]">
                                  {l.phoneNumber ?? "K co sdt"}
                                </div>
                                <div className="text-[11px] text-[#90999a]">
                                  ID: {l.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-[#dcdcdc]">
                              {dayjs(l.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-[#dcdcdc]">
                              {l.assignee?.fullname || (
                                <span className="text-[#90999a] italic">
                                  Chưa phân bổ
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-[#dcdcdc]">
                              <span className="text-[#90999a]">Null</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                l.status
                              )}`}
                            >
                              {getStatusText(l.status)}
                            </span>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Footer / Pagination (UI only) */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#3f4245] text-sm text-[#a7b0b1]">
              <span>
                Hiển thị {Math.min(15, leads.length)} / {leads.length}
              </span>
              <div className="inline-flex items-center gap-2">
                <button className="h-8 px-3 rounded-lg bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234]">
                  Trước
                </button>
                <button className="h-8 px-3 rounded-lg bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234]">
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SlideOver Details (UI only, không đổi logic backend) */}
      <AnimatePresence>
        {showDetails && selectedLead && (
          <motion.aside
            initial={{ x: 360, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 360, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 bg-[#2a2c2e] border-l border-[#3f4245] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="p-6 flex items-center justify-between border-b border-[#3f4245]">
              <div>
                <h3 className="text-lg font-semibold text-[#dcdcdc]">
                  Thông tin Lead
                </h3>
                <p className="text-[#90999a] text-xs">
                  Chi tiết & thao tác nhanh
                </p>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="text-[#90999a] hover:text-[#dcdcdc] p-2 rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
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

            <div className="p-6 space-y-5">
              <div>
                <div className="text-[11px] text-[#90999a]">Số điện thoại</div>
                <div className="text-xl font-semibold text-[#dcdcdc]">
                  {selectedLead.phoneNumber ?? "K co sdt"}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  label="Ngày thêm"
                  value={dayjs(selectedLead.createdAt).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                />
                <InfoItem
                  label="Sales phụ trách"
                  value={selectedLead.assignee?.fullname ?? "Chưa phân bổ"}
                />
                <InfoItem label="Ngày nhận" value="Null" muted />
                <div>
                  <div className="text-[11px] text-[#90999a] mb-1">
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
              </div>

              {/* Quick Actions (UI only) */}
              <div className="pt-2">
                <div className="text-[11px] text-[#90999a] mb-2">
                  Thao tác nhanh
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <button className="h-10 rounded-xl bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234]">
                    Gọi
                  </button>
                  <button className="h-10 rounded-xl bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234]">
                    Giao Sales
                  </button>
                  <button className="h-10 rounded-xl bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234]">
                    Ghi chú
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Add Phone Modal (giữ nguyên logic, nâng UI) */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="bg-[#2a2c2e] border border-[#3f4245] rounded-2xl p-8 max-w-md w-full mx-4 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#dcdcdc]">
                  Thêm Số Điện Thoại
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-[#90999a] hover:text-[#dcdcdc] p-1 rounded-lg transition-colors"
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

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    placeholder="+84 901 234 567"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-[#27292b] border border-[#3f4245] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                    Phân bổ cho Sales (tùy chọn)
                  </label>
                  <select
                    value={selectedSale}
                    onChange={(e) => setSelectedSale(e.target.value)}
                    className="w-full px-4 py-3 bg-[#27292b] border border-[#3f4245] rounded-xl text-[#dcdcdc] focus:outline-none focus:ring-2 focus:ring-[#f48024]"
                  >
                    <option value="">Chưa phân bổ</option>
                    {salesTeam.map((sale) => (
                      <option key={sale} value={sale}>
                        {sale}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-3 bg-[#27292b] text-[#dcdcdc] rounded-xl font-medium hover:bg-[#303234] transition-colors"
                  >
                    Hủy
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddPhone}
                    className="flex-1 px-4 py-3 bg-[#f48024] text-white rounded-xl font-medium hover:bg-[#e06a00] transition-colors shadow-lg"
                  >
                    Thêm
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

export default MarketingCustomer;

// --------- UI sub-components ---------
const StatCard = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) => (
  <div
    className={`rounded-2xl border ${
      accent
        ? "border-[#f48024]/40 bg-[#2a2c2e]"
        : "border-[#3f4245] bg-[#26282a]"
    } p-4 relative overflow-hidden`}
  >
    <div className="text-[11px] text-[#90999a]">{label}</div>
    <div className="text-2xl font-semibold text-[#dcdcdc] mt-1">{value}</div>
    {accent && (
      <div className="absolute -right-5 -bottom-5 h-16 w-16 rounded-full bg-gradient-to-br from-[#f48024] to-[#ff8a00] opacity-20" />
    )}
  </div>
);

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
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.69l1.5 4.49a1 1 0 01-.5 1.21l-2.26 1.13a11.04 11.04 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.49 1.5c.4.13.69.5.69.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
      </svg>
    </motion.div>
    <p className="text-[#dcdcdc] font-medium">Chưa có dữ liệu</p>
    <p className="text-[#90999a] text-sm mt-1">
      Thêm số điện thoại hoặc thử lại sau.
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
