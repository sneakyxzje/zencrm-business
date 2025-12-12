import { api } from "@shared/api/axios";
import type { CategoryDTO, GiftDTO } from "@shared/types";
import { useEffect, useState } from "react";

export const useProductFormInit = () => {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [gifts, setGifts] = useState<GiftDTO[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, giftsResponse] = await Promise.all([
          api.get("/api/categories"),
          api.get("/api/gifts"),
        ]);
        setCategories(categoriesResponse.data.content);
        setGifts(giftsResponse.data.content);
        console.log("Categories:", categoriesResponse.data.content);
        console.log("Gifts:", giftsResponse.data.content);
      } catch (err) {
        console.error("Error fetching initial data: ", err);
        setError("Can't not load data!.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { categories, gifts, isLoading, error };
};
