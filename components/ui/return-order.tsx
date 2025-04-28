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
  
  interface ReturnOrderDialogProps {
    orderId: string;
    isOpen: boolean;
    onClose: () => void;
    onReturn: (reason: string) => Promise<void>;
  }
  
  export function ReturnOrderDialog({
    orderId,
    isOpen,
    onClose,
    onReturn,
  }: ReturnOrderDialogProps) {
    const [reason, setReason] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
  
    const handleSubmit = async () => {
      if (!reason.trim()) {
        toast.error("Please provide a reason for return")
        return
      }
  
      setIsSubmitting(true)
      try {
        await onReturn(reason)
        toast.success("Return request submitted successfully")
        onClose()
      } catch (error) {
        toast.error("Failed to submit return request")
      } finally {
        setIsSubmitting(false)
      }
    }
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Return Order</DialogTitle>
            <DialogDescription>
              Please provide a reason for returning this order. We'll review your request and get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <Textarea
              placeholder="Enter reason for return..."
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
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Return Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }