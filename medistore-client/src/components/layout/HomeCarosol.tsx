"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import banner1 from "../../../public/banner1.jpg"
import banner2 from "../../../public/banner2.jpg"
import banner3 from "../../../public/banner3.webp"

const banners = [banner1, banner2, banner3]

export function HomeCarouselSpacing() {
  return (
    <div className="space-y-6"> 
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 3000 })]}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {banners.map((banner, index) => (
            <CarouselItem key={index} className="pl-1 basis-full">
              <div className="relative aspect-[16/6] w-full overflow-hidden rounded-2xl border bg-muted">
                <Image
                  src={banner}
                  alt={`Banner ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex items-center justify-center gap-4 mt-6">
          <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-full border-2 border-primary/20 hover:border-primary hover:bg-primary/10 transition-all" />

          <div className="h-1 w-12 bg-primary/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/3 animate-pulse"></div>
          </div>

          <CarouselNext className="static translate-y-0 h-10 w-10 rounded-full border-2 border-primary/20 hover:border-primary hover:bg-primary/10 transition-all" />
        </div>
      </Carousel>
    </div>
  )
}
