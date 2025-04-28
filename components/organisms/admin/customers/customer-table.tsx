"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "@/store/hooks";
import {
  MoreHorizontal,
  Edit,
  Trash,
  UserCog,
  Eye,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  BanIcon,
  Ban,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Pagination from "@/components/molecules/pagination";
import {
  selectCustomer,
  deselectCustomer,
  selectAllCustomers,
  deselectAllCustomers,
} from "@/store/slices/customerSlice";
import { Customer } from "@/types/customer";
import {
  activateCustomer,
  deactivateCustomer,
  deleteCustomer,
  fetchCustomers,
} from "@/lib/admin/customerApi";

interface CustomerTableProps {
  onViewDetails: (customerId: string) => void;
  onEditCustomer: (customerId: string) => void;
}

export default function CustomerTable({
  onViewDetails,
  onEditCustomer,
}: CustomerTableProps) {
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch customers from API
  useEffect(() => {
    const loadCustomers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const data = await fetchCustomers();
        console.log("data", data);
        setCustomers(data);
      } catch (err: any) {
        setError(
          err.message || "Unable to load customers. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomers();
  }, []);

  const handleActivate = async (customerId: string) => {
    try {
      await activateCustomer(customerId);
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === customerId
            ? { ...customer, status: "active" } // Change from isActive to status
            : customer
        )
      );
    } catch (err) {
      console.error("Failed to activate customer:", err);
      // Add user feedback here
    }
  };

  const handleDeactivate = async (customerId: string) => {
    try {
      await deactivateCustomer(customerId);
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === customerId
            ? { ...customer, status: "inactive" } // Change from isActive to status
            : customer
        )
      );
    } catch (err) {
      console.error("Failed to deactivate customer:", err);
      // Add user feedback here
    }
  };

  // Handle delete customer
  const handleDelete = async (customerId: string) => {
    try {
      await deleteCustomer(customerId);
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.id !== customerId)
      );
    } catch (err) {
      console.error("Failed to delete customer:", err);
    }
  };

  // Filter and sort customers
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;
    if (sortField === "name") {
      return order * a.name.localeCompare(b.name);
    } else if (sortField === "email") {
      return order * a.email.localeCompare(b.email);
    } else if (sortField === "dateRegistered") {
      return (
        order *
        (new Date(a.dateRegistered).getTime() -
          new Date(b.dateRegistered).getTime())
      );
    } else if (sortField === "ordersCount") {
      return order * (a.ordersCount - b.ordersCount);
    } else if (sortField === "totalSpent") {
      return (
        order *
        (parseFloat(a.totalSpent.replace("$", "")) -
          parseFloat(b.totalSpent.replace("$", "")))
      );
    } else if (sortField === "lastOrderDate") {
      const dateA = a.lastOrderDate ? new Date(a.lastOrderDate).getTime() : 0;
      const dateB = b.lastOrderDate ? new Date(b.lastOrderDate).getTime() : 0;
      return order * (dateA - dateB);
    }
    return 0;
  });

  // Get current customers for pagination
  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = sortedCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-gray-800 p-6 text-center">
        <div className="h-8 w-8 mx-auto rounded-full border-2 border-t-transparent border-gray-500 animate-spin" />
        <p className="text-gray-600 dark:text-gray-400 mt-4">
          Loading customers...
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white dark:bg-gray-800 p-6 text-center">
        <p className="text-red-500 dark:text-red-400">{error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm border-0">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date Registered</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={customer.avatar} alt={customer.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.dateRegistered}</TableCell>

                <TableCell>
                  {customer.status === "active" ? ( // Change from isActive to status
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-100">
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 hover:bg-red-100">
                      Inactive
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onViewDetails(customer.id)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      {customer.status === "active" ? (
                        <DropdownMenuItem
                          className="text-yellow-600 dark:text-orange-400"
                          onClick={() => handleDeactivate(customer.id)}
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Deactivate
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          className="text-green-600 dark:text-green-400"
                          onClick={() => handleActivate(customer.id)}
                        >
                          <UserCog className="mr-2 h-4 w-4" />
                          Activate
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-red-600 dark:text-red-400"
                        onClick={() => handleDelete(customer.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredCustomers.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} className="h-24 text-center">
                  No customers found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-medium">{indexOfFirstCustomer + 1}</span> to{" "}
          <span className="font-medium">
            {indexOfLastCustomer > filteredCustomers.length
              ? filteredCustomers.length
              : indexOfLastCustomer}
          </span>{" "}
          of <span className="font-medium">{filteredCustomers.length}</span>{" "}
          customers
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredCustomers.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>
    </Card>
  );
}
