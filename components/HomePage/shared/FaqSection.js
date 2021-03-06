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
        },
        {
            title: 'Jika terjadi kendala saya harus kemana?'
        }
    ]

    const contentFaq = [
        {
            content: `
                <li> Untuk mengaktifkan Xstream Box Anda, silahkan login dahulu di https://xgo.transvision.co.id/</li>
                <li> Masukkan password dan voucher aktivasi yang didapatkan lewat email atau sms (jika pembelian melalui agent silahkan ditanyakan ke agentnya) kemudian Klik Aktivasi.</li>
                <li> Tunggu beberapa saat. Lalu silahkan kembali ke halaman Aktivasi Xstream Box, dan dapatkan pesan Aktivasi Xstream Box.</li>
                <li> Selamat aktivasi Xstream Box anda sudah selesai.</li>
                <li> Gunakan email dan password anda untuk Login di Xstream Box anda.</li>
                <li> Selesai.</li>
            `
        }, {
            content: `
                <li>Pastikan Paket Berlangganan Xstream anda Aktif, kemudian silahkan login dahulu di https://xgo.transvision.co.id/</li>
                <li>Pilih Tab Produk - Paket Berlangganan Xstream </li>
                <li>Pilih paket yang diinginkan - Pilih periode  durasi dari paket tersebut</li>
                <li>Klik "Saya menyetujui Syarat dan Ketentuan"</li>
                <li>Langsung aktifkan paket (Opsional)</li>
                <li>Lanjut ke Pembayaran</li>
                <li>Pilih metode bayar</li>
                <li>Lakukan pembayaran</li>
                <li>Selesai.</li>
            `
        }, {
            content: `
            <li>Pastikan Paket Berlangganan Xstream anda Aktif, kemudian silahkan login silahkan login dahulu di https://xgo.transvision.co.id/</li>
            <li>Pilih Tab Produk - Klik Berlangganan pada bagian Paket Berlangganan Xstream. </li>
            <li>Pilih dan klik ???Aktivasi Disini???</li>
            <li>Masukkan kode voucher yang anda miliki.</li>
            <li>Klik Aktivasi.</li>
            <li>Selesai.</li>
            `
        }, {
            content: `
            <ol>Untuk informasi dan penanganan kendala bisa menghubungi whatsapp 082308235810 atau email ke care@transvision.co.id</ol>
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
            <div className="w-full py-40 gap-x-6 px-11 lg:px-56 bg-white">
                <div className="flex flex-col gap-x-20 lg:flex-row">
                    <div className="w-full lg:w-1/2 lg:block">
                        <p className="font-nunito font-bold text-4xl text-center">FAQ</p>
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
                        </dl>
                    </div>
                    <div className="w-full lg:w-1/2 lg:block">
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