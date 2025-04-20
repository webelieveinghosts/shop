import Slider from "react-slick"

// Import css files
import "@/styles/slick.css"

export const Header = () => {
    return (
        <section className="flex mx-auto max-w-screen-2xl px-4 max-h-[calc(100vh-76px)]">
            <div className="md:col-span-4 md:row-span-2 max-w-full">
                <Slider
                    dots={true}
                    customPaging={() => (
                        <a className="">
                            <span className="mx-0.5 h-1 w-4 block cursor-pointer transition-all"></span>
                        </a>
                    )}
                    dotsClass="w-full slick-dots h-max absolute justify-center bottom-3"
                    autoplay={true}
                    infinite={true}
                    arrows={false}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                >
                    <a className="relative block aspect-square h-full w-full" href="#">
                        <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-gray-400 hover:border-primary">
                            <img alt="Acme Circles T-Shirt" decoding="async" className="relative h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105" src="/image/slide/image.png" />
                        </div>
                    </a>

                    <a className="relative block aspect-square h-full w-full" href="#">
                        <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-gray-400 hover:border-primary">
                            <img alt="Acme Circles T-Shirt" decoding="async" className="relative h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105" src="/image/slide/image-2.png" />
                        </div>
                    </a>
                </Slider>
            </div>
        </section >
    )
}