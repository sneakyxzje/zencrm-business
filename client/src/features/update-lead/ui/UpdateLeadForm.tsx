import { useToast } from "@app/provider/ToastContext";
import { useUpdateLead } from "@features/update-lead/model/useUpdateLead";
import { useState } from "react";
import type { LeadStatus } from "@entities/lead/model/types";
import { LeadActionButtons } from "@shared/ui/LeadAction";

type Props = { leadId: number; status: LeadStatus };

export default function UpdateLeadForm({ leadId, status }: Props) {
  const [note, setNote] = useState<string>("");
  const { submit } = useUpdateLead();
  const { addToast } = useToast();

  const handleAction = async (newStatus: string) => {
    try {
      const ok = await submit({
        leadId,
        note,
        status: newStatus as LeadStatus,
      });

      if (ok) {
        addToast({
          type: "success",
          title: "Successful",
          message: "Update Successfully",
          persistent: false,
          duration: 4000,
        });
      }
    } catch (err) {
      console.error("Error", err);
    }
  };
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-[#dcdcdc] font-medium flex items-center text-sm">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
          Notes
        </label>
        <textarea
          name="notes"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Thêm ghi chú..."
          className="resize-none w-full h-[100px] bg-[#1e2023] border border-[#3f4245] rounded-lg px-3 py-2 text-[#dcdcdc] text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[#dcdcdc] text-sm font-medium">Status</label>
        <div className="text-[#9ea2a8] text-sm px-2 py-2 bg-[#25272a] rounded-lg border border-[#3f4245]">
          {status}
        </div>
      </div>

      <LeadActionButtons status={status} onAction={handleAction} />
    </div>
  );
}
