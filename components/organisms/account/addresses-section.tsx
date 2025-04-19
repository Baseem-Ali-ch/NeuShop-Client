"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Home, Plus, Edit, Trash2, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Country, State } from "country-state-city";
import {
  deleteAddress,
  fetchAddresses,
  saveAddress,
  setDefaultAddress,
} from "@/lib/accountApi";
import { Address } from "@/types/address";
import { addressSchema } from "@/lib/schemad/addressSchema";

type AddressFormValues = z.infer<typeof addressSchema>;

interface AddressesSectionProps {
  user: { id: string };
}

export default function AddressesSection({ user }: AddressesSectionProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<
    { name: string; isoCode: string }[]
  >([]);
  const [states, setStates] = useState<{ name: string; isoCode: string }[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
      phoneNumber: "",
      isDefault: false,
    },
  });

  // Fetch countries on mount
  useEffect(() => {
    const countryList = Country.getAllCountries().map((c) => ({
      name: c.name,
      isoCode: c.isoCode,
    }));
    setCountries(countryList);
  }, []);

  // Fetch addresses on mount
  useEffect(() => {
    const loadAddresses = async () => {
      setIsLoading(true);
      try {
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        const data = await fetchAddresses();
        setAddresses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAddresses();
  }, [user?.id]);

  // Update states when country changes
  const countryWatch = watch("country");
  useEffect(() => {
    if (countryWatch) {
      const stateList = State.getStatesOfCountry(countryWatch).map((s) => ({
        name: s.name,
        isoCode: s.isoCode,
      }));
      setStates(stateList);
  
      // Only reset the state field if not editing an address
      if (!editingAddressId) {
        setValue("state", ""); 
      }
    }
  }, [countryWatch, setValue, editingAddressId]);

  // Start editing an address
  const handleEdit = (address: Address) => {
    setEditingAddressId(address._id);
    reset(address);
    setShowAddForm(true);
  };

  // Delete an address
  const handleDelete = async (id: number) => {
    try {
      await deleteAddress(id);
      setAddresses(addresses.filter((address) => address._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Set an address as default
  const handleSetDefault = async (id: number) => {
    try {
      console.log('id', id)
      await setDefaultAddress(id);
      setAddresses(
        addresses.map((address) => ({
          ...address,
          isDefault: address._id === id,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Handle form submission
  const onSubmit = async (data: AddressFormValues) => {
    setIsSubmitting(true);
    try {
      const updatedAddress = await saveAddress(data, editingAddressId);

      if (editingAddressId) {
        setAddresses(
          addresses.map((address) => {
            if (address._id === editingAddressId) {
              return updatedAddress;
            }
            if (data.isDefault && address.isDefault) {
              return { ...address, isDefault: false };
            }
            return address;
          })
        );
      } else {
        if (data.isDefault) {
          setAddresses([
            updatedAddress,
            ...addresses.map((address) => ({ ...address, isDefault: false })),
          ]);
        } else {
          setAddresses([updatedAddress, ...addresses]);
        }
      }
      reset();
      setShowAddForm(false);
      setEditingAddressId(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.05)]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
            My Addresses
          </h1>
          <Button
            onClick={() => {
              reset();
              setEditingAddressId(null);
              setShowAddForm(!showAddForm);
            }}
            className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
          >
            {showAddForm ? (
              "Cancel"
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" /> Add Address
              </>
            )}
          </Button>
        </div>

        {/* Add/Edit Address Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                  {editingAddressId ? "Edit Address" : "Add New Address"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Address Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Home, Work, etc."
                        {...register("name")}
                        className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                          errors.name ? "border-red-500" : ""
                        }`}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500"
                        >
                          {errors.name.message}
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">
                        Country <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) => setValue("country", value)}
                        defaultValue={watch("country")}
                      >
                        <SelectTrigger
                          id="country"
                          className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                            errors.country ? "border-red-500" : ""
                          }`}
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
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500"
                        >
                          {errors.country.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">
                      Address Line 1 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="addressLine1"
                      placeholder="Street address"
                      {...register("addressLine1")}
                      className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                        errors.addressLine1 ? "border-red-500" : ""
                      }`}
                    />
                    {errors.addressLine1 && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                      >
                        {errors.addressLine1.message}
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      {...register("addressLine2")}
                      className="shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        {...register("city")}
                        className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                          errors.city ? "border-red-500" : ""
                        }`}
                      />
                      {errors.city && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500"
                        >
                          {errors.city.message}
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">
                        State <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) => setValue("state", value)}
                        defaultValue={watch("state")}
                      >
                        <SelectTrigger
                          id="state"
                          className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3x_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                            errors.state ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem
                              key={state.isoCode}
                              value={state.isoCode}
                            >
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.state && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500"
                        >
                          {errors.state.message}
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postalCode">
                        Postal Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="postalCode"
                        {...register("postalCode")}
                        className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                          errors.postalCode ? "border-red-500" : ""
                        }`}
                      />
                      {errors.postalCode && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500"
                        >
                          {errors.postalCode.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phoneNumber"
                      placeholder="+1234567890"
                      {...register("phoneNumber")}
                      className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                        errors.phoneNumber ? "border-red-500" : ""
                      }`}
                    />
                    {errors.phoneNumber && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                      >
                        {errors.phoneNumber.message}
                      </motion.p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-white dark:border-gray-800 dark:border-t-gray-900" />
                          {editingAddressId ? "Updating..." : "Adding..."}
                        </>
                      ) : (
                        <>
                          {editingAddressId ? "Update Address" : "Add Address"}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Addresses List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="h-8 w-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading addresses...
            </p>
          </div>
        ) : addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <motion.div
                key={address._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  address.isDefault
                    ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                    : "bg-gray-50 dark:bg-gray-700/50"
                } shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]`}
              >
                {/* Address details */}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                        address.isDefault
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      } shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]`}
                    >
                      <Home className="h-4 w-4" />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {address.name}
                    </h3>
                  </div>
                  {address.isDefault && (
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>

                <div className="ml-10 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>{address.addressLine1}</p>
                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                  <p>
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p>
                    {countries.find((c) => c.isoCode === address.country)
                      ?.name || address.country}
                  </p>
                  <p>Phone: {address.phoneNumber}</p>
                </div>

                <div className="mt-4 ml-10 flex gap-2">
                  <Button
                    variant="outline" title="Edit"
                    size="sm"
                    onClick={() => handleEdit(address)}
                    className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                  >
                    <Edit className="h-4 w-4 mr-1" /> 
                  </Button>
                  <Button
                    variant="outline" title="Delete"
                    size="sm"
                    onClick={() => handleDelete(address._id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> 
                  </Button>
                  {!address.isDefault && (
                    <Button
                      variant="outline" title="Set as default"
                      size="sm"
                      onClick={() => handleSetDefault(address._id)}
                      className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                    >
                      <Check className="h-4 w-4 mr-1" /> 
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]">
            <Home className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Addresses Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add your first address to make checkout faster.
            </p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Address
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
