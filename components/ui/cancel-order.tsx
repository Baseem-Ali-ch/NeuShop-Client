import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { Textarea } from "@/components/ui/textarea"
  import { useState } from "react"
  import { toast } from "sonner"
  
  interface CancelOrderDialogProps {
    orderId: string;
    isOpen: boolean;
    onClose: () => void;
    onCancel: (reason: string) => Promise<void>;
  }
  
  export function CancelOrderDialog({
    orderId,
    isOpen,
    onClose,
    onCancel,
  }: CancelOrderDialogProps) {
    const [reason, setReason] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
  
    const handleSubmit = async () => {
      if (!reason.trim()) {
        toast.error("Please provide a reason for cancellation")
        return
      }
  
      setIsSubmitting(true)
      try {
        await onCancel(reason)
        toast.success("Order cancelled successfully")
        onClose()
      } catch (error) {
        toast.error("Failed to cancel order")
      } finally {
        setIsSubmitting(false)
      }
    }
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this order? Please provide a reason for cancellation.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <Textarea
              placeholder="Enter reason for cancellation..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
  
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Keep Order
            </Button>
            <Button
              variant="destructive"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cancelling..." : "Cancel Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }