import { useQuery } from "react-query";
import apiClient from "@/lib/axios";
import type { Inquiry, PaginatedResponse } from "@/types";

export const useInquiries = (page: number = 1, search: string = "") => {
  return useQuery<PaginatedResponse<Inquiry>>(
    ["inquiries", page, search],
    async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        ...(search && { search }),
      });

      const response = await apiClient.get(`/api/inquiries/?${params}`);
      return response.data;
    },
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};
