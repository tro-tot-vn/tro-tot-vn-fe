import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router";

// Mock data for pending posts
const pendingListings = [
  {
    id: 1,
    title: "3-bedroom apartment in District 2",
    address: "123 Nguyen Van Linh, District 2, HCMC",
    price: "15,000,000 VND",
    area: "85 m²",
    landlord: "Nguyen Van A",
    submittedAt: "2025-03-12T08:30:00Z",
  },
  {
    id: 2,
    title: "Studio apartment near university",
    address: "45 Dinh Tien Hoang, District 1, HCMC",
    price: "7,500,000 VND",
    area: "35 m²",
    landlord: "Tran Thi B",
    submittedAt: "2025-03-12T09:15:00Z",
  },
  {
    id: 3,
    title: "2-bedroom house with garden",
    address: "78 Le Loi, District 3, HCMC",
    price: "12,000,000 VND",
    area: "70 m²",
    landlord: "Pham Van C",
    submittedAt: "2025-03-12T10:45:00Z",
  },
  {
    id: 4,
    title: "Luxury apartment with river view",
    address: "200 Nguyen Hue, District 1, HCMC",
    price: "25,000,000 VND",
    area: "120 m²",
    landlord: "Le Thi D",
    submittedAt: "2025-03-12T11:20:00Z",
  },
  {
    id: 5,
    title: "Cozy room for rent near market",
    address: "56 Vo Van Tan, District 3, HCMC",
    price: "3,500,000 VND",
    area: "20 m²",
    landlord: "Hoang Van E",
    submittedAt: "2025-03-12T13:10:00Z",
  },
];

export default function AdminReviewPage() {
  const navigation = useNavigate();
  return (
    <div className="flex-1 flex overflow-hidden">
      <main className="h-full w-full overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Pending Post</h1>
          <div className="text-sm text-muted-foreground">
            Total: {pendingListings.length} posts
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Post Awaiting Review</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Landlord</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingListings.map((listing) => (
                  <TableRow
                    key={listing.id}
                    onClick={() => navigation(`/a/posts/review-post/${listing.id}`)}
                    className="cursor-pointer hover:bg-gray-200 border border-gray-100"
                  >
                    <TableCell className="font-semibold whitespace-normal break-words p-5">
                      {listing.title}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words">
                      {listing.address}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words">
                      {listing.price}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words">
                      {listing.area}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words">
                      {listing.landlord}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words">
                      {new Date(listing.submittedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
