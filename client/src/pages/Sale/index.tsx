import { useState } from "react";
import { getSaleAssignedLeads } from "@entities/lead/api";
import { type LeadStatus, LeadStatusArray } from "@entities/lead/model/types";
import EmptyState from "@shared/ui/EmptyState";
type SortKey = "oldest" | "status" | "assigned";
import AssignedLeadTable from "@pages/Sale/leads/AssignedLeadTable";
import { useNavigate } from "react-router-dom";
import StatusBadge from "@shared/ui/StatusBadge";
import Header from "@shared/ui/Header";
import { useLeadsData } from "@features/shared/get-lead/useGetLead";

export default function SalePage() {
  const [statusFilter, setStatusFilter] = useState<LeadStatus>("ASSIGNED");
  const [sortBy, setSortBy] = useState<SortKey>("assigned");
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const { leads, setSearchTerm, searchTerm, isLoading } = useLeadsData(
    "sale",
    getSaleAssignedLeads
  );
  if (isLoading)
    return (
      <div className="p-10 text-center text-[#90999a]">Đang tải dữ liệu...</div>
    );
  const filteredLeads = leads.filter((l: any) => l.status === statusFilter);

  return (
    <div className="min-h-screen bg-[#232629] flex relative overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <Header
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          sortBy={sortBy}
          onAddClick={() => (window.location.href = "/create-orders")}
          title="Quản lý khách hàng"
          actionLabel={"Tạo Order"}
          onSortChange={(v) => setSortBy(v as any)}
          onSearchClick={() => setSearchOpen(true)}
          searchOpen={searchOpen}
          onSearchOpen={setSearchOpen}
        />
        <div className="px-3 mt-10 sm:px-6 pb-6">
          <div className=" border border-[#3f4245] bg-[#2a2c2e]/70 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
            <div className="flex gap-2 mb-4">
              {LeadStatusArray.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s as LeadStatus)}
                  className={`px-4 py-2 cursor-pointer ${
                    statusFilter === s
                      ? "bg-blue-600 text-white"
                      : "bg-[#2a2c2e]"
                  }`}
                >
                  <StatusBadge status={s} />
                </button>
              ))}
            </div>
            <AssignedLeadTable
              leads={filteredLeads}
              onSelect={(l) => {
                navigate(`/leads/${l.id}`);
              }}
            />

            {leads.length === 0 && (
              <div className="px-6 py-12">
                <EmptyState title="Không có khách hàng nào" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
