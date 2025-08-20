import { useAuth } from "@processes/auth/models/useAuth";
import LeadUploadForm from "@features/lead-upload/ui/LeadUploadForm";
import Sidebar from "@widgets/sidebar/ui/sidebar";
import { menuByRole } from "@widgets/sidebar/model/items";

export default function MarketingUploadPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#232629] flex">
      <Sidebar sideBarItems={menuByRole.ROLE_MARKETING} />
      <main className="flex-1 p-6">
        <LeadUploadForm
          currentUserName={user?.username ?? ""}
          currentTeamName={user?.teamName ?? ""}
        />
      </main>
    </div>
  );
}
