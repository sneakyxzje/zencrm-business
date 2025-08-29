import { getleadDetails } from "@entities/lead/api";
import type { LeadDetails } from "@entities/lead/model/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InfoBlock = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string | undefined | null;
  className?: string;
}) => (
  <div className={className}>
    <p className="text-sm text-gray-400 mb-1 capitalize">{label}</p>
    <p className="text-lg text-white font-semibold bg-gray-700/50 px-4 py-2 rounded-lg min-h-[44px]">
      {value || <span className="text-gray-500 italic">Chưa có thông tin</span>}
    </p>
  </div>
);

export const DetailsOrder = () => {
  const { leadId } = useParams<{ leadId: string }>();

  const [leadDetails, setLeadDetails] = useState<LeadDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };
  useEffect(() => {
    const fetch = async () => {
      if (leadId) {
        setLoading(true);
        try {
          const numericLeadId = parseInt(leadId, 10);
          const responseData = await getleadDetails(numericLeadId);
          setLeadDetails(responseData);
        } catch (error) {
          console.error("Failed to fetch lead details:", error);
          setLeadDetails(null);
        } finally {
          setLoading(false);
        }
      }
    };
    fetch();
  }, [leadId]);

  if (loading) {
    return <div className="text-white p-8">Đang tải chi tiết...</div>;
  }

  if (!leadDetails) {
    return <div className="text-white p-8">Không tìm thấy thông tin lead.</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-4 md:p-8 flex justify-center items-start">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg w-full max-w-4xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">
            Chi Tiết Lead: {leadDetails.customerName}
          </h1>
          <p className="text-gray-400 mt-1">ID: #{leadDetails.id}</p>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoBlock
              label="Tên khách hàng"
              value={leadDetails.customerName}
            />
            <InfoBlock label="Số điện thoại" value={leadDetails.phoneNumber} />
            <InfoBlock
              label="Sản phẩm quan tâm"
              value={leadDetails.productName}
            />
            <InfoBlock label="Người tạo" value={leadDetails.createdByName} />
            <InfoBlock label="Team tạo" value={leadDetails.createdByTeamName} />
            <InfoBlock
              label="Ngày tạo"
              value={new Date(leadDetails.createdAt).toLocaleDateString(
                "vi-VN"
              )}
            />

            <InfoBlock
              label="Ngày gán"
              value={
                leadDetails.assignedAt
                  ? new Date(leadDetails.assignedAt).toLocaleDateString("vi-VN")
                  : null
              }
            />
          </div>
        </div>
        <input type="text" placeholder="Update address" />

        <div className="p-6 bg-gray-800/50 border-t border-gray-700 rounded-b-2xl flex justify-end space-x-4">
          <button className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors">
            Hủy bỏ
          </button>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors">
            Tạo Đơn Hàng
          </button>
        </div>

        <button onClick={goBack}>Go back</button>
      </div>
    </div>
  );
};
