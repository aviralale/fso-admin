import { useState, useEffect } from "react";
import { Users, Mail, Globe, Target } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { InquiryTable } from "@/components/dashboard/InquiryTable";
import { Pagination } from "@/components/dashboard/Pagination";
import { useInquiries } from "@/hooks/useInquiries";
import { useDebounce } from "@/hooks/useDebounce";

export const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, isLoading, error } = useInquiries(
    currentPage,
    debouncedSearchTerm
  );

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const totalPages = data ? Math.ceil(data.count / 20) : 1;

  const stats = [
    {
      title: "Total Inquiries",
      value: data?.count || 0,
      icon: <Users className="h-4 w-4" />,
      description: "Total number of inquiries received",
    },
    {
      title: "Current Page",
      value: currentPage,
      icon: <Mail className="h-4 w-4" />,
      description: `Showing page ${currentPage} of ${totalPages}`,
    },
    {
      title: "Countries",
      value: data?.results
        ? new Set(data.results.map((i) => i.country_of_interest)).size
        : 0,
      icon: <Globe className="h-4 w-4" />,
      description: "Unique countries of interest",
    },
    {
      title: "This Page",
      value: data?.results?.length || 0,
      icon: <Target className="h-4 w-4" />,
      description: "Inquiries on current page",
    },
  ];

  if (error) {
    return (
      <Layout>
        <div className="text-center py-8">
          <p className="text-red-600">
            Error loading inquiries. Please try again.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-md">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search inquiries..."
          />
        </div>

        {/* Inquiries Table */}
        <InquiryTable inquiries={data?.results || []} loading={isLoading} />

        {/* Pagination */}
        {data && data.count > 20 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            hasNext={!!data.next}
            hasPrevious={!!data.previous}
          />
        )}
      </div>
    </Layout>
  );
};
