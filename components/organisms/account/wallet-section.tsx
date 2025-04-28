import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { Wallet } from "@/types/wallet";
import { fetchWalletDetails } from "@/lib/user/accountApi";

export default function WalletSection() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWalletDetails = async () => {
      try {
        const response = await fetchWalletDetails();
        console.log("Wallet details:", response);
        
        // Get the first wallet from the array
        const walletData = Array.isArray(response) ? response[0] : response;
        
        if (!walletData) {
          throw new Error("No wallet data found");
        }

        // Map the wallet data to match our interface
        const mappedWallet: Wallet = {
          _id: walletData._id,
          userId: walletData.userId,
          balance: walletData.balance,
          transactions: walletData.transactions.map((tx: any) => ({
            _id: tx._id,
            amount: tx.amount,
            type: tx.type,
            description: tx.description,
            orderId: tx.orderId,
            createdAt: tx.createdAt
          }))
        };

        setWallet(mappedWallet);
      } catch (err: any) {
        console.error("Wallet fetch error:", err);
        setError(err.message || "Failed to load wallet details");
      } finally {
        setIsLoading(false);
      }
    };

    getWalletDetails();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Wallet Balance</CardTitle>
          <CardDescription>Your current wallet balance and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <p className="text-2xl font-bold text-primary">
            ${(wallet?.balance || 0).toFixed(2)}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Transaction History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wallet?.transactions?.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>
                      {format(new Date(transaction.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === "credit"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          transaction.type === "credit"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }
                      >
                        {transaction.type === "credit" ? "+" : "-"}$
                        {transaction.amount.toFixed(2)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}