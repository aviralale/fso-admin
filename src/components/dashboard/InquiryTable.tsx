import { Mail, Phone, MapPin, Target } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Inquiry } from "@/types";

interface InquiryTableProps {
  inquiries: Inquiry[];
  loading?: boolean;
}

export const InquiryTable = ({ inquiries, loading }: InquiryTableProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inquiries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Goals</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="font-medium">#{inquiry.id}</TableCell>
                  <TableCell>{inquiry.full_name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{inquiry.email_address}</span>
                      </div>
                      {inquiry.phone_number && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">
                            {inquiry.phone_number}
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span>
                        {inquiry.city_of_interest}
                        {inquiry.city_of_interest && ", "}
                        {inquiry.country_of_interest}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Target className="h-3 w-3 text-gray-400" />
                      <span className="text-sm text-gray-600 max-w-xs truncate">
                        {inquiry.goals}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {inquiries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No inquiries found.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
