import { useEffect, useState } from "react";
import Sidebar from "../../components/common/sidebar/Sidebar";
import { menuByRole } from "../../components/common/sidebar/SidebarItems";
import { LeadService } from "../../api/Lead";
import type { Lead } from "../../types/lead";
import dayjs from "dayjs";
type CampaignStatus = "active" | "paused" | "completed" | string;
// type priorityColor = "high" | "medium" | "low" | string;
const MarketingCustomer = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  // const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [selectedSale, setSelectedSale] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [leads, setLeads] = useState<Lead[]>([]);

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
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "contacted":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "interested":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "not_interested":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "converted":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "unassigned":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusText = (status: CampaignStatus) => {
    switch (status) {
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
        return status;
    }
  };

  // const getPriorityColor = (priority: priorityColor) => {
  //   switch (priority) {
  //     case "high":
  //       return "text-red-400";
  //     case "medium":
  //       return "text-yellow-400";
  //     case "low":
  //       return "text-green-400";
  //     default:
  //       return "text-gray-400";
  //   }
  // };

  // const filteredNumbers = phoneNumbers.filter((phone) => {
  //   const matchesSearch =
  //     phone.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     phone.assignedSale?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     phone.source.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesStatus =
  //     selectedStatus === "all" || phone.status === selectedStatus;
  //   return matchesSearch && matchesStatus;
  // });

  const handleAddPhone = () => {
    // Logic to add new phone number
    console.log("Adding phone:", newPhone, "to", selectedSale);
    setShowAddModal(false);
    setNewPhone("");
    setSelectedSale("");
  };

  return (
    <div className="min-h-screen bg-[#232629] flex">
      {/* Simplified Sidebar */}
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Customer Phone Management
              </h1>
              <p className="text-[#90999a] mt-1">
                Quản lý danh sách số điện thoại và phân bổ cho sales team
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#f48024] hover:bg-[#e06a00] text-white px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105 flex items-center"
              >
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
                Thêm Số Điện Thoại
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Stats */}
        <div className="p-6 border-b border-[#4d4d4d] bg-[#3b3f41]/20">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            {/* {Object.entries(statusCounts).map(([status, count]) => (
              <div
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`cursor-pointer p-4 rounded-xl border transition-all ${
                  selectedStatus === status
                    ? "bg-[#f48024]/20 border-[#f48024]/30 text-[#f48024]"
                    : "bg-[#2d2d2d]/50 border-[#4d4d4d] text-[#dcdcdc] hover:border-[#f48024]/20"
                }`}
              >
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-xs capitalize">
                  {status === "all" ? "Tất cả" : getStatusText(status)}
                </div>
              </div>
            ))} */}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
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
                  className="w-full pl-10 pr-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] transition"
                />
              </div>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl px-4 py-3 text-[#dcdcdc] focus:outline-none focus:ring-2 focus:ring-[#f48024]"
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="priority">Độ ưu tiên</option>
              <option value="status">Trạng thái</option>
            </select>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Phone Numbers Table */}
          <div className="bg-[#3b3f41]/60 backdrop-blur-sm border border-[#4d4d4d] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#2d2d2d]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#90999a] uppercase tracking-wider">
                      Số điện thoại
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#90999a] uppercase tracking-wider">
                      Ngày thêm
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#90999a] uppercase tracking-wider">
                      Sales phụ trách
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#90999a] uppercase tracking-wider">
                      Ngày nhận
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#90999a] uppercase tracking-wider">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4d4d4d]">
                  {leads.map((l) => (
                    <tr
                      key={l.id}
                      className="hover:bg-[#2d2d2d]/50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-3  text-red-400"></div>
                          <div>
                            <div className="text-sm font-medium text-[#dcdcdc]">
                              {l.phoneNumber ?? "K co sdt"}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Phone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#3b3f41] border border-[#4d4d4d] rounded-2xl p-8 max-w-md w-full mx-4">
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
                  className="w-full px-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                  Phân bổ cho Sales (tùy chọn)
                </label>
                <select
                  value={selectedSale}
                  onChange={(e) => setSelectedSale(e.target.value)}
                  className="w-full px-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] focus:outline-none focus:ring-2 focus:ring-[#f48024] transition"
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
                  className="flex-1 px-4 py-3 bg-[#2d2d2d] text-[#dcdcdc] rounded-xl font-medium hover:bg-[#4d4d4d] transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddPhone}
                  className="flex-1 px-4 py-3 bg-[#f48024] text-white rounded-xl font-medium hover:bg-[#e06a00] transition-colors"
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingCustomer;
