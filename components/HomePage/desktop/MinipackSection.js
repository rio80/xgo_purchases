import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from 'swiper';
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
SwiperCore.use([Pagination, Navigation]);
import Image from 'next/image'
import Decoder1 from '../../../public/png/decoder/Decoder_1.png'
import Decoder2 from '../../../public/png/decoder/Decoder_2.png'
import Decoder3 from '../../../public/png/decoder/Decoder_3.png'
import Decoder4 from '../../../public/png/decoder/Decoder_4.png'

export default function MinipackSection() {
    return (
        <div className="flex justify-center">
            <div className="w-full mt-24 py-40 gap-x-6 px-56 bg-white">
                <div className="flex flex-row">
                    <div className="w-1/2">
                        <p className="font-nunito font-bold text-4xl">Beli Xstream Seru!</p>
                        <p className="text-lg pr-20 mt-8">Ubah TV biasa menjadi Smart TV dengan OTT Box
                            Xstream Seru. Dengan kapasitas lebih besar 16GB
                            dan gambar jernih up to 4K.
                        </p>
                        <div className="flex">
                            <div className="mt-9 flex cursor-pointer" onClick={() => router.push('/login')}>
                                <div style={{ color: '#0285e4' }}>
                                    <p className="self-center font-semibold text-xl">Beli Sekarang </p>
                                </div>

                                <div className="flex flex-wrap content-center ml-3.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mt-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ color: '#0285e4' }}>
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <Swiper
                            navigation={true}
                            className="mySwiper"
                            pagination={{
                                "dynamicBullets": true
                            }}
                            loop={true}
                            loopFillGroupWithBlank={true}
                        >
                            <SwiperSlide>
                                <div className="w-full flex justify-center">
                                    <div className="bg-white w-full rounded-lg px-12 pb-6 flex justify-center">
                                        <Image
                                            src={Decoder1}
                                            alt="decoder1"
                                            priority
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="w-full flex justify-center">
                                    <div className="bg-white w-full rounded-lg px-12 pb-6 flex justify-center">
                                        <Image
                                            src={Decoder2}
                                            alt="decoder2"
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="w-full flex justify-center">
                                    <div className="bg-white w-full rounded-lg px-12 pb-6 flex justify-center">
                                        <Image
                                            src={Decoder3}
                                            alt="decoder3"
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="w-full flex justify-center">
                                    <div className="bg-white w-full rounded-lg px-12 pb-6 flex justify-center">
                                        <Image
                                            src={Decoder4}
                                            alt="decoder4"
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>

                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}