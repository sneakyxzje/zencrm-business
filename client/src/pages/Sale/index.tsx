import { useEffect, useState } from "react";
import { getSaleAssignedLeads } from "@entities/lead/api";
import type { Lead } from "@entities/lead/model/types";
import EmptyState from "@shared/ui/EmptyState";

export default function SalePage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    getSaleAssignedLeads({ page: 0, size: 15 })
      .then((res) => setLeads(res.content))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#232629] flex relative overflow-hidden">
      <Sidebar sideBarItems={menuByRole.ROLE_SALE} />

      <div className="flex-1 overflow-hidden">
        <Header />

        {/* List */}
        <div className="px-3 mt-10 sm:px-6 pb-6">
          <div className="rounded-3xl border border-[#3f4245] bg-[#2a2c2e]/70 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
            {/* Desktop */}
            <AssignedLeadTable
              leads={leads}
              onSelect={(l) => {
                navigate(`/leads/${l.id}`);
              }}
            />

            {/* Pagination placeholder */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-t border-[#3f4245] text-sm text-[#a7b0b1]">
              <div className="ml-auto inline-flex items-center gap-2">
                <button className="h-9 px-3 rounded-lg bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234] transition-colors">
                  Trước
                </button>
                <button className="h-9 px-3 rounded-lg bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234] transition-colors">
                  Sau
                </button>
              </div>
            </div>

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

import Sidebar from "@widgets/sidebar/ui/sidebar";
import { menuByRole } from "@widgets/sidebar/model/items";
import AssignedLeadTable from "@pages/Sale/leads/AssignedLeadTable";
import { useNavigate } from "react-router-dom";
import Header from "@pages/Sale/components/header";
