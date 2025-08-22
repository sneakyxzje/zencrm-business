import { useToast } from "@app/provider/ToastContext";
import { useUpdateLead } from "@features/update-lead/model/useUpdateLead";
import { useState } from "react";

type Props = { leadId: number };

export default function UpdateLeadForm({ leadId }: Props) {
  const [note, setNote] = useState<string>("");
  const { submit, error, loading } = useUpdateLead();
  const { addToast } = useToast();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ok = await submit({ leadId, note });
    if (ok) {
      addToast({
        type: "success",
        title: "Successful",
        message: "Update Successfully",
        persistent: false,
        duration: 4000,
      });

    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="bg-[#2a2c2e] rounded-lg p-4 border border-[#3f4245]">
        <h4 className="text-sm font-medium text-[#90999a] mb-3 uppercase tracking-wide">
          Cập nhật Lead
        </h4>
        <div className="flex flex-col">
          <span className="text-sm text-[#90999a]">Note:</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={loading}
            className="bg-[#27292b] border mt-2 focus:outline-none border-[#3f4245] text-white rounded-lg px-4 py-2 w-full resize-none text-left"
          />
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 mt-5 cursor-pointer bg-[#f48024] hover:bg-[#e06a00] text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? "Đang cập nhật..." : "Update Lead"}
      </button>
    </form>
  );
}
