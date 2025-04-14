"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, CheckCircle, Download, Upload, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

interface BulkUpdateModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BulkUpdateModal({ isOpen, onClose }: BulkUpdateModalProps) {
  const [activeTab, setActiveTab] = useState("upload")
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewData, setPreviewData] = useState<any[]>([])
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [summary, setSummary] = useState({
    total: 0,
    updated: 0,
    errors: 0,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)

      // Mock file parsing and validation
      setTimeout(() => {
        // Mock preview data
        setPreviewData([
          { sku: "SKU001", name: "Product 1", currentStock: 10, newStock: 15, status: "valid" },
          { sku: "SKU002", name: "Product 2", currentStock: 5, newStock: 8, status: "valid" },
          { sku: "SKU003", name: "Product 3", currentStock: 0, newStock: 12, status: "valid" },
          { sku: "INVALID", name: "Unknown Product", currentStock: "?", newStock: 10, status: "error" },
        ])

        // Mock validation errors
        setValidationErrors([
          'Row 4: SKU "INVALID" not found in the system',
          "Row 7: Stock value must be a positive number",
        ])

        setActiveTab("preview")
      }, 1000)
    }
  }

  const handleUpload = () => {
    setIsUploading(true)

    // Mock upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleProcess = () => {
    setIsProcessing(true)

    // Mock processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      setSummary({
        total: previewData.length,
        updated: previewData.filter((item) => item.status === "valid").length,
        errors: previewData.filter((item) => item.status === "error").length,
      })
      setActiveTab("complete")
    }, 2000)
  }

  const handleDownloadTemplate = () => {
    // In a real app, this would download a CSV template
    console.log("Downloading template")
  }

  const handleDownloadReport = () => {
    // In a real app, this would download the results report
    console.log("Downloading report")
  }

  const resetModal = () => {
    setFile(null)
    setIsUploading(false)
    setUploadProgress(0)
    setPreviewData([])
    setValidationErrors([])
    setIsProcessing(false)
    setIsComplete(false)
    setSummary({ total: 0, updated: 0, errors: 0 })
    setActiveTab("upload")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Bulk Stock Update</DialogTitle>
          <DialogDescription>Update multiple product stock levels at once.</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="preview" disabled={!file}>
              Preview
            </TabsTrigger>
            <TabsTrigger value="complete" disabled={!isComplete}>
              Complete
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={handleDownloadTemplate} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download CSV Template
              </Button>
            </div>

            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Input type="file" accept=".csv" onChange={handleFileChange} className="hidden" id="csv-upload" />
              <Label htmlFor="csv-upload" className="flex flex-col items-center gap-2 cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="font-medium">Click to upload CSV file</span>
                <span className="text-sm text-muted-foreground">or drag and drop</span>
              </Label>

              {file && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                  <span>{file.name}</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setFile(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            {file && !isUploading && (
              <div className="flex justify-end">
                <Button onClick={handleUpload}>Upload and Validate</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="preview" className="space-y-4 py-4">
            {validationErrors.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Validation Errors</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 text-sm">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>New Stock</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.currentStock}</TableCell>
                      <TableCell>{item.newStock}</TableCell>
                      <TableCell>
                        {item.status === "valid" ? (
                          <span className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Valid
                          </span>
                        ) : (
                          <span className="flex items-center text-red-600">
                            <X className="h-4 w-4 mr-1" />
                            Error
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {isProcessing ? (
              <div className="space-y-2">
                <div className="text-sm">Processing updates...</div>
                <Progress value={undefined} />
              </div>
            ) : (
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={resetModal}>
                  Cancel
                </Button>
                <Button onClick={handleProcess} disabled={validationErrors.length > 0}>
                  Apply Changes
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="complete" className="space-y-4 py-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Update Complete</AlertTitle>
              <AlertDescription>Your inventory has been updated successfully.</AlertDescription>
            </Alert>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border p-4 text-center">
                <div className="text-2xl font-bold">{summary.total}</div>
                <div className="text-sm text-muted-foreground">Total Products</div>
              </div>
              <div className="rounded-lg border p-4 text-center bg-green-50 dark:bg-green-950/30">
                <div className="text-2xl font-bold text-green-600">{summary.updated}</div>
                <div className="text-sm text-muted-foreground">Updated</div>
              </div>
              <div className="rounded-lg border p-4 text-center bg-red-50 dark:bg-red-950/30">
                <div className="text-2xl font-bold text-red-600">{summary.errors}</div>
                <div className="text-sm text-muted-foreground">Errors</div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleDownloadReport} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Report
              </Button>

              <Button onClick={resetModal}>Done</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
