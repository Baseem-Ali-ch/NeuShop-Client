"use client";

import { useState } from "react";
import { useSelector } from "@/store/hooks";
import CustomerHeader from "@/components/organisms/admin/customers/customer-header";
import CustomerMetrics from "@/components/organisms/admin/customers/customer-metrics";
import CustomerFilters from "@/components/organisms/admin/customers/customer-filters";
import CustomerTable from "@/components/organisms/admin/customers/customer-table";
import SegmentationTools from "@/components/organisms/admin/customers/segmentation-tools";
import CustomerDetailsDrawer from "@/components/organisms/admin/customers/customer-details-drawer";
import CustomerFormModal from "@/components/organisms/admin/customers/customer-form-modal";
import BulkActionsBar from "@/components/organisms/admin/customers/bulk-actions-bar";
import { selectSelectedCustomers } from "@/store/slices/customerSlice";

export default function CustomerManagement() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [detailsCustomerId, setDetailsCustomerId] = useState<string | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState<string | null>(null);

  const selectedCustomers = useSelector(selectSelectedCustomers);
  const showBulkActions = selectedCustomers.length > 0;

  const toggleFilters = () => setIsFilterVisible(!isFilterVisible);

  const openCustomerDetails = (customerId: string) => {
    setDetailsCustomerId(customerId);
  };

  const closeCustomerDetails = () => {
    setDetailsCustomerId(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
    setEditCustomerId(null);
  };

  const openEditModal = (customerId: string) => {
    setEditCustomerId(customerId);
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditCustomerId(null);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <CustomerHeader
        onAddCustomer={openAddModal}
        onToggleFilters={toggleFilters}
        isFilterVisible={isFilterVisible}
      />

      <CustomerMetrics />

      {isFilterVisible && <CustomerFilters />}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-full">
          <CustomerTable
            onViewDetails={openCustomerDetails}
            onEditCustomer={openEditModal}
          />
        </div>

        {/* <div className="w-full lg:w-1/4">
          <SegmentationTools />
        </div> */}
      </div>

      {showBulkActions && <BulkActionsBar />}

      {detailsCustomerId && (
        <CustomerDetailsDrawer
          customerId={detailsCustomerId}
          onClose={closeCustomerDetails}
          onEdit={() => {
            closeCustomerDetails();
            openEditModal(detailsCustomerId);
          }}
        />
      )}

      {isAddModalOpen && (
        <CustomerFormModal customerId={editCustomerId} onClose={closeModal} />
      )}
    </div>
  );
}
