"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const carouselItems = [
  {
    id: 1,
    title: "Premium Headphones",
    description: "Experience crystal clear sound with our premium noise-cancelling headphones",
    image: "/vibrant-headphones.png",
    cta: "Shop Now",
    link: "/products/headphones",
  },
  {
    id: 2,
    title: "Smart Watches",
    description: "Stay connected and track your fitness with our latest smartwatch collection",
    image: "/smartwatch-app-display.png",
    cta: "Explore Collection",
    link: "/products/watches",
  },
  {
    id: 3,
    title: "Wireless Earbuds",
    description: "Immerse yourself in music with our comfortable wireless earbuds",
    image: "/sleek-wireless-audio.png",
    cta: "View Details",
    link: "/products/earbuds",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative pt-16 md:pt-20 overflow-hidden">
      <div className="relative h-[60vh] min-h-[400px] md:min-h-[500px] lg:min-h-[600px] w-full">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 z-10" />
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              priority={index === 0}
              className="object-cover"
            />

            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-lg">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{item.title}</h1>
                  <p className="text-lg md:text-xl text-white/90 mb-8">{item.description}</p>
                  <a
                    href={item.link}
                    className="inline-block px-8 py-4 rounded-full bg-white text-gray-900 font-medium text-lg transition-transform hover:scale-105 shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.1)] hover:shadow-[7px_7px_15px_rgba(0,0,0,0.1),-7px_-7px_15px_rgba(255,255,255,0.1)] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.5)]"
                  >
                    {item.cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.1)] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.1)] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
