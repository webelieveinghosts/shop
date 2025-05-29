"use client"

import { ChevronLeft, ChevronRight, LinkIcon, LucideIcon, MarsIcon, SmileIcon, VenusIcon, VolleyballIcon } from "lucide-react"
import Slider from "react-slick"

const sliderSettings = {
    className: "relative",
    dots: false,
    autoplay: false,
    infinite: true,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: <div><button className="w-7 h-7 text-white flex items-center justify-center bg-primary absolute transition duration-300 hover:bg-primary-hover hover:text-white focus:outline-none transform ltr:shadow-navigation ltr:-translate-x-1/2 rtl:shadow-navigationReverse rtl:translate-x-1/2 rounded-full text-sm md:text-base lg:text-xl 3xl:text-2xl ltr:left-0 rtl:right-0 cursor-pointer z-10"><ChevronLeft /></button></div>,
    nextArrow: <div><button className="w-7 h-7 text-white flex items-center justify-center bg-primary absolute transition duration-300 hover:bg-primary-hover hover:text-white focus:outline-none transform ltr:shadow-navigation ltr:translate-x-1/2 rtl:shadow-navigationReverse rtl:-translate-x-1/2 rounded-full text-sm md:text-base lg:text-xl 3xl:text-2xl ltr:right-0 rtl:left-0 cursor-pointer z-10"><ChevronRight /></button></div>,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }
    ]
}

export const CategoriesList = () => {
    return (
        <div className="px-4">
            <div className="flex items-center justify-between -mt-2 pb-0.5 mb-3">
                <h3 className="font-bold uppercase">Categories</h3>
            </div>

            <Slider
                {...sliderSettings}
            >
                <Category name="Woman" icon={VenusIcon} />
                <Category name="Man" icon={MarsIcon} />
                <Category name="Kids" icon={SmileIcon} />
                <Category name="Sports" icon={VolleyballIcon} />
                <Category name="Sports" icon={VolleyballIcon} />
            </Slider>
        </div>
    )
}

const Category = ({ name, icon: Icon }: { name: string, icon: LucideIcon }) => {
    return (
        <div className="relative group flex justify-center rounded-md flex-col h-28 sm:h-[8.5rem] md:h-40 xl:h-[11.5rem] 2xl:h-44 3xl:h-60 bg-gray-100 cursor-pointer" onClick={() => document.open(`/category/${name}`)}>
            <div className="relative flex items-center mb-3.5 md:mb-4 lg:mb-5 xl:mb-2 2xl:mb-6 3xl:mb-8 lg:h-24 mx-auto">
                <Icon size={130} className="mx-auto mb-4 sm:mb-6 w-2/4 sm:w-2/3 md:w-8/12 3xl:w-full" strokeWidth={0.8} />
            </div>

            <div className="flex flex-col">
                <h4 className="text-heading text-sm md:text-base xl:text-lg capitalize absolute text-center bottom-4 sm:bottom-5 md:bottom-6 xl:bottom-8 inset-x-0">{name}</h4>
            </div>
            <div className="absolute top-0 left-0 bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-30 rounded-lg" />
            <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center rounded-lg">
                <LinkIcon size={30} className="text-white text-base sm:text-xl lg:text-2xl xl:text-3xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" strokeWidth={3} />
            </div>
        </div>
    )
}