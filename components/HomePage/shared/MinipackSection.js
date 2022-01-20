import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from 'swiper';
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
SwiperCore.use([Pagination, Navigation]);
import Image from 'next/image'
import Decoder1 from '../../../public/png/decoder/Decoder_1new.png'
import Decoder2 from '../../../public/png/decoder/Decoder_2.png'
import Decoder3 from '../../../public/png/decoder/Decoder_3.png'
import Decoder4 from '../../../public/png/decoder/Decoder_4.png'
import Alert from "../../../pages/shared/alert/Alert";
import * as React from 'react'
import router from "next/router";
import config from '../../../utils/config'
import Cookies from "js-cookie";

export default function MinipackSection() {
    const [open, setOpen] = React.useState(false);
    const auth = Cookies.get('auth')

    const closeModal = (data) => {
        setOpen(data);
    };

    const handleOpen = () => {
        const status = config.minipackOpen
        if (status) {
            if (typeof auth !== 'undefined') {
                router.push('/pembelian-box')
            }else{
                router.push('/login')
            }
        } else {
            setOpen(true)
        }
    }

    return (
        <>
            {open && <Alert type={1} title={'Coming Soon'} message={''} close={closeModal} />}

            <div className="flex justify-center">
                <div className="w-full mt-24 py-40 gap-x-6 px-8 lg:px-56 bg-white">
                    <div className="flex flex-col-reverse lg:flex-row">
                        <div className="w-full lg:w-1/2 lg:block">
                            <p className="font-nunito font-bold text-4xl text-center px-8 mt-12 lg:mt-0 lg:px-0 lg:text-left">Beli Android Box Xstream</p>
                            <p className="text-lg lg:pr-20 mt-8 text-center px-8 lg:px-0 lg:text-left">Ubah TV biasa menjadi Smart TV dengan Android Box Xstream dan Xstream Seru. Dengan kapasitas up to 16GB dan gambar jernih up to 4K.
                            </p>
                            <div className="flex">
                                <div className="mx-auto lg:mx-0 mt-9 flex cursor-pointer" onClick={handleOpen}>
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
                        <div className="w-full lg:w-1/2">
                            <Swiper
                                navigation={false}
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
                                {/* <SwiperSlide>
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
                                </SwiperSlide> */}

                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}