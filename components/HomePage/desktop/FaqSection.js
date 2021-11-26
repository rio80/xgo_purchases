import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from 'swiper';
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
SwiperCore.use([Pagination, Navigation]);
import Image from 'next/image'
import Faq from '../../../public/png/faq.png'
import * as React from 'react'

export default function FaqSection() {
    const headFaq = [
        {
            title: 'Bagaimana Cara Aktivasi Xstream Box Saya?'
        },
        {
            title: 'Bagaimana Cara Membeli Minipack?'
        },
        {
            title: 'Bagaimana Cara Aktivasi Minipack?'
        }
    ]

    const contentFaq = [
        {
            content: `
                <li> Untuk mengaktifkan Xstream Box Anda, silakan klik Layanan Aktivasi Xstream Box Anda.</li>
                <li> Masukkan voucher aktivasi yang didapatkan lewat email atau sms (jika pembelian melalui agent silahkan ditanyakan ke agent nya) dan verifikasi password anda, kemudian Klik Aktivasi.</li>
                <li> Tunggu beberapa saat. Lalu silahkan kembali ke halaman Aktivasi Xstream Box, dan dapatkan pesan Aktivasi Xstream Box.</li>
                <li> Selamat aktivasi Xstream Box anda sudah selsai.</li>
                <li> Gunakan email dan password anda untuk Login di Xstream Box anda.</li>
                <li> Selesai.</li>
            `
        }, {
            content: `
                <li>Buka Menu Layanan - Beli Minipack</li>
                <li>Pilih Minipack yang anda inginkan (Bisa lebih dari 1 pilihan Minipack)</li>
                <li>Klik tombol Beli</li>
                <li>Masukkan Captcha</li>
                <li>Klik Beli Sekarang</li>
                <li>Akan muncul Kode Bayar, silahkan melakukan pembayaran</li>
                <li>Jika sudah melakukan pembayaran, silahkan Cek Email atau Buka Menu My Voucher List untuk melihat Voucher sudah anda beli</li>
                <li>Lakukan Aktivasi (Baca: Panduan Aktivasi Minipack)</li>
            `
        }, {
            content: `
            <li>Pastikan anda sudah mengaktifkan XStream Box terlebih dahulu</li>
            <li>Jika XStream Box sudah aktif, silahkan klik menu Aktivasi Minipack.</li>
            <li>Masukkan Voucher yang sudah didapatkan melalui Email / SMS atau anda dapat Klik Menu My Voucher List untuk melihat Kode Voucher yang sudah anda beli, lalu klik tombol Klaim</li>
            <li>Jika muncul alert "silahkan ganti nomor telepon terlebih dahulu", silahkan klik tombol Update Profile lalu klik tombol "Ganti Nomor Hp". Setelah itu lakukan Aktivasi Minipack kembali.</li>
            <li>Jika muncul alert "aktivasi gagal. Product anda masih aktif", artinya Minipack eksisting anda masih tersedia. Silahkan lihat detail nya pada Menu Akun Info dan lakukan aktivasi setelah Minipack tersebut habis</li>
            <li>Jika sudah sukses, berarti Aktivasi Voucher Minipack telah berhasil</li>
            `
        }
    ]

    const [idxcontent, setIdxcontent] = React.useState('')

    const select = (idx) => {
        if (idxcontent === idx) {
            setIdxcontent('')
        } else {
            setIdxcontent(idx)
        }
    }

    return (
        <div className="flex justify-center" id="FAQ">
            <div className="w-full py-40 gap-x-6 px-56 bg-white">
                <div className="flex flex-row gap-x-20">
                    <div className="w-1/2">
                        <p className="font-nunito font-bold text-4xl">FAQ</p>
                        <dl class="mt-6 space-y-6 divide-y divide-gray-200">
                            {headFaq.map((data, idx) => (
                                <div class="pt-6" onClick={() => select(idx)}>
                                    <dt class="text-lg">
                                        <button type="button" class="text-left w-full flex justify-between items-start text-gray-400" aria-controls="faq-0" aria-expanded="false">
                                            <span class="font-medium text-gray-900">
                                                {data.title}
                                            </span>
                                            <span class="ml-6 h-7 flex items-center">
                                                <svg class="rotate-0 h-6 w-6 transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </button>
                                    </dt>
                                    {idxcontent !== '' && idx === idxcontent ? (
                                        <dd className="mt-2 pr-12" id="faq-0">
                                            <ol className="list-decimal pl-4" dangerouslySetInnerHTML={{ __html: contentFaq[idxcontent].content }}>
                                            </ol>
                                        </dd>
                                    ) : (
                                        ''
                                    )}

                                </div>
                            ))}

                            {/* <div class="pt-6">
                                <dt class="text-lg">
                                    <button type="button" class="text-left w-full flex justify-between items-start text-gray-400" aria-controls="faq-0" aria-expanded="false">
                                        <span class="font-medium text-gray-900">
                                            Bagaimana Cara Membeli Minipack
                                        </span>
                                        <span class="ml-6 h-7 flex items-center">
                                            <svg class="rotate-0 h-6 w-6 transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </button>
                                </dt>
                                <dd class="mt-2 pr-12" id="faq-0">
                                    <p class="text-base text-gray-500">
                                        I don&#039;t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.
                                    </p>
                                </dd>
                            </div>
                            <div class="pt-6">
                                <dt class="text-lg">
                                    <button type="button" class="text-left w-full flex justify-between items-start text-gray-400" aria-controls="faq-0" aria-expanded="false">
                                        <span class="font-medium text-gray-900">
                                            Bagaimana Cara Aktivasi Minipack
                                        </span>
                                        <span class="ml-6 h-7 flex items-center">
                                            <svg class="rotate-0 h-6 w-6 transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </button>
                                </dt>
                                <dd class="mt-2 pr-12" id="faq-0">
                                    <p class="text-base text-gray-500">
                                        I don&#039;t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.
                                    </p>
                                </dd>
                            </div> */}
                        </dl>
                    </div>
                    <div className="w-1/2">
                        <Image
                            src={Faq}
                            alt="faq"
                            priority
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}