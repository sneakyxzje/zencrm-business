import { useEffect, useState } from "react";
import type { Lead } from "@entities/lead/model/types";
import { getLeadQueue } from "@entities/lead/api";
import { getAssignableSales } from "@entities/user/api";
import type { AssignableSales } from "@entities/user/model/types";
import LeadTable from "@pages/SaleManager/components/LeadTable";
import LeadDetailsDrawer from "@pages/SaleManager/components/LeadDetailsDrawer";
import Header from "@shared/ui/Header";
import { useDebounce } from "@shared/hooks/useDebounce";

export default function SaleManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [sales, setSales] = useState<AssignableSales[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const debounced = useDebounce(searchTerm, 500);
  useEffect(() => {
    getLeadQueue({
      page: 0,
      size: 15,
      sort: "createdAt,desc",
      search: debounced,
    })
      .then((res) => {
        setLeads(res.content);
      })
      .catch(console.error);
  }, [debounced]);
  useEffect(() => {
    getAssignableSales({ page: 0, size: 15 })
      .then((res) => setSales(res.content))
      .catch(console.error);
  }, []);
  return (
    <div className="min-h-screen bg-[#232629] text-[#dcdcdc] font-sans flex">
      <main className="flex-1 min-w-0 p-6 md:p-8">
        <Header
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          searchOpen={searchOpen}
          onSearchOpen={setSearchOpen}
          onSearchClick={() => setSearchOpen(true)}
          title="Quản lý Lead"
        />
        <section className="bg-[#2a2c2e] shadow-lg  overflow-hidden border mt-[50px] border-[#3f4245]">
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
      />
    </div>
  );
}
