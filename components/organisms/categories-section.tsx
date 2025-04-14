import { Headphones, Watch, Smartphone, Laptop, Camera, Gamepad, Tv, Tablet } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Audio",
    icon: Headphones,
    link: "/categories/audio",
  },
  {
    id: 2,
    name: "Wearables",
    icon: Watch,
    link: "/categories/wearables",
  },
  {
    id: 3,
    name: "Smartphones",
    icon: Smartphone,
    link: "/categories/smartphones",
  },
  {
    id: 4,
    name: "Laptops",
    icon: Laptop,
    link: "/categories/laptops",
  },
  {
    id: 5,
    name: "Cameras",
    icon: Camera,
    link: "/categories/cameras",
  },
  {
    id: 6,
    name: "Gaming",
    icon: Gamepad,
    link: "/categories/gaming",
  },
  {
    id: 7,
    name: "TVs",
    icon: Tv,
    link: "/categories/tvs",
  },
  {
    id: 8,
    name: "Tablets",
    icon: Tablet,
    link: "/categories/tablets",
  },
]

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Shop by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse our wide range of tech products organized by categories to find exactly what you need.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-700 transition-all hover:translate-y-[-5px] shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.05)] hover:shadow-[7px_7px_15px_rgba(0,0,0,0.05),-7px_-7px_15px_rgba(255,255,255,0.8)] dark:hover:shadow-[7px_7px_15px_rgba(0,0,0,0.2),-7px_-7px_15px_rgba(255,255,255,0.05)]"
            >
              <div className="p-3 mb-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]">
                <category.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
