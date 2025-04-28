import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useEffect, useRef } from "react";

interface InvoiceProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    orderId: string;
    id: string;
    date: string;
    total: number;
    items: Array<{
      name: string;
      price: number;
      quantity: number;
    }>;
    shippingInfo?: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
}

export function Invoice({ isOpen, onClose, order }: InvoiceProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const invoiceContent = invoiceRef.current;
    if (!invoiceContent) return;

    try {
      // Wait for invoice to fully render
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(invoiceContent, {
        scale: 2, // Higher resolution
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice-${order.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handlePrint = () => {
    const printContent = invoiceRef.current?.innerHTML;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice #${order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px 4px; }
            th { text-align: left; }
            .border-b { border-bottom: 1px solid #e5e7eb; }
            .text-right { text-align: right; }
            .font-bold { font-weight: bold; }
            @media print {
              body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <DialogTitle className="text-lg font-semibold">
            Invoice #{order.id}
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="h-8 px-2"
            >
              <Download className="h-4 w-4" />
              <span className="ml-2 text-xs">PDF</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="h-8 px-2"
            >
              <Printer className="h-4 w-4" />
              <span className="ml-2 text-xs">Print</span>
            </Button>
          </div>
        </DialogHeader>

        <div
          id="invoice-content"
          ref={invoiceRef}
          className="bg-white p-4 border border-gray-200 rounded-md shadow-sm"
        >
          <div className="flex justify-between items-start space-y-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">INVOICE</h2>
              <p className="text-gray-600 mt-1">Order #{order.orderId}</p>
              <p className="text-gray-600">
                Date: {format(new Date(order.date), "MMM dd, yyyy")}
              </p>
            </div>
            <div className="text-right">
              <h3 className="font-bold text-gray-800">Your Store Name</h3>
              <p className="text-gray-600">123 Store Street</p>
              <p className="text-gray-600">City, State 12345</p>
              <p className="text-gray-600">contact@yourstore.com</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-md">
            <h3 className="font-bold mb-2 text-gray-800">Bill To:</h3>
            {order.shippingInfo ? (
              <div className="text-gray-600">
                <p>{order.shippingInfo.address}</p>
                <p>
                  {order.shippingInfo.city}, {order.shippingInfo.state}{" "}
                  {order.shippingInfo.zipCode}
                </p>
                <p>{order.shippingInfo.country}</p>
              </div>
            ) : (
              <p className="text-gray-600">No shipping information available</p>
            )}
          </div>

          <div className="mt-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50">
                  <th className="text-left py-2 px-2 text-gray-700">Item</th>
                  <th className="text-right py-2 px-2 text-gray-700">
                    Quantity
                  </th>
                  <th className="text-right py-2 px-2 text-gray-700">Price</th>
                  <th className="text-right py-2 px-2 text-gray-700 ">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-300"
                  >
                    <td className="py-2 px-2 text-gray-800 dark:text-gray-800">
                      {item.name}
                    </td>
                    <td className="text-right py-2 px-2 text-gray-800 dark:text-gray-800">
                      {item.quantity}
                    </td>
                    <td className="text-right py-2 px-2 text-gray-800 dark:text-gray-800">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="text-right py-2 px-2 text-gray-800 dark:text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td
                    colSpan={3}
                    className="text-right py-2 px-2 font-bold text-gray-700 dark:text-gray-800"
                  >
                    Subtotal:
                  </td>
                  <td className="text-right py-2 px-2 text-gray-700 dark:text-gray-800">
                    ${order.total.toFixed(2)}
                  </td>
                </tr>
                <tr className="bg-gray-50 border-t border-gray-300">
                  <td
                    colSpan={3}
                    className="text-right py-2 px-2 font-bold text-gray-800 dark:text-gray-800"
                  >
                    Total:
                  </td>
                  <td className="text-right py-2 px-2 font-bold text-gray-800 dark:text-gray-800">
                    ${order.total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-200 text-gray-600">
            <p className="font-medium text-center">
              Thank you for your business!
            </p>
            <p className="text-sm text-center mt-2">
              If you have any questions about this invoice, please contact us at
              support@yourstore.com
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
