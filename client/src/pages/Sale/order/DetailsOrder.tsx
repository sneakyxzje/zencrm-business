import { useParams } from "react-router-dom";
import { useLeadDetail } from "@features/shared/detail-lead/model/useLeadDetail";
import { useCreateOrder } from "@features/order/model/useCreateOrder";
import { CreateOrderForm } from "@pages/Sale/components/CreateOrderForm";
import Spinner from "@shared/ui/Spinner";
import { LeadInfoSection } from "@pages/Sale/components/LeadInfoSection";

export const DetailsOrder = () => {
  const { leadId } = useParams<{ leadId: string }>();
  const { lead, isLoading, isError } = useLeadDetail("sale", Number(leadId));
  const { formState, setters, computed, actions, isPending } =
    useCreateOrder(lead);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2a2c2e] border border-[#3f4245] flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#90999a]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-[#dcdcdc] text-lg font-medium">
            Không tìm thấy thông tin lead
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#232629] overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto">
          <LeadInfoSection lead={lead} />
          <CreateOrderForm
            onSubmit={actions.handleSubmit}
            isPending={isPending}
            onCancel={actions.goBack}
            formState={formState}
            setFormState={setters}
            computed={computed}
            product={lead?.product}
          />
        </div>
      </div>
    </div>
  );
};
