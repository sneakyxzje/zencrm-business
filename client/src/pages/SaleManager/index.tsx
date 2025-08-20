import { useEffect, useState } from "react";
import type { Lead } from "@entities/lead/model/types";
import { getLeadQueue } from "@entities/lead/api";
import { getAssignableSales } from "@entities/user/api";
import LeadTable from "./components/LeadTable";
import LeadDetailsDrawer from "./components/LeadDetailsDrawer";
import type { AssignableSales } from "@entities/user/model/types";
import { menuByRole } from "@widgets/sidebar/model/items";
import Sidebar from "@widgets/sidebar/ui/sidebar";

export default function SaleManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [sales, setSales] = useState<AssignableSales[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    getLeadQueue({ page: 0, size: 15 })
      .then((res) => setLeads(res.content))
      .catch(console.error);
  }, []);
  useEffect(() => {
    getAssignableSales({ page: 0, size: 15 })
      .then((res) => setSales(res.content))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#232629] text-[#dcdcdc] font-sans flex">
      <Sidebar sideBarItems={menuByRole.ROLE_SALE} />
      <main className="flex-1 min-w-0 p-6 md:p-8">
        <header className="mb-6 border-b border-[#3f4245] pb-4">
          <h1 className="text-2xl font-semibold text-[#e8eaed] mb-1">
            Quản lý Khách hàng
          </h1>
          <p className="text-sm text-[#9aa0a6]">
            Tổng số khách hàng:{" "}
            <span className="font-semibold text-[#dcdcdc]">{leads.length}</span>
          </p>
        </header>

        <section className="bg-[#2a2c2e] shadow-lg rounded-xl overflow-hidden border border-[#3f4245]">
          <div className="p-4 border-b border-[#3f4245]">
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
              className="w-full px-4 py-2 border border-[#3f4245] rounded-md bg-[#27292b] text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] focus:border-[#f48024]"
            />
          </div>
          <LeadTable
            leads={leads}
            onRowClick={(l) => {
              setSelectedLead(l);
              setShowDetails(true);
            }}
          />
        </section>
      </main>

      <LeadDetailsDrawer
        open={showDetails}
        lead={selectedLead}
        sales={sales}
        onClose={() => setShowDetails(false)}
        onAssigned={() => {
          /* optional: refresh queue */
        }}
      />
    </div>
  );
}
