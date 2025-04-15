"use client";

import { useState } from "react";
import { Star, Truck, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: "Reviews" },
    { id: "shipping", label: "Shipping & Returns" },
  ];

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden",
        "backdrop-blur-md bg-white/40 dark:bg-black/40",
        "border border-white/20 dark:border-gray-800/50",
        "shadow-lg"
      )}
    >
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 dark:border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "px-6 py-4 text-sm font-medium whitespace-nowrap",
              "transition-colors duration-200",
              activeTab === tab.id
                ? "border-b-2 border-gray-900 dark:border-gray-300 text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            )}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
            id={`tab-${tab.id}`}
            aria-controls={`panel-${tab.id}`}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Description Tab */}
        <div
          role="tabpanel"
          id={`panel-description`}
          aria-labelledby={`tab-description`}
          hidden={activeTab !== "description"}
          className={cn(activeTab === "description" ? "block" : "hidden")}
        >
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="mb-4">{product.description}</p>
          </div>
        </div>

        {/* Specifications Tab */}
        <div
          role="tabpanel"
          id={`panel-specifications`}
          aria-labelledby={`tab-specifications`}
          hidden={activeTab !== "specifications"}
          className={cn(activeTab === "specifications" ? "block" : "hidden")}
        >
          <div className="grid grid-cols-1 md: grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Product Details</h3>
              <div className="space-y-3">
                {[
                  { label: "Material", value: "Premium quality materials" },
                  { label: "Dimensions", value: "Varies by size selection" },
                  { label: "Weight", value: "Lightweight construction" },
                  { label: "Origin", value: "Ethically manufactured" },
                  {
                    label: "Item Number",
                    value: `SKU-${product.id.toString().padStart(6, "0")}`,
                  },
                ].map((spec, index) => (
                  <div
                    key={index}
                    className="flex border-b border-gray-200 dark:border-gray-800 pb-2"
                  >
                    <span className="w-1/3 text-sm text-gray-500 dark:text-gray-400">
                      {spec.label}
                    </span>
                    <span className="w-2/3 text-sm text-gray-900 dark:text-gray-100">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Care Instructions</h3>
              <div className="space-y-3">
                {[
                  {
                    label: "Cleaning",
                    value: "Follow care label instructions",
                  },
                  { label: "Storage", value: "Store in a cool, dry place" },
                  {
                    label: "Maintenance",
                    value: "Regular care ensures longevity",
                  },
                ].map((spec, index) => (
                  <div
                    key={index}
                    className="flex border-b border-gray-200 dark:border-gray-800 pb-2"
                  >
                    <span className="w-1/3 text-sm text-gray-500 dark:text-gray-400">
                      {spec.label}
                    </span>
                    <span className="w-2/3 text-sm text-gray-900 dark:text-gray-100">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-medium mt-6 mb-4">
                Package Contents
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• 1 x {product.name}</li>
                <li>• Care instructions card</li>
                <li>• Authenticity certificate</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Tab */}
        <div
          role="tabpanel"
          id={`panel-reviews`}
          aria-labelledby={`tab-reviews`}
          hidden={activeTab !== "reviews"}
          className={cn(activeTab === "reviews" ? "block" : "hidden")}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Rating Summary */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-center p-6 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                  {product.rating?.toFixed(1)}
                </h3>
                <div className="flex mt-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.round(product.rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300 dark:text-gray-600"
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Based on {product.reviewCount} reviews
                </p>

                {/* Rating Breakdown */}
                <div className="w-full mt-6 space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    // Generate random percentage for each rating
                    const percentage =
                      rating === 5
                        ? 65
                        : rating === 4
                        ? 20
                        : rating === 3
                        ? 10
                        : rating === 2
                        ? 3
                        : 2;

                    return (
                      <div key={rating} className="flex items-center">
                        <div className="flex items-center w-12">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {rating}
                          </span>
                          <Star className="h-3 w-3 ml-1 text-amber-400 fill-amber-400" />
                        </div>
                        <div className="w-full h-2 mx-2 rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-2 rounded-full bg-amber-400"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 w-9">
                          {percentage}%
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button className="mt-6 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
                  Write a Review
                </button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="md:col-span-2 space-y-6">
              {/* Generate some sample reviews */}
              {[
                {
                  name: "Alex Johnson",
                  date: "2 months ago",
                  rating: 5,
                  title: "Exceptional quality and design",
                  content:
                    "I'm extremely impressed with this product. The quality exceeds my expectations and the design is both elegant and functional. Definitely worth the investment.",
                },
                {
                  name: "Sam Taylor",
                  date: "3 months ago",
                  rating: 4,
                  title: "Great product with minor issues",
                  content:
                    "Overall, I'm very satisfied with my purchase. The product is well-made and looks great. The only reason I'm not giving 5 stars is because of the slight delay in shipping.",
                },
                {
                  name: "Jordan Lee",
                  date: "4 months ago",
                  rating: 5,
                  title: "Absolutely love it!",
                  content:
                    "This is exactly what I was looking for. The attention to detail is remarkable and it fits perfectly with my style. I've already received numerous compliments!",
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {review.name}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {review.date}
                    </span>
                  </div>

                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < review.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300 dark:text-gray-600"
                        )}
                      />
                    ))}
                  </div>

                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                    {review.title}
                  </h5>

                  <p className="text-gray-600 dark:text-gray-300">
                    {review.content}
                  </p>
                </div>
              ))}

              <div className="flex justify-center">
                <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                  Load More Reviews
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Tab */}
        <div
          role="tabpanel"
          id={`panel-shipping`}
          aria-labelledby={`tab-shipping`}
          hidden={activeTab !== "shipping"}
          className={cn(activeTab === "shipping" ? "block" : "hidden")}
        >
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Shipping Information
                </h3>
                <div className="mt-4 space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    We offer the following shipping options for your
                    convenience:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-600 dark:bg-gray-400 mt-1.5 mr-2"></span>
                      <span>
                        <strong>Standard Shipping (3-5 business days):</strong>{" "}
                        Free on orders over $50, $4.99 for orders under $50
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-600 dark:bg-gray-400 mt-1.5 mr-2"></span>
                      <span>
                        <strong>Express Shipping (1-2 business days):</strong>{" "}
                        $9.99
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-600 dark:bg-gray-400 mt-1.5 mr-2"></span>
                      <span>
                        <strong>Next Day Delivery:</strong> $14.99 (order must
                        be placed before 2pm)
                      </span>
                    </li>
                  </ul>
                  <p>
                    Please note that shipping times are estimates and may vary
                    depending on your location. All orders are processed within
                    24 hours during business days.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Returns & Exchanges
                </h3>
                <div className="mt-4 space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    We want you to be completely satisfied with your purchase.
                    If for any reason you're not happy with your order, we offer
                    a hassle-free return and exchange policy:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-600 dark:bg-gray-400 mt-1.5 mr-2"></span>
                      <span>Returns accepted within 30 days of delivery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-600 dark:bg-gray-400 mt-1.5 mr-2"></span>
                      <span>
                        Items must be unused, unworn, and in original packaging
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-600 dark:bg-gray-400 mt-1.5 mr-2"></span>
                      <span>Return shipping is free for exchanges</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-600 dark:bg-gray-400 mt-1.5 mr-2"></span>
                      <span>
                        Refunds are processed within 5-7 business days after we
                        receive your return
                      </span>
                    </li>
                  </ul>
                  <p>
                    To initiate a return or exchange, please contact our
                    customer service team or visit your account page for more
                    information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
