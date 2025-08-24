// src/pages/marketing/customers/index.tsx
import { useEffect, useMemo, useState } from "react";
import { getMarketingLeads } from "@entities/lead/api";
import { type Lead } from "@entities/lead/model/types";
import dayjs from "dayjs";

import EmptyState from "@shared/ui/EmptyState";
import Sidebar from "@widgets/sidebar/ui/sidebar";
import { menuByRole } from "@widgets/sidebar/model/items";
// import CustomerDetailsPage from "@pages/Marketing/customers/components/CustomerDetailsPage";
import Header from "@pages/Marketing/customers/components/header";
import { useNavigate } from "react-router-dom";
import LeadTable from "@pages/Marketing/leads/LeadTable";
type SortKey = "newest" | "oldest" | "status" | "assigned";
export default function MarketingCustomersPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getMarketingLeads({ page: 0, size: 15 })
      .then((res) => setLeads(res.content))
      .catch(console.error);
  }, []);

  const stats = useMemo(() => {
    const total = leads.length;
    const unassigned = leads.filter((l) => !l.assigneeName).length;
    const converted = leads.filter((l) => l.status === "converted").length;
    const newToday = leads.filter((l) =>
      dayjs(l.createdAt).isSame(dayjs(), "day")
    ).length;
    return { total, unassigned, converted, newToday };
  }, [leads]);

  const filteredSortedLeads = useMemo(() => {
    let data = leads;

    const q = searchTerm.trim().toLowerCase();
    if (q) {
      data = data.filter((l) => {
        const hay = [
          l.phoneNumber,
          l.customerName ?? "",
          l.assigneeName ?? "",
          l.assigneeTeam ?? "",
          l.createdByName ?? "",
          l.createdByTeam ?? "",
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }

    const priorityStatus: Record<string, number> = {
      converted: 5,
      interested: 4,
      contacted: 3,
      NEW: 2,
      not_interested: 1,
    };

    data = [...data].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
        case "oldest":
          return dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf();
        case "status":
          return (
            (priorityStatus[b.status] ?? 0) - (priorityStatus[a.status] ?? 0)
          );
        case "assigned": {
          const asn = (x: Lead) => (x.assigneeName ? 1 : 0);
          return asn(b) - asn(a);
        }
        default:
          return 0;
      }
    });

    return data;
  }, [leads, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-[#232629] flex relative overflow-hidden">
      <Sidebar sideBarItems={menuByRole.ROLE_MARKETING} />

      <div className="flex-1 overflow-hidden relative z-10">
        <Header
          stats={stats}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          sortBy={sortBy}
          onSortChange={(v) => setSortBy(v as any)}
          onAddClick={() => {
            window.location.href = "/upload";
          }}
          onSearchClick={() => setSearchOpen(true)}
          searchOpen={searchOpen}
          onSearchOpen={setSearchOpen}
        />

        {/* Table Section */}
        <div className="p-6">
          <div className="rounded-3xl border border-[#3f4245] bg-[#2a2c2e]/70 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
            {filteredSortedLeads.length === 0 ? (
              <div className="px-6 py-16">
                <EmptyState
                  title="Chưa có dữ liệu"
                  hint="Thêm số điện thoại hoặc thử lại sau."
                />
              </div>
            ) : (
              <LeadTable
                leads={filteredSortedLeads}
                onRowClick={(l) => {
                  navigate(`/leads/${l.id}`);
                }}
              />
            )}

            <div className="flex items-center justify-between px-6 py-4 border-t border-[#3f4245] text-sm text-[#a7b0b1]">
              <span>
                Hiển thị {Math.min(15, filteredSortedLeads.length)} /{" "}
                {filteredSortedLeads.length}
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

      {/* <CustomerDetailsPage lead={selected} /> */}
    </div>
  );
}
