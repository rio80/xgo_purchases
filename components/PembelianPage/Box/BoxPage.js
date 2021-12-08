import * as React from 'react'
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
import ComboBox from "../../shared/ComboBox/ComboBox";
import AlamatPage from "./Alamat/Alamat";
import VoucherBoxPage from './VoucherBox/VoucherBox';

export default function BoxPage() {

    return (
        <div className="flex w-full mt-40 gap-x-12">
            <div className="w-1/2 relative flex justify-end">
                <div className="w-1/3 ml-auto fixed">
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
            <div className="w-1/2">
                <div className="w-96">
                    <p className="font-nunito font-extrabold text-lg">Produk</p>
                    <div>
                        <ComboBox placeholder={'Pilih Produk'} />
                    </div>
                    <div className="flex justify-between mt-10">
                        <div className="font-semibold">
                            Jumlah
                        </div>
                        <div className="flex flex-row gap-x-4">
                            <div class="border-gray-400 border-2 bg-white rounded-full h-8 w-8 flex items-center justify-center font-semibold">-</div>
                            <p className="font-bold text-xl">1</p>
                            <div class="border-gray-400 border-2 bg-white rounded-full h-8 w-8 flex items-center justify-center font-semibold">+</div>
                        </div>
                    </div>
                    <div>
                        <AlamatPage />
                    </div>
                    <div>
                        <div>
                            <p className="font-nunito font-extrabold text-lg mt-12">Pengiriman</p>
                            <ComboBox search={false} placeholder={'Pilih Kurir'} />
                        </div>
                        <div className="mt-5">
                            <ComboBox search={false} placeholder={'Pilih Layanan'} />
                        </div>
                    </div>
                    <div>
                        <p className="font-nunito font-extrabold text-lg mt-12">Voucher Minipack</p>
                        <p className="font-semibold text-sm mt-3.5 text-gray-500">Pilih Voucher (Opsional)</p>
                        <div className="mt-2 mb-24">
                            <VoucherBoxPage />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

