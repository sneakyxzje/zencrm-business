import { useEffect, useState } from "react";
import Sidebar from "../../components/common/sidebar/Sidebar";
import { menuByRole } from "../../components/common/sidebar/SidebarItems";
import { LeadService } from "../../api/LeadService";
import type { Lead } from "../../types/lead";
import type { assignableSales } from "../../types/assignableSales";
import { normalize } from "../../utils/normalize";
import { time } from "../../utils/time";

const SaleManager = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [sales, setSales] = useState<assignableSales[]>([]);
  const [filteredSale, setFilteredSale] = useState<assignableSales[]>([]);
  const [team, setTeam] = useState<string>("");
  const [q, setQ] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [saleId, setSaleId] = useState<number | null>(null);

  useEffect(() => {
    LeadService.queue({ page: 0, size: 15 })
      .then((res) => setLeads(res.content))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    LeadService.getAssignableSales({ page: 0, size: 15 })
      .then((res) => {
        setSales(res.content);
        setFilteredSale(res.content);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const nq = normalize(q);
    if (!nq) setFilteredSale(sales);
    else
      setFilteredSale(sales.filter((s) => normalize(s.fullname).includes(nq)));
  }, [q, sales]);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const isValid = setSaleId !== null;

  const handleSubmit = async (
    saleId: number | null,
    leadId: number,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log(saleId, leadId);
    if (saleId === null) return alert("Id sale k duoc null");
    try {
      const res = await LeadService.assignLead({ leadId, saleId });
      return res;
    } catch (err) {
      const error = err as Error;
      console.log("Error ", error);
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

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDetails(true);
  };

  const badge = (s: string) => {
    switch (s) {
      case "NEW":
        return "bg-[#27292b] text-[#e6e6e6] border border-[#3f4245]";
      case "contacted":
        return "bg-[#1f2a2f]/60 text-[#9fd6ff] border border-[#28414a]";
      case "interested":
        return "bg-[#1f2a22]/60 text-[#a3e1b7] border border-[#274133]";
      case "converted":
        return "bg-[#2a2520]/60 text-[#ffd5b3] border border-[#4a3b2f]";
      case "not_interested":
        return "bg-[#2b2224]/60 text-[#f1a9a9] border border-[#4a2b30]";
      default:
        return "bg-[#27292b] text-[#cfd4d5] border border-[#3f4245]";
    }
  };

  return (
    <div className="min-h-screen bg-[#232629] text-[#dcdcdc] font-sans flex">
      <Sidebar sideBarItems={menuByRole.ROLE_SALE} />

      <main className="flex-1 min-w-0 p-6 md:p-8">
        {/* Header */}
        <header className="mb-6 border-b border-[#3f4245] pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-[#e8eaed] mb-1">
                Quản lý Khách hàng
              </h1>
              <p className="text-sm text-[#9aa0a6]">
                Tổng số khách hàng:{" "}
                <span className="font-semibold text-[#dcdcdc]">
                  {leads.length}
                </span>
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="bg-[#2a2c2e] shadow-lg rounded-xl overflow-hidden border border-[#3f4245]">
          {/* Table Header with Search */}
          <div className="p-4 border-b border-[#3f4245]">
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
              className="w-full px-4 py-2 border border-[#3f4245] rounded-md bg-[#27292b] text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] focus:border-[#f48024]"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#3f4245]">
              <thead className="bg-[#26282a]">
                <tr>
                  {[
                    "Khách hàng",
                    "Người lên số",
                    "Team",
                    "Ngày lên số",
                    "Sản phẩm",
                    "Trạng thái",
                  ].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-[#a7b0b1] uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-[#2a2c2e] divide-y divide-[#3f4245]">
                {leads.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 whitespace-nowrap text-center text-[#9aa0a6]"
                    >
                      Chưa có dữ liệu
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="cursor-pointer hover:bg-[#26282a] transition-colors"
                      onClick={() => handleRowClick(lead)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="ml-0">
                          <div className="text-sm font-medium text-[#e8eaed]">
                            {lead.customerName || "Chưa có tên"}
                          </div>
                          <div className="text-sm text-[#9aa0a6]">
                            {lead.phoneNumber}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#dcdcdc]">
                          {lead.createdByName || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#dcdcdc]">
                          {lead.createdByTeam || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9aa0a6]">
                        {time(lead.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#dcdcdc]">
                        {lead.product || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${badge(
                            lead.status
                          )}`}
                        >
                          {getStatusText(lead.status)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {showDetails && selectedLead && (
        <>
          {/* Drawer Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowDetails(false)}
          />

          {/* Details Drawer */}
          <aside className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#2a2d32] border-l border-[#3f4245] shadow-xl z-50 flex flex-col">
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#3f4245] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#e8eaed]">
                Thông tin Khách hàng
              </h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1 rounded-md text-[#9aa0a6] hover:text-white hover:bg-[#3f4245]/40 focus:outline-none"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Drawer Content */}
            <form
              className="p-6 flex-1 overflow-y-auto"
              onSubmit={(e) => {
                handleSubmit(saleId, selectedLead.id, e);
              }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {selectedLead.customerName || "Chưa có tên"}
                </h3>
                <p className="text-[#9aa0a6] text-sm">
                  Lead #{selectedLead.id}
                </p>
                <p className="text-[#dcdcdc] mt-2 font-medium">
                  {selectedLead.phoneNumber}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#323639] rounded-lg p-4 border border-[#3f4245]">
                  <p className="text-xs text-[#9aa0a6] uppercase font-semibold">
                    Trạng thái
                  </p>
                  <p className="font-medium text-[#e8eaed] mt-1">
                    {getStatusText(selectedLead.status)}
                  </p>
                </div>
                <div className="bg-[#323639] rounded-lg p-4 border border-[#3f4245]">
                  <p className="text-xs text-[#9aa0a6] uppercase font-semibold">
                    Người tạo
                  </p>
                  <p className="font-medium text-[#e8eaed] mt-1">
                    {selectedLead.createdByName || "-"}
                  </p>
                </div>
                <div className="bg-[#323639] rounded-lg p-4 border border-[#3f4245]">
                  <p className="text-xs text-[#9aa0a6] uppercase font-semibold">
                    Ngày tạo
                  </p>
                  <p className="font-medium text-[#e8eaed] mt-1">
                    {time(selectedLead.createdAt)}
                  </p>
                </div>
                <div className="bg-[#323639] rounded-lg p-4 border border-[#3f4245]">
                  <p className="text-xs text-[#9aa0a6] uppercase font-semibold">
                    Sản phẩm
                  </p>
                  <p className="font-medium text-[#e8eaed] mt-1">
                    {selectedLead.product || "-"}
                  </p>
                </div>
              </div>

              <div className="border-t border-[#3f4245] pt-6">
                <h4 className="text-sm font-bold text-[#dcdcdc] mb-4 uppercase">
                  Phân công Sale
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {/* Field: Sale (combobox) */}
                  <div className="relative">
                    <label
                      htmlFor="sale-assign"
                      className="block text-sm font-medium text-[#dcdcdc]"
                    >
                      Sale phụ trách
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="sale-assign"
                        className="w-full px-3 py-2 border border-[#3f4245] rounded-md shadow-sm bg-[#27292b] text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] focus:border-[#f48024] sm:text-sm"
                        placeholder="Tìm kiếm sale..."
                        value={q}
                        onFocus={() => setOpen(true)}
                        onChange={(e) => setQ(e.target.value)}
                        role="combobox"
                        aria-expanded={open}
                        aria-controls="sales-suggestions"
                        aria-autocomplete="list"
                      />
                      {open && (
                        <ul
                          id="sales-suggestions"
                          className="absolute z-50 mt-1 w-full bg-[#1c1f22] border border-[#3f4245] rounded-md shadow-xl max-h-56 overflow-auto"
                          role="listbox"
                        >
                          {filteredSale.length > 0 ? (
                            filteredSale.map((sale) => (
                              <li
                                key={sale.id}
                                className="cursor-pointer text-[#dcdcdc] hover:bg-[#25292c] py-2 px-4"
                                role="option"
                                onClick={() => {
                                  setQ(sale.fullname);
                                  setTeam(sale.teamName);
                                  setOpen(false);
                                  setSaleId(sale.id);
                                }}
                              >
                                {sale.fullname}{" "}
                                <span className="text-[#9aa0a6]">
                                  ({sale.teamName})
                                </span>
                              </li>
                            ))
                          ) : (
                            <li className="text-[#9aa0a6] py-2 px-4">
                              {q
                                ? "Không tìm thấy sale"
                                : "Nhập để tìm kiếm sale"}
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="team-auto"
                      className="block text-sm font-medium text-[#dcdcdc]"
                    >
                      Team
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="team-auto"
                        className="w-full px-3 py-2 border border-[#3f4245] rounded-md shadow-sm bg-[#27292b] text-[#9aa0a6] sm:text-sm"
                        value={team}
                        placeholder="Team"
                        disabled
                      />
                    </div>
                  </div>
                  {/* Button Gán */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={!isValid}
                      className="w-full py-3 rounded-lg cursor-pointer text-base font-semibold text-white bg-[#f48024] hover:brightness-110 focus:ring-2 focus:ring-[#f48024] focus:outline-none transition shadow-md"
                    >
                      Gán
                    </button>
                  </div>
                  <div>Log hành động</div>
                </div>
              </div>
            </form>
          </aside>
        </>
      )}
    </div>
  );
};

export default SaleManager;
