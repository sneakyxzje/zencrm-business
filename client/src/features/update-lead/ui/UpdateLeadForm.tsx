import { useToast } from "@app/provider/ToastContext";
import { useUpdateLead } from "@features/update-lead/model/useUpdateLead";
import { useState } from "react";
import { motion } from "framer-motion";
import type { LeadStatus } from "@entities/lead/model/types";

type Props = { leadId: number };

export default function UpdateLeadForm({ leadId }: Props) {
  const [note, setNote] = useState<string>("");
  const [status, setStatus] = useState<string>("CALLED");
  const { submit } = useUpdateLead();
  const { addToast } = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const ok = await submit({ leadId, note, status });
      if (ok) {
        addToast({
          type: "success",
          title: "Successful",
          message: "Update Successfully",
          persistent: false,
          duration: 4000,
        });
      } else {
        addToast({
          type: "error",
          title: "Error",
          message: "Update failed",
          persistent: false,
          duration: 4000,
        });
      }
    } catch (err) {
      console.error("Error", err);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Notes Section */}
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
          placeholder="Add your notes..."
          className="resize-none w-full h-[100px] bg-[#1e2023] border border-[#3f4245] rounded-lg px-3 py-2 text-[#dcdcdc] text-sm placeholder-[#90999a] focus:outline-none focus:border-[#4a9eff] focus:ring-2 focus:ring-[#4a9eff]/20 transition-all duration-200 hover:border-[#525558]"
        />
      </div>

      {/* Customer Status */}
      <div className="space-y-2">
        <label className="text-[#dcdcdc] font-medium flex items-center text-sm">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as LeadStatus)}
          className="w-full bg-[#1e2023] border border-[#3f4245] rounded-lg px-3 py-2 text-[#dcdcdc] text-sm focus:outline-none focus:border-[#4a9eff] focus:ring-2 focus:ring-[#4a9eff]/20 transition-all duration-200 hover:border-[#525558]"
        >
          <option value="CALLED">Called</option>
          <option value="IN_PROGRESS">Success</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="flex-1 bg-gradient-to-r from-[#4a9eff] to-[#0066cc] text-white font-semibold py-2.5 px-4 rounded-lg hover:from-[#3d8bfd] hover:to-[#0056b3] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
        >
          <>
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Update
          </>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className="px-4 py-2.5 bg-[#3f4245] text-[#dcdcdc] font-semibold rounded-lg hover:bg-[#4a5055] transition-all duration-200 flex items-center text-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          Reset
        </motion.button>
      </div>
    </form>
  );
}
