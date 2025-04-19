"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, Mail, AlertTriangle, EyeOff, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { updateUserDetails, updateUserPassword } from "@/lib/accountApi";

// Form validation schemas
const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

// Mock user data
const mockUser = {
  avatar: "/abstract-user-icon.png",
};

export default function ProfileSettings({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("personal");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Personal info form
  const {
    register: registerPersonal,
    handleSubmit: handleSubmitPersonal,
    formState: { errors: personalErrors },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
    },
  });

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    watch,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Watch password for strength calculation
  const watchPassword = watch("newPassword", "");

  // Calculate password strength
  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0;

    let strength = 0;
    // Length check
    if (password.length >= 8) strength += 20;
    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 20;
    // Lowercase check
    if (/[a-z]/.test(password)) strength += 20;
    // Number check
    if (/[0-9]/.test(password)) strength += 20;
    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    setPasswordStrength(strength);
  };

  // Handle avatar change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle personal info submit
  const onPersonalSubmit = async (data: PersonalInfoFormValues) => {
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");
  
    const result = await updateUserDetails(data);
  
    if (result.success) {
      setSuccessMessage("Your details have been updated successfully!");
      console.log("Updated user details:", result.data);
    } else {
      setErrorMessage(result.message || "An unknown error occurred.");
    }
  
    setIsSubmitting(false);
  };
  
  // Handle password submit
  const onPasswordSubmit = async (data: PasswordFormValues) => {
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");
  
    const result = await updateUserPassword(data);
  
    if (result.success) {
      setSuccessMessage("Your password has been updated successfully!");
      console.log("Updated user password:", result.data);
    } else {
      setErrorMessage(result.message || "An unknown error occurred.");
    }
  
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.05)]">
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">
          Profile Settings
        </h1>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:data-[state=active]:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]"
            >
              Personal Info
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:data-[state=active]:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]"
            >
              Password
            </TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal">
            <form
              onSubmit={handleSubmitPersonal(onPersonalSubmit)}
              className="space-y-6"
            >
              {/* Avatar Upload */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.05)]">
                    <img
                      src={avatarPreview || mockUser.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center cursor-pointer shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                  >
                    <Camera className="h-4 w-4" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click the icon to upload a new photo
                </p>
              </div>

              {/* Personal Info Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    {...registerPersonal("firstName")}
                    className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                      personalErrors.firstName ? "border-red-500" : ""
                    }`}
                  />
                  {personalErrors.firstName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500"
                    >
                      {personalErrors.firstName.message}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    {...registerPersonal("lastName")}
                    className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                      personalErrors.lastName ? "border-red-500" : ""
                    }`}
                  />
                  {personalErrors.lastName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500"
                    >
                      {personalErrors.lastName.message}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      disabled
                      id="email"
                      type="email"
                      {...registerPersonal("email")}
                      className={`pl-10 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                        personalErrors.email ? "border-red-500" : ""
                      }`}
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {personalErrors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500"
                    >
                      {personalErrors.email.message}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    {...registerPersonal("phone")}
                    className="shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-white dark:border-gray-800 dark:border-t-gray-900" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Password Tab */}
          <TabsContent value="password">
            <form
              onSubmit={handleSubmitPassword(onPasswordSubmit)}
              className="space-y-6"
            >
              {/* Current Password */}
              <div className="space-y-2 relative">
                <Label htmlFor="currentPassword">
                  Current Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  {...registerPassword("currentPassword")}
                  className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                    passwordErrors.currentPassword ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-5 w-5 mt-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 mt-5 text-gray-400" />
                  )}
                </button>
                {passwordErrors.currentPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                  >
                    {passwordErrors.currentPassword.message}
                  </motion.p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-2 relative">
                <Label htmlFor="newPassword">
                  New Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"} // Toggle between text and password
                  {...registerPassword("newPassword", {
                    onChange: (e) => calculatePasswordStrength(e.target.value),
                  })}
                  className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                    passwordErrors.newPassword ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5 mt-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 mt-5 text-gray-400" />
                  )}
                </button>
                {passwordErrors.newPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                  >
                    {passwordErrors.newPassword.message}
                  </motion.p>
                )}

                {/* Password Strength Meter */}
                {watchPassword && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Password Strength
                      </span>
                      <span className="text-xs font-medium text-gray-900 dark:text-white">
                        {passwordStrength < 40
                          ? "Weak"
                          : passwordStrength < 80
                          ? "Medium"
                          : "Strong"}
                      </span>
                    </div>
                    <Progress
                      value={passwordStrength}
                      className="h-1.5 bg-gray-200 dark:bg-gray-700"
                      indicatorClassName={
                        passwordStrength < 40
                          ? "bg-red-500"
                          : passwordStrength < 80
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }
                    />
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2 relative">
                <Label htmlFor="confirmPassword">
                  Confirm Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
                  {...registerPassword("confirmPassword")}
                  className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                    passwordErrors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 mt-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 mt-5 text-gray-400" />
                  )}
                </button>
                {passwordErrors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                  >
                    {passwordErrors.confirmPassword.message}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-white dark:border-gray-800 dark:border-t-gray-900" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Account Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.05)]">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
          Delete Account
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>

        {showDeleteConfirm ? (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 mb-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                  Are you absolutely sure?
                </h3>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </p>
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                  >
                    Yes, delete my account
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Button
            variant="destructive"
            onClick={() => setShowDeleteConfirm(true)}
            className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
          >
            Delete Account
          </Button>
        )}
      </div>
    </div>
  );
}
