import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSaleAssignedLeads } from "@entities/lead/api";
import type { Lead } from "@entities/lead/model/types";
import EmptyState from "@shared/ui/EmptyState";

export default function SalePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    getSaleAssignedLeads({ page: 0, size: 15 })
      .then((res) => setLeads(res.content))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#232629] flex relative overflow-hidden">
      <Sidebar sideBarItems={menuByRole.ROLE_SALE} />

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
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#dcdcdc]">
                  Customer Management
                </h1>
                <p className="text-[#a7b0b1] mt-1 text-sm sm:text-base">
                  Quản lý và theo dõi khách hàng được phân bổ
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#a7b0b1]">
                <span className="inline-flex items-center gap-2 rounded-xl border border-[#3f4245] bg-[#26282a] px-3 py-2">
                  Tổng:{" "}
                  <span className="ml-1 font-semibold text-[#dcdcdc]">
                    {leads.length}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* List */}
        <div className="px-3 mt-10 sm:px-6 pb-6">
          <div className="rounded-3xl border border-[#3f4245] bg-[#2a2c2e]/70 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
            {/* Mobile */}
            <AssignedLeadCards
              leads={leads}
              onSelect={(l) => {
                setSelected(l);
                setOpenDetails(true);
              }}
            />

            {/* Desktop */}
            <AssignedLeadTable
              leads={leads}
              onSelect={(l) => {
                setSelected(l);
                setOpenDetails(true);
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

      {/* Drawer */}
      <AnimatePresence>
        <LeadDetailsDrawer
          open={openDetails}
          lead={selected}
          onClose={() => setOpenDetails(false)}
          onCallClick={(l) => {
            setSelected(l);
          }}
        />
      </AnimatePresence>
    </div>
  );
}

import Sidebar from "@widgets/sidebar/ui/sidebar";
import { menuByRole } from "@widgets/sidebar/model/items";
import AssignedLeadCards from "@pages/Sale/components/AssignedLeadCards";
import AssignedLeadTable from "@pages/Sale/components/AssignedLeadTable";
import LeadDetailsDrawer from "@pages/Sale/components/LeadDetailsDrawer";
