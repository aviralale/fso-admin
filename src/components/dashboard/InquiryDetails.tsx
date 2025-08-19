import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Inquiry } from "@/types";

interface InquiryDetailsProps {
  inquiry: Inquiry;
}

export const InquiryDetails = ({ inquiry }: InquiryDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inquiry Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Full Name</label>
          <p className="mt-1">{inquiry.full_name}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">
            Email Address
          </label>
          <p className="mt-1">{inquiry.email_address}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">
            Phone Number
          </label>
          <p className="mt-1">{inquiry.phone_number || "Not provided"}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">
            Country of Interest
          </label>
          <p className="mt-1">{inquiry.country_of_interest}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">Goals</label>
          <p className="mt-1 text-sm text-gray-600">{inquiry.goals}</p>
        </div>
      </CardContent>
    </Card>
  );
};
