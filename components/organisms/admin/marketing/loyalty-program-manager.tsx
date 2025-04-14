"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Award, Gift, Users, Star, Calendar } from "lucide-react"

export default function LoyaltyProgramManager() {
  const [activeTab, setActiveTab] = useState("points")

  return (
    <Card className="w-full">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Loyalty Program Manager</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Program Active</span>
            <Switch defaultChecked />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-6">
            <TabsTrigger value="points" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Points System</span>
            </TabsTrigger>
            <TabsTrigger value="tiers" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Reward Tiers</span>
            </TabsTrigger>
            <TabsTrigger value="benefits" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              <span>Benefits</span>
            </TabsTrigger>
            <TabsTrigger value="enrollment" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Enrollment</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="points" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Points Configuration</h3>
              <Button variant="outline">View Points History</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pointsName">Points Name</Label>
                  <Input id="pointsName" defaultValue="Reward Points" />
                  <p className="text-xs text-gray-500">What to call your loyalty points (e.g., Stars, Coins)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pointsRatio">Points Earning Ratio</Label>
                  <div className="flex items-center gap-2">
                    <Input id="pointsRatio" type="number" defaultValue="10" className="w-20" />
                    <span>points per $1 spent</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pointsValue">Points Redemption Value</Label>
                  <div className="flex items-center gap-2">
                    <Input id="pointsValue" type="number" defaultValue="100" className="w-20" />
                    <span>points = </span>
                    <Input type="number" defaultValue="1" className="w-20" />
                    <span>$</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Point Expiration</Label>
                  <Select defaultValue="365">
                    <SelectTrigger>
                      <SelectValue placeholder="Select expiration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never Expire</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="180">180 Days</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                      <SelectItem value="730">2 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Minimum Points for Redemption</Label>
                  <Input type="number" defaultValue="500" />
                </div>

                <div className="space-y-2">
                  <Label>Rounding Method</Label>
                  <Select defaultValue="up">
                    <SelectTrigger>
                      <SelectValue placeholder="Select rounding method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="up">Round Up</SelectItem>
                      <SelectItem value="down">Round Down</SelectItem>
                      <SelectItem value="nearest">Round to Nearest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border mt-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Special Events Multiplier</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Configure point multipliers for special events and holidays
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Input placeholder="Event Name (e.g., Black Friday)" className="flex-1" />
                      <div className="flex items-center gap-2">
                        <span>×</span>
                        <Input type="number" defaultValue="2" className="w-16" />
                      </div>
                      <Button variant="outline" size="icon">
                        +
                      </Button>
                    </div>

                    <Button variant="outline">Add Special Event</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tiers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Loyalty Tiers</h3>
              <Button>Add New Tier</Button>
            </div>

            <div className="space-y-4">
              {[
                { name: "Bronze", points: "0", color: "#CD7F32" },
                { name: "Silver", points: "1000", color: "#C0C0C0" },
                { name: "Gold", points: "5000", color: "#FFD700" },
                { name: "Platinum", points: "10000", color: "#E5E4E2" },
              ].map((tier, index) => (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: tier.color }}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{tier.name}</h4>
                      <p className="text-sm text-gray-500">{tier.points}+ points required</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      {index > 0 && (
                        <Button variant="ghost" size="sm">
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-4 border-t mt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Tier Settings</h4>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="tierReset">Annual Tier Reset</Label>
                    <p className="text-xs text-gray-500">Reset customer tiers at the beginning of each year</p>
                  </div>
                  <Switch id="tierReset" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="tierDowngrade">Enable Tier Downgrade</Label>
                    <p className="text-xs text-gray-500">Downgrade customers if they don't maintain activity</p>
                  </div>
                  <Switch id="tierDowngrade" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inactivityPeriod">Inactivity Period for Downgrade</Label>
                  <Select defaultValue="365">
                    <SelectTrigger id="inactivityPeriod">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="180">180 Days</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                      <SelectItem value="730">2 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Member Benefits</h3>
              <Button>Add New Benefit</Button>
            </div>

            <div className="space-y-4">
              {[
                { tier: "Bronze", benefits: ["Free shipping on orders over $50", "Birthday reward"] },
                {
                  tier: "Silver",
                  benefits: ["Free shipping on all orders", "Birthday reward", "Early access to sales"],
                },
                {
                  tier: "Gold",
                  benefits: [
                    "Free shipping on all orders",
                    "Birthday reward",
                    "Early access to sales",
                    "Exclusive products",
                    "Double points weekends",
                  ],
                },
                {
                  tier: "Platinum",
                  benefits: [
                    "Free shipping on all orders",
                    "Birthday reward",
                    "Early access to sales",
                    "Exclusive products",
                    "Triple points weekends",
                    "Dedicated support line",
                    "Free returns",
                  ],
                },
              ].map((tierBenefits, index) => (
                <Card
                  key={index}
                  className="border-l-4"
                  style={{ borderLeftColor: ["#CD7F32", "#C0C0C0", "#FFD700", "#E5E4E2"][index] }}
                >
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">{tierBenefits.tier} Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <ul className="list-disc list-inside space-y-1">
                      {tierBenefits.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm" className="mt-4">
                      Edit Benefits
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border mt-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Gift className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Birthday Rewards</h4>
                  <p className="text-sm text-gray-500 mb-4">Configure special rewards for customer birthdays</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="birthdayRewardType">Reward Type</Label>
                      <Select defaultValue="points">
                        <SelectTrigger id="birthdayRewardType">
                          <SelectValue placeholder="Select reward type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="points">Bonus Points</SelectItem>
                          <SelectItem value="discount">Discount Coupon</SelectItem>
                          <SelectItem value="gift">Free Gift</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthdayRewardValue">Reward Value</Label>
                      <Input id="birthdayRewardValue" type="number" defaultValue="500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="enrollment" className="space-y-6">
            <h3 className="text-lg font-medium">Enrollment Settings</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoEnroll">Automatic Enrollment</Label>
                  <p className="text-xs text-gray-500">Automatically enroll customers when they create an account</p>
                </div>
                <Switch id="autoEnroll" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="guestEnroll">Guest Enrollment</Label>
                  <p className="text-xs text-gray-500">Allow guests to enroll in the loyalty program</p>
                </div>
                <Switch id="guestEnroll" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="welcomePoints">Welcome Points</Label>
                  <p className="text-xs text-gray-500">Award points to new members upon enrollment</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input id="welcomePoints" type="number" defaultValue="100" className="w-20" />
                  <span>points</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t mt-6">
              <h4 className="font-medium mb-4">Enrollment Form Customization</h4>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="programName">Program Name</Label>
                  <Input id="programName" defaultValue="VIP Rewards" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="programDescription">Program Description</Label>
                  <Textarea
                    id="programDescription"
                    className="min-h-[100px]"
                    defaultValue="Join our VIP Rewards program to earn points on every purchase and unlock exclusive benefits."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="termsConditions">Terms & Conditions</Label>
                  <Textarea
                    id="termsConditions"
                    className="min-h-[100px]"
                    defaultValue="By joining our loyalty program, you agree to receive marketing communications. Points cannot be transferred or redeemed for cash."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showBenefits">Show Benefits on Enrollment</Label>
                    <p className="text-xs text-gray-500">Display tier benefits on the enrollment form</p>
                  </div>
                  <Switch id="showBenefits" defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
