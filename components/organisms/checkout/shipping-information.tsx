"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Home, MapPin, Building, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Address {
  _id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  isDefault: boolean;
}

interface ShippingAddressSelectionProps {
  addresses: Address[];
  onBack: () => void;
  onContinue: (selectedAddress: Address | NewAddress) => void;
}

interface NewAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const addressSchema = z.object({
  addressLine1: z.string().min(1, { message: "Address is required" }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State/Province is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export default function ShippingAddressSelection({
  addresses,
  onBack,
  onContinue,
}: ShippingAddressSelectionProps) {
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form for adding new address
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
    },
  });

  // Find default address and set it as selected initially
  useEffect(() => {
    if (!showAddForm && addresses.length > 0) {
      const defaultAddress = addresses.find((address) => address.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress._id);
      } else {
        setSelectedAddressId(addresses[0]._id); // Select first address if no default
      }
    }
  }, [addresses, showAddForm]);

  const handleContinue = () => {
    const selectedAddress = addresses.find(
      (address) => address._id === selectedAddressId
    );
    if (selectedAddress) {
      setIsSubmitting(true);
      setTimeout(() => {
        // Make sure to pass the full address object with all fields
        onContinue(selectedAddress);
        setIsSubmitting(false);
      }, 800);
    }
  };

  const handleAddNewAddress = async (data: AddressFormValues) => {
    setIsSubmitting(true);
    try {
      // Create a new address object with all required fields
      const newAddress = {
        _id: "new_address_" + Date.now(),
        name: "New Address",
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2 || "",
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
        phoneNumber: "",
        isDefault: false,
      };

      setTimeout(() => {
        onContinue(newAddress);
        setIsSubmitting(false);
      }, 800);
    } catch (error) {
      console.error("Failed to process address:", error);
      setIsSubmitting(false);
    }
  };

  // Countries data
  const countries = [
    { isoCode: "US", name: "United States" },
    { isoCode: "CA", name: "Canada" },
    { isoCode: "UK", name: "United Kingdom" },
    { isoCode: "IN", name: "India" },
    { isoCode: "AU", name: "Australia" },
    { isoCode: "DE", name: "Germany" },
  ];

  // Get country name function
  const getCountryName = (countryCode: string) => {
    const country = countries.find((c) => c.isoCode === countryCode);
    return country ? country.name : countryCode;
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 md:p-8">
      <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-6">
        Shipping Information
      </h2>

      {!showAddForm && addresses.length > 0 && (
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Select a shipping address
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(true)}
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Address
          </Button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {showAddForm ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            key="add-form"
          >
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Enter shipping address
                </h3>
                {addresses.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddForm(false)}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <form
                onSubmit={handleSubmit(handleAddNewAddress)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="addressLine1"
                      placeholder="123 Main St"
                      className={`pl-10 ${
                        errors.addressLine1
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                      {...register("addressLine1")}
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {errors.addressLine1 && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.addressLine1.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressLine2">
                    Apartment, suite, etc. (optional)
                  </Label>
                  <div className="relative">
                    <Input
                      id="addressLine2"
                      placeholder="Apt 4B"
                      className="pl-10"
                      {...register("addressLine2")}
                    />
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      className={
                        errors.city
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                      {...register("city")}
                    />
                    {errors.city && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">
                      Country/Region <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      defaultValue="US"
                      onValueChange={(value) => setValue("country", value)}
                    >
                      <SelectTrigger
                        id="country"
                        className={
                          errors.country
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }
                      >
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem
                            key={country.isoCode}
                            value={country.isoCode}
                          >
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">
                      State/Province <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      className={
                        errors.state
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                      {...register("state")}
                    />
                    {errors.state && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.state.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode">
                      ZIP/Postal code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="postalCode"
                      placeholder="10001"
                      className={
                        errors.postalCode
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                      {...register("postalCode")}
                    />
                    {errors.postalCode && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {addresses.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                      className="sm:flex-1"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="sm:flex-1"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Continue to payment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            key="address-list"
          >
            {addresses.length > 0 ? (
              <RadioGroup
                value={selectedAddressId}
                onValueChange={setSelectedAddressId}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <div key={address._id} className="relative">
                      <RadioGroupItem
                        id={address._id}
                        value={address._id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={address._id}
                        className="cursor-pointer w-full h-full block"
                      >
                        <motion.div
                          className={`p-4 rounded-lg border-2 ${
                            selectedAddressId === address._id
                              ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-600"
                              : address.isDefault
                              ? "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                              : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                          } shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors`}
                        >
                          {/* Address details */}
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                                  selectedAddressId === address._id
                                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                }`}
                              >
                                <Home className="h-4 w-4" />
                              </div>
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {address.addressLine1}
                              </h3>
                            </div>
                            {address.isDefault && (
                              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                            {selectedAddressId === address._id && (
                              <span className="absolute top-2 right-2 w-6 h-6 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                                <Check className="h-4 w-4 text-white" />
                              </span>
                            )}
                          </div>

                          <div className="ml-10 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {address.addressLine2 && (
                              <p>{address.addressLine2}</p>
                            )}
                            <p>
                              {address.city}, {address.state}{" "}
                              {address.postalCode}
                            </p>
                            <p>{getCountryName(address.country)}</p>
                          </div>
                        </motion.div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Enter shipping address
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
                  Please provide your shipping address to continue
                </p>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Enter address
                </Button>
              </div>
            )}

            {addresses.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="sm:flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to customer
                </Button>
                <Button
                  type="button"
                  onClick={handleContinue}
                  disabled={isSubmitting || !selectedAddressId}
                  className="sm:flex-1"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Continue to payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
