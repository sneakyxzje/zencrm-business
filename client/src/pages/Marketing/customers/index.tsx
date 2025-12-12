import { useState } from "react";

import { useNavigate } from "react-router-dom";
import LeadTable from "@pages/Marketing/leads/LeadTable";
import { Pagination } from "@shared/ui/Pagination";
import Header from "@shared/ui/Header";
import { useLeadsData } from "@features/shared/get-lead/useGetLead";
import { getMarketingLeads } from "@entities/lead/api";
type SortKey = "newest" | "oldest" | "status" | "assigned";
export default function MarketingCustomersPage() {
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const {
    leads,
    totalPages,
    setPage,
    setSearchTerm,
    page,
    searchTerm,
    isLoading,
  } = useLeadsData("marketing", getMarketingLeads);
  if (isLoading)
    return (
      <div className="p-10 text-center text-[#90999a]">Đang tải dữ liệu...</div>
    );
  return (
    <div className="min-h-screen bg-[#232629] flex relative overflow-hidden">
      <div className="flex-1 overflow-hidden relative z-10">
        <Header
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          sortBy={sortBy}
          onSortChange={(v) => setSortBy(v as any)}
          onAddClick={() => {
            window.location.href = "/upload";
          }}
          title="Quản lý khách hàng"
          actionLabel={"Thêm Số Điện Thoại"}
          onSearchClick={() => setSearchOpen(true)}
          searchOpen={searchOpen}
          onSearchOpen={setSearchOpen}
        />
        <div className="p-6">
          <div className=" border border-[#3f4245] bg-[#2a2c2e]/70 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
            <LeadTable
              leads={leads}
              onRowClick={(l) => {
                navigate(`/leads/${l.id}`);
              }}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPagesChange={(newPage) => setPage(newPage)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
