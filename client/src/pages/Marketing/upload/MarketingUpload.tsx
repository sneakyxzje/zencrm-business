import { useAuth } from "@processes/auth/models/useAuth";
import { useEffect, useState } from "react";
import { getAssignableSales } from "@entities/user/api";
import type { AssignableSales } from "@entities/user/model/types";
import { getAllProducts } from "@entities/product/api";
import type { GetAllProduct } from "@entities/product/model/type";
import LeadUploadForm from "@features/shared/upload-lead/ui/LeadUploadForm";

export default function MarketingUploadPage() {
  const { user } = useAuth();
  const [sale, setSale] = useState<AssignableSales[] | null>(null);
  const [product, setProduct] = useState<GetAllProduct[]>([]);
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [salesRes, productsRes] = await Promise.all([
          getAssignableSales(),
          getAllProducts(),
        ]);

        setSale(salesRes?.content ?? null);
        setProduct(productsRes?.content ?? []);
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
      }
    };

    fetchInitialData();
  }, []);

  const defaultProductId = product.length > 0 ? product[0].id : null;
  const defaultAssigneeId = sale && sale.length > 0 ? sale[0].id : null;
  return (
    <div className="min-h-screen bg-[#232629] flex">
      <main className="flex-1 p-6">
        <LeadUploadForm
          currentUserName={user?.username ?? ""}
          currentTeamName={user?.teamName ?? ""}
          currentSaleInfo={sale}
          currentProductInfo={product}
          defaultProductId={defaultProductId}
          defaultAssigneeId={defaultAssigneeId}
        />
      </main>
    </div>
  );
}
