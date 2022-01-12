import * as React from 'react'
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { postRegister } from '../../../utils/apiHandlers';
import Cookies from 'js-cookie';
import Alert from '../../../pages/shared/alert/Alert';
import Loader from 'react-loader-spinner';
import { Dialog, Popover, Transition } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function RegisterPage() {
    const router = useRouter()
    const [Password, setPassword] = React.useState(false);
    const [load, setLoad] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const CryptoJS = require("crypto-js");
    const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
    const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
    const [error, setError] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [openModal, setOpenModal] = React.useState(true)

    const handleRegister = async (handleSubmit) => {
        setLoad(true)
        const newState = { ...handleSubmit }
        const name = handleSubmit.email.split('@')[0]
        const encrypted = CryptoJS.AES.encrypt(handleSubmit.password, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString();
        newState.password = encrypted
        newState.phone_number = phone
        newState.name = name

        try {
            const register = await postRegister(newState)
            if (register.data.status) {
                setLoad(false);
                setSuccess(true)
                setMessage('Kami telah mengirimkan email verifikasi ke : '+handleSubmit.email+'. Klik tautan untuk menyelesaikan pendaftaran')
            }
        } catch (e) {
            setError(true)
            setMessage(e?.res?.data?.message?.[0])
            setLoad(false);
        }
    };

    const closeModal = (data) => {
        setOpen(data);
        setError(data);
    };

    const handlePhone = (e) => {
        e.target.validity.valid && setPhone(e.target.value)
    }

    function Tnc() {
        return (
            <Transition.Root show={openModal} as={React.Fragment}>
                <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto" onClose={setOpenModal}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div className='max-h-96 overflow-auto'>
                                    <div className="mt-3 text-left sm:mt-5">
                                        <div className="mt-2 pr-1">
                                            <p className="text-sm text-gray-500 font-semibold">A. KETENTUAN UMUM </p>
                                            <p className="text-sm text-gray-500 text-justify font-semibold">Ketentuan Umum di bawah ini (“Ketentuan Umum”) harus dibaca sebelum pembeli maupun pengguna ("Anda") menggunakan Platform Layanan ini. Penggunaan Platform Layanan ini menunjukkan penerimaan, persetujuan dan kepatuhan Anda terhadap Ketentuan Umum ini beserta Kebijakan Privasi dan setiap dokumen lainnya yang terkait. </p>
                                            <ol className='text-sm text-gray-500 list-decimal pl-6'>
                                                <li className='font-semibold my-2'>Umum</li>
                                                <ol>
                                                    <li className='my-2 text-justify'>a. PT Indonusa Telemedia (“Kami” atau “Perusahaan” atau “Transvision”), suatu perseroan terbatas yang didirikan berdasarkan hukum Negara Republik Indonesia, berkedudukan di Jakarta Selatan, dengan alamat kantor yang terdaftar di Menara Mega Syariah, Lantai 15, Jl. H.R. Rasuna Said Kav. 19A, Kuningan Timur, Setiabudi, Jakarta 12950, Indonesia, yang dalam hal ini merupakan pemilik, operator dan penyelenggara platform Transvision XSTREAM yang menyediakan layanan konten Over the Top (OTT) melalui perangkat Smart Android Box XSTREAM (Xstream Box), mobile apps XSTREAM pada platform Android dan iOS (“Mobile Apps XSTREAM”), Android TV Apps XSTREAM (“Android TV Apps XSTREAM”) dan berbagai akses, media, perangkat dan platform lainnya, baik yang sudah atau akan tersedia di kemudian hari (selanjutnya secara sendiri-sendiri maupun bersama-sama disebut sebagai “Platform Layanan”). Platform Layanan ini terdiri dari Layanan (sebagaimana dijelaskan di bawah ini) dan setiap bagian yang ada di dalam Platform Layanan (di luar Layanan), termasuk namun tidak terbatas pada konten, fitur, foto, gambar, audio, video, teks, source code, dan seluruh teknologi yang melekat kepadanya. </li>
                                                    <li className='my-2 text-justify'>b. Platform Layanan hanya dapat diakses di wilayah Negara Republik Indonesia. </li>
                                                    <li className='my-2 text-justify'>c. Akses terhadap Konten pada XSTREAM Box, Mobile Apps XSTREAM, dan Android TV Apps XSTREAM tersedia secara berbayar. Untuk itu, Anda memerlukan jaringan internet dan kuota paket data yang cukup, yang memungkinkan Anda untuk melakukan pembayaran dan dikenakan pemotongan atas pulsa atau kuota paket data yang Anda miliki sehubungan dengan penggunaan atas jaringan internet dan kuota tersebut yang nilainya ditagihkan/dibebankan oleh masing-masing penyedia layanan jasa telekomunikasi yang Anda pergunakan sesuai dengan ketentuan yang ditetapkan oleh masing-masing penyedia layanan jasa telekomunikasi tersebut. Kami tidak bertanggung jawab atas pemotongan pulsa dan/ atau kuota paket data yang Anda miliki sehubungan dengan penggunaan atas jaringan internet dan kuota dalam mengunduh ataupun mengakses Layanan jika Anda tidak memiliki perangkat atau device yang sesuai atau jika Anda telah mengunduh versi yang salah atau tidak kompatibel untuk perangkat atau device Anda.</li>
                                                    <li className='my-2 text-justify'>d. Dengan mengakses dan menggunakan Platform Layanan, maka Anda menyatakan telah membaca, memahami, menyetujui dan menyatakan patuh terhadap Ketentuan Umum ini dan Kebijakan Privasi. Jika Anda tidak dapat menyetujui Ketentuan Umum ini dan Kebijakan Privasi, baik secara keseluruhan ataupun sebagian, maka Anda tidak diperbolehkan untuk mengakses Platform Layanan ini ataupun menggunakan Layanan yang tersedia. Dengan demikian, Ketentuan Umum ini dan Kebijakan Privasi merupakan perjanjian yang mengikat antara Anda dengan Kami sesuai dengan peraturan perundang-undangan yang berlaku.</li>
                                                    <li className='my-2 text-justify'>e. Anda dengan ini menyatakan dan menjamin bahwa Anda adalah orang yang berhak dan cakap untuk mengadakan perjanjian yang mengikat berdasarkan hukum yang berlaku di wilayah Negara Republik Indonesia sehubungan dengan penggunaan Platform Layanan termasuk namun tidak terbatas pada telah berumur 18 (delapan belas) tahun atau lebih, hal mana tidak perlu dibuktikan lebih lanjut oleh Kami. Jika tidak, maka Kami berhak untuk sewaktu-waktu memblokir Akun Anda maupun menghentikan seluruh Layanan yang Anda gunakan. </li>
                                                    <li className='my-2 text-justify'>f. Ketentuan Umum ini dibuat dalam versi Bahasa Indonesia dan Bahasa Inggris, sehingga terdapat kemungkinan adanya perbedaan pengertian dan/atau penafsiran beberapa teks dalam kedua versi tersebut. Dalam hal terdapat perbedaan sebagaimana dimaksud, maka versi Bahasa Indonesia yang akan berlaku dan mengikat. </li>
                                                </ol>
                                                <li className='font-semibold'>Perubahan</li>
                                                <ol>
                                                    <li className='my-2 text-justify'>a. Harap diketahui bahwa Kami dapat mengubah, memodifikasi, menambah, menghapus dan/ atau mengoreksi (“Perubahan”) Ketentuan Umum ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Untuk itu, Anda dianjurkan untuk membaca dan mempelajari Ketentuan Umum ini secara berkala agar dapat mengetahui adanya Perubahan tersebut. Dengan terus mengakses dan menggunakan Platform Layanan ini setelah Perubahan terhadap Ketentuan Umum ini, Anda sepakat dan menyetujui setiap Perubahan tersebut. </li>
                                                    <li className='my-2 text-justify'>b. Setiap Perubahan terhadap Ketentuan Umum ini berlaku menggantikan semua versi sebelumnya, terhitung sejak tanggal Perubahan diterbitkan. </li>
                                                    <li className='my-2 text-justify'>c. Versi final dari Ketentuan Umum ini akan ditampilkan di website resmi Transvision. </li>
                                                </ol>
                                                <li className='font-semibold'>LINGKUP LAYANAN </li>
                                                <ol>
                                                    <li className='my-2 text-justify'>a. Melalui Platform Layanan, Kami menyediakan layanan Paket Berlangganan Transvision XSTREAM; dan (ii) Paket Pembelian XSTREAM Box; (secara sendiri-sendiri maupun bersama-sama disebut “Layanan”). Anda dapat mempelajari ketentuan khusus pada masing-masing Layanan (“Ketentuan Khusus”) setelah bagian akhir Ketentuan Umum ini. </li>
                                                    <li className='my-2 text-justify'>b. Ketentuan Khusus tersebut merupakan satu kesatuan dan bagian yang tidak terpisahkan dari Ketentuan Umum ini. Apabila terdapat pertentangan di antara masing-masing Ketentuan Khusus dan Ketentuan Umum ini, maka ketentuan dalam Ketentuan Khusus yang akan berlaku dan mengikat. </li>
                                                    <li className='my-2 text-justify'>c. Beberapa definisi dan istilah yang digunakan pada Ketentuan Umum ini juga digunakan pada masing-masing Ketentuan Khusus, sepanjang tidak ditentukan sebaliknya. </li>
                                                    <li className='my-2 text-justify'>d. Anda dapat mengakses Layanan melalui Platform Layanan. Namun demikian, tidak seluruh Platform Layanan dapat digunakan dan diakses untuk memperoleh Layanan, melainkan Kami akan menunjuk dari waktu ke waktu, melalui Platform Layanan apa (media, perangkat atau platform apa) masing-masing Layanan dapat diakses oleh Anda.  </li>
                                                    <li className='my-2 text-justify'>e. Layanan Transvision XSTREAM merupakan satu kesatuan layanan TV Linear, Video-on-demand, dan fitur aplikasi Android dalam XSTREAM Box. Untuk dapat menikmati seluruh layanan dengan nyaman, Anda dapat berlangganan salah satu paket yang ada dalam Platform Layanan Transvision XSTREAM. </li>
                                                    <li className='my-2 text-justify'>f. Apabila Anda tidak mempunyai paket Layanan yang aktif di XSTREAM Box Anda, maka Kami akan memberikan informasi untuk melakukan pembelian paket Layanan yang akan ditampilkan di layar Anda. Informasi tersebut akan muncul terus menerus sampai Anda melakukan pembelian paket Layanan.  </li>
                                                </ol>
                                                <li className='font-semibold'>HARGA, PROMOSI, PROGRAM DAN HADIAH </li>
                                                <ol>
                                                    <li className='my-2 text-justify'>a. Anda menyadari bahwa Kami sebagai penyedia Layanan memiliki kewenangan untuk menetapkan harga atas setiap Layanan yang Kami sediakan dalam Platform Layanan. Untuk itu, dengan menggunakan Layanan berarti Anda setuju dengan harga yang Kami tetapkan. </li>
                                                    <li className='my-2 text-justify'>b. Kami dapat menawarkan harga yang lebih rendah dan/ atau promosi dari waktu ke waktu atas Layanan. Harap diketahui bahwa hal tersebut mungkin memerlukan ketentuan dan persyaratan yang berbeda, misalnya, sehubungan dengan kebijakan pemesanan dan pengembalian dana.</li>
                                                    <li className='my-2 text-justify'>c. Kami dapat sewaktu-waktu mengadakan suatu program, sayembara atau kegiatan lainnya melalui Platform Layanan (“Program Promosi”), baik yang berhubungan secara langsung maupun tidak langsung dengan Layanan yang Kami sediakan. Syarat dan ketentuan masing-masing Program Promosi akan Kami tentukan secara sendiri-sendiri maupun bersama-sama. </li>
                                                    <li className='my-2 text-justify'>d. Untuk setiap Program Promosi, Kami akan menentukan pemenang serta menyediakan hadiah atau sejenisnya bagi pemenang sesuai dengan kebijakan dari Kami sendiri. Pemenang Program Promosi mungkin akan dikenakan biaya atau pajak tertentu atas hadiah yang diperolehnya.  </li>
                                                    <li className='my-2 text-justify'>e. Dengan mengikuti Program Promosi, berarti Anda telah membaca, memahami dan setuju untuk mematuhi seluruh syarat dan ketentuan pada Program Promosi terkait.</li>
                                                </ol>
                                                <li className='font-semibold'>PENDAFTARAN AKUN ANDA </li>
                                                <ol>
                                                    <li className='my-2 text-justify'>a. Untuk tujuan pendaftaran akun Anda (“Akun Anda”), Kami akan mengumpulkan dan memproses informasi pribadi Anda, termasuk namun tidak terbatas pada nama, alamat surat elektronik (surel), dan nomor telepon genggam Anda pada saat Anda melakukan pendaftaran. Anda harus menyediakan informasi-informasi tersebut secara lengkap, akurat dan terkini. Anda dengan ini setuju untuk menyediakan kepada Kami bukti identitas diri yang mungkin Kami minta dengan alasan yang jelas. </li>
                                                    <li className='my-2 text-justify'>b. Dengan melakukan pendaftaran, maka Anda menyatakan telah: (i) Mengisi data dengan benar, lengkap, akurat dan terkini tentang diri Anda sesuai dengan yang Kami minta; (ii) Melakukan pembaruan/ update data jika terjadi perubahan data pribadi Anda untuk menjaga keakuratan dan kekinian data Anda; (iii) Menyetujui penggunaan dan pengelolaan data pribadi Anda oleh Kami, termasuk namun tidak terbatas pada pengungkapan kepada lembaga pemerintah dan instansi sepanjang diperlukan dan dilandasi oleh hukum dan ketentuan peraturan perundang-undangan yang berlaku, dan apabila menurut keyakinan Kami bahwa penggunaan Anda melanggar hukum dan ketentuan peraturan perundang-undangan yang berlaku; (iv) Melindungi hak-hak Kami sehubungan dengan hak kekayaan intelektual dan hak-hak lainnya yang melekat pada Kami sehubungan dengan Paket Berlangganan; (v) Mematuhi seluruh ketentuan hukum yang berlaku di wilayah Negara Republik Indonesia; dan (vi) Sebelum melakukan pendaftaran, Anda sudah memastikan ke Transvision Customer Support bahwa perangkat atau device (mobile phone, tab, dan sejenisnya) yang Anda gunakan kompatibel/ mendukung penggunaan Platform Layanan dan Layanan, dengan melakukan konfirmasi ke Transvision Customer Support melalui layanan call center 1500060 ; dan/ atau menghubungi Kami melalui surat elektronik pada care@transvision.co.id untuk selanjutnya memastikan bahwa Anda telah mendapatkan konfirmasi tertulis dari Kami terkait hal tersebut.</li>
                                                    <li className='my-2 text-justify'>c. Anda tidak dapat mengalihkan atau memindahkan Akun Anda kepada pihak lain manapun dengan alasan apapun. </li>
                                                    <li className='my-2 text-justify'>d. Kami memiliki seluruh hak untuk memblokir sementara, ataupun secara permanen, menghapus, menonaktifkan Akun Anda maupun menangguhkan dan/ atau menghentikan akses Anda terhadap Layanan atas kebijakan Kami sendiri dan untuk sebab apapun tanpa sebelumnya memberikan alasan atas pemblokiran, penghapusan atau penonaktifan Akun Anda tersebut. Alasan dari pemblokiran, penghapusan, atau penonaktifan Akun Anda, termasuk namun tidak terbatas kepada:
                                                        <ol className='list-decimal pl-8'>
                                                            <li className='my-2 text-justify'>Pelanggaran atau tidak patuh terhadap Ketentuan Umum, Kebijakan Privasi, Ketentuan Khusus ini maupun ketentuan perundang-undangan yang berlaku;</li>
                                                            <li className='my-2 text-justify'>Penipuan atau pencurian (atau indikasi atau sangkaan penipuan atau pencurian); </li>
                                                            <li className='my-2 text-justify'>Kecurigaan adanya tindak kriminal atau pelanggaran (fraud); </li>
                                                            <li className='my-2 text-justify'>Tindakan pelanggaran terhadap Hak Kekayaan Intelektual yang menjadi hak Kami sebagaimana dimaksud dalam Butir 8 Ketentuan Umum ini, termasuk namun tidak terbatas pada pendistribusian ulang konten-konten yang ada dalam Platform Layanan, baik sebagian maupun seluruhnya melalui media apapun di area umum atau area komersial tanpa ijin tertulis sebelumnya dari Kami, baik untuk tujuan komersial maupun tujuan lainnya; </li>
                                                            <li className='my-2 text-justify'>Anda dan/ atau pihak lain, yang berdasarkan pertimbangan Kami akan mengakibatkan kerugian dan/ atau kerusakan terhadap Kami, afiliasi Kami maupun pihak ketiga yang terikat perjanjian dengan Kami; </li>
                                                            <li className='my-2 text-justify'>Berdasarkan pertimbangan Kami, Platform Layanan dan/ atau Layanan disalahgunakan untuk melakukan pelanggaran terhadap ketentuan hukum yang berlaku di wilayah Republik Indonesia yang dilakukan oleh Anda dan/ atau pihak ketiga; </li>
                                                            <li className='my-2 text-justify'>Anda memberikan informasi yang tidak akurat, salah atau menyesatkan; </li>
                                                            <li className='my-2 text-justify'>Melakukan perbuatan yang tidak pantas, ancaman, atau hinaan terhadap Transvision XSTREAM maupun pihak lainnya yang dapat mempengaruhi reputasi dan nama baik Transvision XSTREAM; </li>
                                                            <li className='my-2 text-justify'>Menolak memberikan informasi yang Kami perlukan untuk keperluan pendaftaran Akun Anda; </li>
                                                            <li className='my-2 text-justify'>Adanya gangguan teknis yang mempengaruhi sistem dan tata kelola internal Transvision XSTREAM; </li>
                                                            <li className='my-2 text-justify'>Anda termasuk ke dalam “daftar hitam” atau “daftar pengamatan” oleh pemerintah atau organisasi international; </li>
                                                            <li className='my-2 text-justify'>Adanya ketentuan yang mewajibkan hal tersebut berdasarkan ketentuan hukum yang berlaku. </li>
                                                        </ol>
                                                    </li>
                                                    <li className='my-2 text-justify'>Peringatan tertulis mungkin akan Kami berikan sehubungan dengan pelanggaran dan ketidakpatuhan Anda terhadap ketentuan di atas, melalui surel atau media lainnya yang Kami tentukan dari waktu ke waktu. </li>
                                                </ol>
                                                <li className='font-semibold'>PENDAFTARAN AKUN ANDA </li>
                                                <ol>
                                                    <li className='my-2 text-justify'>a. Anda wajib memastikan bahwa perangkat atau device yang digunakan untuk mengakses dan melakukan login menggunakan Akun Anda pada Platform Layanan ini berada di bawah penguasaan Anda. Untuk dapat mengakses Layanan, Anda juga bertanggung jawab sendiri untuk memastikan perangkat atau device Anda kompatibel/mendukung untuk mengakses Platform Layanan, serta senantiasa menjaga perangkat atau device Anda dari gangguan terhadapnya yang mungkin timbul, termasuk namun tidak terbatas pada gangguan koneksi internet, malware dan virus, berkurangnya RAM dan memori, serta penumpukan history dan cache. Untuk itu, Anda membebaskan Kami dari segala resiko dan kerugian yang timbul dan mungkin timbul akibat kelalaian Anda sehubungan dengan perangkat atau device yang Anda gunakan. </li>
                                                    <li className='my-2 text-justify'>b. Anda wajib menjaga keamanan dan kerahasiaan kata sandi Akun Anda dan identifikasi yang Kami sediakan untuk Anda sehubungan dengan Akun Anda. Untuk itu, dalam hal terdapat pengungkapan atas kata sandi Anda dalam hal apapun juga, yang menyebabkan adanya penggunaan yang tidak sah atas akun atau identitas Anda, maka tindakan penggunaan Platform Layanan dari Akun Anda yang tidak sah tersebut akan tetap dianggap sebagai tindakan yang sah oleh Anda, dan Kami akan menindaklanjuti setiap tindakan yang dilakukan oleh Akun Anda tersebut. Anda dengan ini menyatakan untuk melepaskan Kami dari tanggung jawab atas setiap kerugian atau kerusakan yang timbul atas penyalahgunaan Akun Anda tersebut. </li>
                                                    <li className='my-2 text-justify'>c. Jika Anda tidak lagi mempunyai kontrol atas Akun Anda atau Anda mengetahui Akun Anda telah diretas, maka Anda dibutuhkan untuk secepatnya memberitahukan kepada Kami (misalnya, Akun Anda diretas dengan cara apapun atau perangkat atau device Anda dicuri), sehingga Kami dapat memblokir sementara dan/ atau menonaktifkan Akun Anda sebagaimana diperlukan. </li>
                                                    <li className='my-2 text-justify'>d. Anda menyadari bahwa kerahasiaan Akun Anda pada Platform Layanan ini merupakan tanggung jawab Anda sepenuhnya. Untuk itu, Kami menyarankan Anda untuk selalu me-log-out Akun Anda setiap setelah penggunaan dan senantiasa mengganti kata sandi yang Anda gunakan untuk Akun Anda secara berkala. </li>
                                                </ol>
                                                <li className='font-semibold'>PEMBATASAN PENGGUNAAN </li>
                                                <ol>
                                                    <li className='my-2 text-justify'>a. Anda dengan ini setuju untuk tidak menggunakan Platform Layanan, termasuk setiap Layanan untuk:
                                                        <ol className='list-decimal pl-8'>
                                                            <li className='my-2 text-justify'>kegiatan yang tidak sah atau melanggar hukum; </li>
                                                            <li className='my-2 text-justify'>kegiatan dengan tujuan komersial dalam bentuk apapun tanpa persetujuan tertulis dari Transivion; dan/ atau </li>
                                                            <li className='my-2 text-justify'>kegiatan yang dapat merugikan Transvision XSTREAM, baik secara material maupun immaterial. </li>
                                                        </ol>
                                                    </li>
                                                    <li className='my-2 text-justify'>b. Anda setuju untuk tidak berupaya, membuat, mencari, menggunakan atau mengirim sarana secara otomatis, manual atau bentuk lain dari teknologi untuk mengumpulkan atau mendapatkan informasi dari Platform Layanan, atau dengan cara lain untuk berinteraksi baik secara langsung maupun tidak langsung dengan Platform Layanan. </li>
                                                    <li className='my-2 text-justify'>c. Anda setuju bahwa Anda tidak akan menggunakan peralatan apa pun, perangkat lunak, atau teknologi lainnya yang mungkin menghambat atau berusaha menghalangi pengoperasian Platform Layanan ini. </li>
                                                    <li className='my-2 text-justify'>d. Kami dapat melakukan tindakan yang tegas atas pelanggaran Anda terhadap ketentuan ini, termasuk namun tidak terbatas pada pemblokiran Akun dan penghentian akses Anda terhadap Layanan maupun Platform Layanan. Kami juga berhak mengajukan gugatan secara perdata untuk jumlah keseluruhan kerusakan dan kerugian yang diderita akibat pelanggaran atas ketentuan ini. Anda dengan ini mengetahui dan menyadari bahwa pelanggaran atas ketentuan ini juga merupakan suatu tindakan pidana yang dapat diproses secara hukum. </li>
                                                </ol>
                                                <li className='font-semibold'>HAK KEKAYAAN INTELEKTUAL </li>
                                                <ol>
                                                    <li className='my-2 text-justify'>a. Semua Hak Kekayaan Intelektual dalam Platform Layanan ini dimiliki oleh Kami, afiliasi Kami dan/ atau pihak ketiga yang terikat kerjasama dengan Kami. Semua informasi dan bahan, termasuk namun tidak terbatas pada, nama domain, konten, perangkat lunak, teks, data, grafik, citra, gambar, suara, video, merek dagang, logo, simbol, ikon, kode html, kode lainnya, hak kekayaan intelektual lainnya dalam Platform Layanan ini dilarang untuk dipublikasikan, dimodifikasi, disalin, direproduksi, digandakan atau diubah dengan cara apa pun tanpa izin yang dinyatakan secara tertulis oleh Kami. </li>
                                                    <li className='my-2 text-justify'>b. Dengan demikian, Kami menjamin bahwa Kami adalah pemilik dan/ atau pemegang hak/ lisensi atas Platform Layanan dan Layanan dan konten lainnya yang tersedia di dalam Platform Layanan. </li>
                                                    <li className='my-2 text-justify'>c. Anda dengan ini menyadari bahwa Hak Kekayaan Intelektual yang dimiliki oleh Kami, afiliasi Kami dan/ atau pihak ketiga yang terikat kerjasama dengan Kami, dilindungi secara tegas oleh hukum dan peraturan perundang-undangan. </li>
                                                    <li className='my-2 text-justify'>d. Tidak ada ketentuan di dalam Ketentuan Umum ini yang dapat ditafsirkan sebagai pemberian maupun pengalihan hak/ lisensi atas Hak Kekayaan Intelektual apapun kepada Anda maupun pihak lainnya, baik sebagian maupun seluruhnya, baik tersirat maupun tersurat, untuk menggunakan, memiliki, menyalin, mereproduksi, mempublikasikan, mengeksploitasi, mendistribusikan, menjual, mengalihkan, menampilkan di muka umum, membuat ulang, mentransmisikan, memindahkan, menyiarkan, membongkar bagian manapun, memodifikasi dan/ atau melakukan hal-hal lainnya yang dapat mengurangi hak-hak yang terkandung dalam Hak Kekayaan Intelektual sebagaimana dimaksud, kecuali dinyatakan lain secara tegas di dalam Ketentuan Umum ini. Penggunaan Hak Kekayaan Intelektual oleh pihak ketiga dari Platform Layanan ini tidak dianggap sebagai suatu rekomendasi atau pemberian sponsor terhadap Platform Layanan oleh pihak ketiga. Anda dengan ini menerima dan menyetujui bahwa mengunduh setiap bagian apapun di dalam Hak Kekayaan Intelektual tidak memberikan Anda hak atas Hak Kekayaan Intelektual tersebut. </li>
                                                    <li className='my-2 text-justify'>e. Anda tidak boleh membuat link, melakukan screen capture, scrapping, maupun data crawling ke Platform Layanan tanpa adanya persetujuan tertulis sebelumnya dari Kami. Hal-hal tersebut dianggap sebagai pelanggaran Hak Kekayaan Intelektual milik Kami, afiliasi Kami dan/ atau pihak ketiga yang terikat kerjasama dengan Kami.</li>
                                                    <li className='my-2 text-justify'>f. Sehubungan dengan Hak Kekayaan Intelektual milik afiliasi Kami dan/ atau pihak ketiga yang terikat kerjasama dengan Kami melalui Platform Layanan, Anda menyadari bahwa Kami tidak memiliki kewenangan apapun terhadap hak cipta, seluruh proses penciptaan dan materi yang terkandung di dalamnya. Untuk itu, Anda berjanji melepaskan tanggung jawab Kami dari kerusakan dan kerugian yang timbul dan mungkin Anda derita sehubungan dengan hak cipta, proses penciptaan dan materi yang terkandung di dalam Hak Kekayaan Intelektual milik afiliasi Kami dan/ atau pihak ketiga yang terikat kerjasama dengan Kami. </li>
                                                    <li className='my-2 text-justify'>g. Kami dapat melakukan tindakan yang tegas atas pelanggaran Anda terhadap ketentuan ini, termasuk namun tidak terbatas pada pemblokiran Akun dan penghentian akses Anda terhadap Layanan maupun Platform Layanan. Kami juga berhak mengajukan gugatan secara perdata untuk jumlah keseluruhan kerusakan dan kerugian yang diderita akibat pelanggaran atas ketentuan ini. Anda dengan ini mengetahui dan menyadari bahwa pelanggaran atas ketentuan ini juga merupakan tindakan pidana yang dapat diproses secara hukum. </li>
                                                </ol>
                                                <li className='font-semibold'>KEWAJIBAN ANDA </li>
                                                <ol>
                                                    <li className='my-2 text-justify'>Dalam mengakses dan menggunakan Platform Layanan dan Layanan yang terkandung di dalamnya, Anda wajib mematuhi Ketentuan Umum ini, Kebijakan Privasi, Ketentuan Khusus yang terkait dan seluruh peraturan perundang-undangan yang berlaku yang relevan dengan penggunaan Platform Layanan dan Layanan.</li>
                                                    <li className='my-2 text-justify'>Pada fitur tertentu dalam Platform Layanan, seperti namun tidak terbatas pada konten dewasa, pornografi, kekerasan, kriminalitas, rokok, judi, penyalahgunaan narkotika dan obat-obat terlarang, dan games tertentu, Anda wajib memperhatikan dan memenuhi kriteria umur yang disyaratkan pada fitur tersebut serta memperhatikan berbagai dampak yang mungkin timbul akibat dari akses terhadap fitur tersebut, termasuk namun tidak terbatas pada dampak sosial dan psikologis. Anda bertanggung jawab sendiri dan membebaskan Kami dari seluruh akibat yang timbul atas kelalaian Anda terhadap ketentuan ini.</li>
                                                    <li className='my-2 text-justify'>Penggunaan Platform Layanan dan Layanan yang tidak sesuai dengan Ketentuan Umum ini, Kebijakan Privasi dan Ketentuan Khusus mungkin dapat mengakibatkan Platform Layanan maupun Layanan tidak berfungsi sebagaimana mestinya. Terhadap hal tersebut Anda melepaskan tanggung jawab Kami dari kerusakan dan kerugian yang mungkin timbul yang diderita oleh Anda dan pihak ketiga. </li>
                                                </ol>
                                                <li className='font-semibold'>DISCLAIMER </li>
                                                Anda dengan ini menyatakan untuk dan setuju bahwa sejauh mana diizinkan oleh hukum yang berlaku:
                                                <ol>
                                                    <li className='my-2 text-justify'>a. Platform Layanan dan Layanan diberikan berdasarkan "sebagaimana adanya" dan "sebagaimana tersedia". Kami dengan ini menyatakan secara tegas bahwa Kami tidak membuat garansi atau jaminan apa pun, baik secara tersurat maupun tersirat, sehubungan dengan hal- hal sebagai berikut:
                                                        <ol className='list-decimal pl-8'>
                                                            <li className='my-2 text-justify'>Platform Layanan dan Layanan dapat memenuhi kebutuhan Anda atau akan selalu dapat diakses/ digunakan; </li>
                                                            <li className='my-2 text-justify'>Penayangan konten pada Platform Layanan dan Layanan selalu tepat waktu sesuai jadwal dan dapat terselenggara tanpa gangguan, termasuk namun tidak terbatas yang diakibatkan oleh kondisi Force Majure sebagaimana ditentukan dalam Ketentuan Umum ini;  </li>
                                                            <li className='my-2 text-justify'>Platform Layanan dan Layanan patut atau layak untuk ditawarkan dan/ atau diperjualbelikan dan kecocokan untuk tujuan tertentu; </li>
                                                            <li className='my-2 text-justify'>Kualitas setiap informasi, materi, produk, fitur-fitur ataupun hal lainnya yang disajikan dalam Platform Layanan dan Layanan yang dibeli atau diperoleh oleh Anda memenuhi harapan Anda; </li>
                                                            <li className='my-2 text-justify'>Kualitas setiap informasi, materi, produk, fitur-fitur ataupun hal lainnya yang disajikan dalam Platform Layanan dan Layanan yang dibeli atau diperoleh oleh Anda memberikan kepuasan yang cukup bagi Anda. </li>
                                                        </ol>
                                                        Untuk itu, Kami tidak dapat dikenakan tindakan apapun atau bertanggung jawab atas hal apapun sehubungan dengan hal tersebut.
                                                    </li>
                                                    <li className='my-2 text-justify'>b. Kami tidak menjamin bahwa: (i) fungsi, layanan dan fitur keamanan yang disediakan dalam Platform Layanan ini tidak akan terganggu atau bebas dari kesalahan; (ii) kesalahan atau kegagalan akan diperbaiki; dan (iii) Platform Layanan atau server memberikan layanan yang bebas dari virus, malware atau komponen berbahaya lainnya; </li>
                                                    <li className='my-2 text-justify'>c. Kami tidak menjamin Platform Layanan dan Layanan bebas dari sumber materi yang jahat, tidak senonoh atau kontroversial; dan </li>
                                                    <li className='my-2 text-justify'>d. Kami tidak bertanggung jawab atas setiap masalah atau gangguan teknis dari perangkat/ device, jaringan atau jalur telepon, sistem online komputer, server, penyedia jasa internet, peralatan komputer, piranti lunak, atau apapun termasuk kerusakan pada komputer Anda atau komputer siapapun sebagai akibat dari penggunaan Platform Layanan dan Layanan atau perubahan atau modifikasi terhadap perangkat Xstream Box yang dilakukan sendiri oleh pelanggan diluar ketentuan yang diberikan oleh Transvision. Dengan demikian, Anda mengetahui dan menyetujui bahwa tiap kepercayaan terhadap atau penggunaan informasi dan/ atau konten yang tersedia dalam Platform Layanan dan Layanan seluruhnya adalah resiko Anda sendiri. </li>
                                                </ol>
                                                <li className='font-semibold'>BATASAN TANGGUNG JAWAB  </li>
                                                <ol>
                                                    <li className='my-2 text-justify'>Kami tidak akan bertanggung jawab atas setiap kerugian atau kerusakan, baik langsung atau tidak langsung, akibat dari atau terhubung ke penggunaan Anda terhadap Platform Layanan dan Layanan, termasuk namun tidak terbatas pada cedera pribadi, kematian, kerusakan khusus, insidental, hukuman atau kerusakan akibat atau kerugian ekonomi lainnya, meskipun Kami telah diberitahu tentang kemungkinan kerugian atau kerusakan yang mungkin terjadi. Perbaikan satu-satunya yang tersedia bagi Anda adalah penghentian penggunaan Platform Layanan dan Layanan. </li>
                                                </ol>
                                                <li className='font-semibold'>GANTI RUGI </li>
                                                <p className='my-2 text-justify'>Anda dengan ini memberi perlindungan hukum dan membebaskan Kami, afiliasi Kami maupun pihak ketiga yang terikat kerjasama dengan Kami, termasuk namun tidak terbatas pada karyawan, direktur, komisaris, konsultan, penasehat, agen dan subkontraktor Kami, afiliasi Kami maupun pihak ketiga yang terikat kerjasama dengan Kami, terhadap seluruh dan setiap klaim, tuntutan maupun gugatan atas resiko dan kerugian yang timbul yang diajukan oleh pihak ketiga manapun sebagai akibat dari penggunaan Anda terhadap Platform Layanan maupun Layanan di dalamnya dan/ atau pelanggaran atas Ketentuan Umum, Kebijakan Privasi, Ketentuan Khusus yang relevan maupun ketentuan perundang-undangan yang berlaku, termasuk namun tidak terbatas pada biaya hukum yang timbul untuk melindungi kepentingan Kami, afiliasi Kami maupun pihak ketiga yang terikat dengan perjanjian dengan Kami. </p>
                                                <li className='font-semibold'>PENGHENTIAN PLATFORM LAYANAN PERUSAHAAN  </li>
                                                <ol>
                                                    <li className='my-2 text-justify'>a. Kami memiliki kebijaksanaan tunggal dan penuh untuk menangguhkan dan/ atau menghentikan Platform Layanan ini dan/ atau bagian dari Platform Layanan, termasuk Layanan yang disediakan dalam Platform Layanan ini, dan/ atau penggunaan Platform Layanan dan/ atau Layanan, atau bagiannya, kapan saja dengan alasan apa pun tanpa pemberitahuan sebelumnya kepada Anda. </li>
                                                    <li className='my-2 text-justify'>b. Dalam hal terjadi penangguhan dan/ atau penghentian, Anda tetap terikat oleh kewajiban dalam Ketentuan Umum ini, Kebijakan Privasi, Ketentuan Khusus yang relevan, termasuk namun tidak terbatas pada ketentuan mengenai jaminan, ganti rugi, pelepasan dan pembatasan kewajiban yang telah Anda sepakati. </li>
                                                    <li className='my-2 text-justify'>c.Kami tidak akan bertanggung jawab kepada Anda atau pihak ketiga mana pun atas penangguhan dan/ atau penghentian akses maupun penggunaan Anda ke Platform Layanan maupun Layanan. </li>
                                                </ol>
                                                <li className='font-semibold'>KETENTUAN PENGEMBALIAN DANA (“REFUND”) </li>
                                                <p className='my-2 text-justify'>Bahwa sehubungan dengan Layanan yang tersedia, Kami berdasarkan kebijakan penuh yang Kami miliki, dapat memberikan Refund kepada Anda sesuai dengan ketentuan pemberian Refund yang berlaku pada tiap-tiap/ masing-masing Layanan yang Kami sediakan. </p>
                                                <li className='font-semibold'>PRIVASI </li>
                                                <p className='my-2 text-justify'>Kami menghargai kerahasiaan Anda. Kami akan berusaha keras untuk mematuhi peraturan perundang-undangan mengenai perlindungan data pribadi yang berlaku saat melakukan kewajiban berdasarkan Ketentuan Umum ini dan Ketentuan Khusus.  </p>
                                                <li className='font-semibold'>HUKUM YANG MENGATUR  </li>
                                                <p className='my-2 text-justify'>Ketentuan Umum ini tunduk dan ditafsirkan berdasarkan hukum yang berlaku di wilayah Negara Kesatuan Republik Indonesia. </p>
                                                <li className='font-semibold'>KETENTUAN LAIN-LAIN </li>
                                                <ol>
                                                    <li className='my-2 text-justify'>a. Keterpisahan. Apabila terdapat satu atau lebih persyaratan, peraturan atau ketentuan yang terdapat dalam Ketentuan Umum ini menjadi tidak dapat dilaksanakan, atau menjadi tidak berlaku/ sah, atau melanggar hukum yang berlaku, atau adanya suatu peraturan perundang-undangan maupun putusan pengadilan yang melarang pemberlakuannya, maka persyaratan, peraturan atau ketentuan yang lainnya tetap berlaku dan mengikat para pihak. </li>
                                                    <li className='my-2 text-justify'>b. Force Majeure. Yang dimaksud dengan Force Majeure dalam Ketentuan Umum ini adalah peristiwa atau keadaan yang terjadi di luar kuasa atau kehendak Kami untuk mengendalikannya, termasuk namun tidak terbatas pada signal siaran mengalami gangguan cuaca, bencana alam, bencana ruang angkasa, gangguan layanan internet, kontaminasi radioaktif, pemberontakan, penyanderaan, huru-hara, perang, epidemik, pandemik, wabah penyakit, keputusan dan/atau kebijakan pemerintah terkait hal-hal tersebut di atas, yang terjadi di Negara Kesatuan Republik Indonesia dan di belahan dunia lainnya yang secara langsung maupun tidak langsung mempengaruhi kemampuan Kami untuk melaksanakan tugas dan tanggung jawab Kami, termasuk namun tidak terbatas pada penyediaan Platform Layanan dan Layanan. Anda melepaskan tanggung jawab Kami dan tidak akan menuntut apapun kepada Kami, atas keterlambatan atau kegagalan dalam menyediakan Platform Layanan dan Layanan yang disebabkan oleh Force Majeure. </li>
                                                    <li className='my-2 text-justify'>c. Pengalihan. Anda tidak diperkenankan untuk mengalihkan sebagian maupun seluruh kewajiban Anda berdasarkan Ketentuan Umum ini, Kebijakan Privasi maupun Ketentuan Khusus kepada pihak lainnya, baik sebagian maupun seluruhnya, tanpa sepengetahuan dan persetujuan tertulis terlebih dahulu dari Kami. </li>
                                                </ol>
                                            </ol>
                                            <p className="text-sm text-gray-500 font-semibold">B. KETENTUAN KHUSUS </p>
                                            <p className="text-sm text-gray-500 text-justify font-semibold">Ketentuan khusus ini (“Ketentuan Paket Berlangganan”) adalah ketentuan penggunaan Layanan Berlangganan Transvision XSTREAM yang merupakan satu kesatuan tidak terpisahkan dan tunduk pada Ketentuan Umum dan Kebijakan Privasi. </p>
                                            <ol className='text-sm text-gray-500 list-decimal pl-6'>
                                                <li className='font-semibold'>Persetujuan </li>
                                                <p className='my-2 text-justify'>Paket Berlangganan XSTREAM (“Paket Berlangganan”) merupakan layanan yang disediakan XSTREAM, dimana Anda dapat mengakses berbagai konten yang disediakan di dalam Platform Layanan, termasuk namun tidak terbatas pada pertandingan olah raga dan berbagai jenis film, baik film lepas maupun serial dalam bentuk live dan on-demand. Paket Berlangganan dapat diakses pada Platform Layanan yang ditunjuk oleh Kami yang diinformasikan dari waktu ke waktu, hanya bagi Anda yang telah mendaftar dan melakukan pembelian Paket Berlangganan (“Pelanggan Layanan”). Harap membaca Ketentuan Paket Berlangganan ini dengan seksama. Dengan mengakses dan/ atau menggunakan Paket Berlangganan, Anda setuju untuk mematuhi setiap dan seluruh Ketentuan Paket Berlangganan ini. Jika Anda tidak menyetujui Ketentuan Paket Berlangganan ini baik sebagian maupun seluruhnya, maka Anda tidak diperkenankan untuk menggunakan dan/ atau mengakses Paket Berlangganan. </p>
                                                <li className='font-semibold'>Tata Cara Berlangganan </li>
                                                <p className='my-2 text-justify'>Paket Berlangganan mengharuskan Anda untuk melakukan pendaftaran dengan memasukkan data pribadi Anda, sesuai dengan ketentuan dalam Ketentuan Umum. Dengan melakukan pembelian Paket Berlangganan, Anda menyatakan telah memastikan ke Transvision Customer Support bahwa perangkat atau device (mobile phone, tab, dan sejenisnya) yang Anda gunakan kompatibel atau mendukung penggunaan Paket Berlangganan, dengan melakukan pendaftaran melalui website my.transvivion.co.id, dan/atau konfirmasi ke Transvision Customer Support melalui layanan call center 1500060; dan/atau menghubungi Kami melalui surat elektronik pada care@transvision.co.id untuk selanjutnya memastikan bahwa Anda telah mendapatkan konfirmasi tertulis dari Kami terkait hal tersebut. Setelah melakukan pendaftaran, Anda dapat melakukan login/ mengakses Paket Berlangganan menggunakan akun email yang Anda gunakan pada saat pendaftaran. </p>
                                                <li className='font-semibold'>Pembayaran</li>
                                                <p className='my-2 text-justify'>Apabila Anda melakukan pembelian Paket Berlangganan maka Anda akan dikenakan biaya sesuai dengan harga Layanan tersebut yang ditetapkan pada Platform Layanan dari waktu ke waktu. Harap diketahui bahwa Kami dapat mengubah, memodifikasi, dan/ atau mengoreksi ketentuan harga Paket Berlangganan melalui Platform Layanan sewaktu-waktu. Kami menerima pembayaran dengan menggunakan beberapa metode, termasuk namun tidak terbatas pada kartu kredit, virtual account dan transfer. Namun demikian, terdapat kemungkinan bahwa untuk suatu waktu tertentu, hanya metode pembayaran tertentu saja yang dapat dipergunakan untuk melakukan pembelian Paket Berlangganan. Metode pembayaran yang tersedia dikelola oleh pihak ketiga yang bekerjasama secara resmi dengan Kami (“Penyedia Jasa Pembayaran”). Untuk itu, dalam hal terdapat kegagalan dalam proses pembayaran yang terjadi karena kesalahan sistem pada Penyedia Jasa Pembayaran, maka Anda melepaskan tanggung jawab Kami dari resiko dan kerugian yang timbul dan mungkin timbul karenanya. Anda dengan ini menyadari bahwa pembayaran yang telah Anda lakukan mungkin memerlukan waktu lebih lama untuk proses konfirmasi, rekonsiliasi atau sejenisnya dengan Penyedia Jasa Pembayaran, sehingga membuat Anda tidak dapat segera memperoleh layanan dalam Paket Berlangganan. Dalam hal Anda mengalami kendala tersebut, Anda dipersilahkan untuk menghubungi Transvision Customer Support sebagaimana disebutkan dalam Butir 2) Ketentuan Paket Berlangganan ini. Seluruh pembelian yang telah Anda lakukan tidak dapat dibatalkan dan dikembalikan, kecuali secara tegas ditentukan sebaliknya dalam Ketentuan Paket Berlangganan ini. </p>
                                                <li className='font-semibold'>Penggunaan </li>
                                                <p className='my-2 text-justify'>Anda bertanggung jawab sepenuhnya untuk setiap aktivitas yang dilakukan dengan menggunakan Akun Anda, termasuk tetapi tidak terbatas pada penggunaan pulsa, kuota, jaringan internet dan biaya yang ditimbulkan pada saat mengakses Paket Berlangganan, setiap risiko dan/ atau kerugian yang timbul sebagai akibat dari penyalahgunaan oleh Anda dan/ atau pihak ketiga yang didasarkan pada alasan dan/ atau sebab apapun sebagai akibat langsung maupun tidak langsung dari penggunaan Paket Berlangganan, dan dengan ini Anda membebaskan Kami dari segala tuntutan, klaim dan gugatan yang mungkin timbul dalam bentuk apapun dan dari pihak manapun. Paket Berlangganan tidak merepresentasikan atau mengesahkan keakurasian atau reliabilitas dari informasi, konten atau layanan yang tersedia pada daftar direktori tersebut. Anda di sini mengakui bahwa mempercayai setiap informasi, konten, fitur atau layanan yang tersedia pada daftar direktori tersebut merupakan resiko Anda sendiri. Anda juga mengakui bahwa beberapa konten dan layanan yang terdapat di dalam dalam Paket Berlangganan ini tidak ditujukan untuk digunakan oleh anak-anak berusia di bawah 13 tahun. Bahwa dengan ini Anda juga menyatakan bersedia untuk menerima setiap informasi produk maupun informasi lainnya yang dapat disampaikan melalui Platform Layanan. Apabila Anda tidak setuju ataupun tidak dapat menerima hal tersebut, maka Anda diperkenankan untuk berhenti menggunakan Paket Berlangganan yang terdapat pada Platform Layanan. Konten dan layanan yang terdapat di dalam Paket Berlangganan disediakan oleh Kami, afiliasi Kami dan/ atau pihak ketiga yang terikat kerjasama dengan Kami, yang memiliki syarat dan ketentuan penggunaan masing-masing. Kualitas layanan streaming atas Paket Berlangganan yang Anda gunakan sesuai dengan bandwith internet yang Anda miliki. </p>
                                                <li className='font-semibold'>Pemilik Hak atas Konten  </li>
                                                <p className='my-2 text-justify'>Bahwa konten dan layanan yang terdapat dalam Platform Layanan, dan dalam Paket Berlangganan, termasuk tetapi tidak terbatas kepada teks, logo, suara, foto grafis, gambar bergerak, video, dan materi lain yang terkandung di dalamnya dilindungi oleh hukum terkait hak cipta, hak merek, hak paten, dan hak atas kekayaan intelektual lainnya, dimana Kami merupakan pemilik dan/ atau pemegang lisensi yang sah atas hak tersebut. Setiap pelanggaran terhadap hak-hak tersebut di atas merupakan wanprestasi dan suatu perbuatan melawan hukum. Menggunakan Paket Berlangganan tidak berarti memindahkan atau mengalihkan kepemilikan hak kekayaan intelektual atas konten atau informasi yang Anda akses. Konten dalam Paket Berlangganan bisa digunakan oleh Anda hanya untuk kebutuhan Anda sendiri dan bukan untuk tujuan komersil. </p>
                                                <li className='font-semibold'>Pembatalan/ Refund   </li>
                                                <p className='my-2 text-justify'>Anda dengan ini menyadari bahwa: Konten yang ada dalam Platform Layanan dan Paket Berlangganan merupakan konten yang Kami produksi sendiri, Kami peroleh dari afiliasi Kami maupun dari pihak ketiga yang terikat kerjasama dengan Kami; dan Penyelenggaraan kegiatan untuk memproduksi konten bergantung pada situasi dan kondisi di lokasi secara global, dimana dimungkinkan bagi pihak ketiga tersebut untuk menunda atau membatalkan kegiatan sebagaimana dimaksud. Penundaan dan pembatalan dapat terjadi karena peristiwa termasuk namun tidak terbatas pada kondisi Force Majeure. Dengan demikian, Kami tidak memiliki kendali atas terselenggaranya suatu kegiatan tersebut dan akses Kami terhadap konten sebagaimana dimaksud. Akibat dari penundaan dan pembatalan tersebut, Kami memiliki kewenangan untuk mengakhiri Paket Berlangganan baik sebagian maupun keseluruhan. Untuk itu, Kami dengan kebijakan Kami sendiri dapat mengembalikan bagian dari pembayaran yang telah Anda berikan kepada Kami, melalui metode dan dalam waktu yang Kami tentukan sebagaimana relevan, dengan pemberitahuan tertulis kepada Anda. </p>
                                                <li className='font-semibold'>Penggunaan untuk Tujuan Tidak Sah dan Terlarang   </li>
                                                <p className='my-2 text-justify'>Anda tidak diperkenankan untuk membahayakan, mengubah atau memodifikasi Paket Berlangganan (termasuk tetapi tidak terbatas kepada teks, logo, suara, foto grafis, gambar bergerak, video, maupun materi lain yang terkandung di dalamnya) atau mencoba untuk membahayakan, mengubah atau memodifikasi Paket Berlangganan dan perangkat XSTEREAM Box baik perangkat lunak maupun perangkat keras dengan cara apapun. Kami berhak melarang Anda untuk menggunakan atau mengakses Paket Berlangganan lebih lanjut jika perangkat atau device yang Anda gunakan tidak kompatibel/ mendukung atau tidak sah atau untuk tujuan lain selain daripada tujuan yang dimaksud untuk penggunaan Paket Berlangganan ini. Anda berkomitmen bahwa Anda hanya akan menggunakan Paket Berlangganan sesuai dengan ketentuan yang Kami berlakukan. Anda dilarang untuk membagi Paket Berlangganan dengan pihak lain manapun. Pelanggaran terhadap ketentuan ini memberikan kewenangan kepada Kami untuk menghapus, menonaktifkan Akun Anda maupun menangguhkan dan/ atau menghentikan akses Anda terhadap Layanan atas kebijakan Kami sendiri. Sesuai dengan kondisi penggunaan Anda, Anda menjamin kepada Kami bahwa Anda tidak akan menggunakan Paket Berlangganan untuk tujuan apapun yang tidak sah dan/ atau dilarang berdasarkan Ketentuan Umum, Kebijakan Privasi, Ketentuan Paket Berlangganan ini dan ketentuan perundang-undangan yang berlaku. </p>
                                                <li className='font-semibold'>Perubahan Layanan   </li>
                                                <p className='my-2 text-justify'>Untuk memberikan pengalaman yang baik bagi Anda, modifikasi, perubahan dan perbaikan akan dilakukan secara periodik pada bagian-bagian di dalam Platform Layanan maupun Layanan. Paket Berlangganan mungkin akan mengalami perbaikan dan/ atau perubahan sewaktu-waktu yang mengakibatkan Platform Layanan dan Paket Berlangganan tidak dapat diakses untuk sementara waktu, termasuk namun tidak terbatas karena proses maintenance, interupsi telekomunikasi, termasuk kebijakan internal Transvision dan lainnya. Kami juga senantiasa memperbaharui dan meningkatkan Paket Berlangganan dari waktu ke waktu. Untuk itu, Kami mungkin mengurangi, menangguhkan atau bahkan mematikan sebagian konten, tayangan, atau fitur tertentu, dengan dan/ atau tanpa pemberitahuan sebelumnya. Layanan (beserta pemilik, supplier, konsultan, pengiklan, affiliasi, rekanan, pekerja, atau entitas terkait) tidak akan dapat dikenakan tuntutan oleh Anda atau pihak ketiga manapun untuk mengubah atau menghentikan beberapa atau semua konten, informasi, software, produk, fitur dan layanan yang diterbitkan pada Platform Layanan ini, kecuali dalam hal konten, informasi, software, produk, fitur dan layanan sebagaimana dimaksud dapat dibuktikan sebagai Hak Atas Kekayaan Intelektual milik Anda atau pihak ketiga tersebut. </p>
                                            </ol>
                                            <p className="text-sm text-gray-500 font-semibold">C. KETENTUAN GARANSI </p>
                                            <p className="text-sm text-gray-500 text-justify font-semibold">Ketentuan Garansi dan Pengembalian Perangkat adalah ketentuan yang berlaku untuk pembelian Produk Transvision XSTREAM Box secara langsung melalui saluran penjualan Transvision maupun rekanan resmi yang ditunjuk oleh Transvision.</p>
                                            <ol className='text-sm text-gray-500 list-decimal pl-6'>
                                                <li className='my-2 font-semibold'>Ketentuan Umum Garansi Perangkat </li>
                                                <ol>
                                                    <li className='my-2 text-justify'>a. Transvision memberikan layanan garansi purna jual untuk setiap perangkat XSTREAM Box yang dibeli melalui sales agent Transvision, toko/akun resmi Transvision secara online, dan rekanan yang ditunjuk resmi oleh Transvision.</li>
                                                    <li className='my-2 text-justify'>b. Garansi perangkat berlaku selama 12 bulan terhitung dari tanggal pembelian perangkat yang bisa dibuktikan dengan nota pembelian perangkat, atau dari tanggal aktivasi perangkat di platform layanan Xstream.</li>
                                                    <li className='my-2 text-justify'>c. Transvision berhak menolak garansi dan pengembalian perangkat jika ditemukan hal-hal seperti berikut namun tidak terbatas pada daftar ini:
                                                        <ol className='list-decimal pl-8'>
                                                            <li className='my-2 text-justify'> XSTREAM Box yang tidak dibeli dari sales agent Transvision, toko/akun resmi Transvision dan rekanan resmi yang ditunjuk oleh Transvision. </li>
                                                            <li className='my-2 text-justify'> XSTREAM Box dengan label nomor seri, model manufaktur atau label nomor part, dan/atau label garansi yang hilang, rusak, berubah, atau tidak dapat dibaca.</li>
                                                            <li className='my-2 text-justify'>XSTREAM Box tanpa seluruh paket asli dan aksesorinya, termasuk boks eceran, adapter daya, unit remote kontrol, booklet manual, kabel HDMI, dan barang-barang lainnya yang secara asli termasuk dalam produk.</li>
                                                            <li className='my-2 text-justify'>XSTREAM Box yang tampaknya dirusak, disesuaikan, atau diubah dengan cara apapun. </li>
                                                        </ol>
                                                        Untuk itu, Kami tidak dapat dikenakan tindakan apapun atau bertanggung jawab atas hal apapun sehubungan dengan hal tersebut.
                                                    </li>
                                                </ol>
                                                <li className='my-2 font-semibold'>Pedoman Pengembalian Perangkat</li>
                                                <ol>
                                                    <li className='my-2 text-justify'>a. Tidak ada pengembalian uang untuk pengembalian XSTREAM Box. Namun, anda mempunyai empat belas (14) hari kalender untuk mengembalikan XSTREAM Box yang cacat karena perlakukan pengiriman dan atau pabrikasi, hanya untuk diperbaiki dan/atau diganti.</li>
                                                    <li className='my-2 text-justify'>b. Anda dapat meminta pengembalian dengan menghubungi Call Center XSTREAM melalui nomor telpon Call Center 1500060; WhatsApp 0823-0823-5810; atau email care@transvision.co.id.</li>
                                                    <li className='my-2 text-justify'>c. Jika anda mengembalikan barang yang menyimpan informasi pribadi anda, anda harus menghapus seluruh informasi ini sebelum mengirimkan kembali produk ke Kami. Termasuk juga keluar dari akun Google sebelum mengembalikan ke Kami.</li>
                                                    <li className='my-2 text-justify'>d. Kebijakan periode perbaikan perangkat dan atau penggantian pengembalian yang dilakukan sesuai kebijakan Garansi kami adalah empat belas (14) hari sejak perangkat Xstream Box dari Anda kami terima atau lebih tergantung pada tingkat kerusakan/perbaikan yang dilakukan.</li>
                                                    <li className='my-2 text-justify'>e. Biaya penggantian adalah gratis untuk penggantian dengan produk yang sama dalam jangka waktu kebijakan penggantian, dengan ketentuan produk tersebut cacat karena kesalahan produksi.</li>
                                                    <li className='my-2 text-justify'>f. Biaya pengiriman perangkat dari pelanggan ke service center Transvision merupakan tanggung jawab pelanggan sendiri.</li>
                                                </ol>
                                            </ol>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:text-sm"
                                        onClick={() => setOpenModal(false)}
                                    >
                                        Kembali
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        )
    }

    return (
        <>
            {error && <Alert type={0} title={'Registrasi Gagal'} message={message} close={closeModal} />}
            {success && <Alert type={1} title={'Harap verifikasi email Anda'} link={'/'} message={message} close={closeModal} />}
            {load &&
                <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                    <Loader type="ThreeDots" color="#00BFFF" className="text-center justify-center flex mt-20" height={80} width={80} />
                </div>
            }
            {openModal && <Tnc />}
            <div className="pt-36 w-full px-12 mb-8">
                <div>
                    <p className="text-3xl font-bold">Daftar</p>
                    <p className="mt-2.5 text-normal text-gray-400">Buat akun Anda agar dapat menikmati semua <br /> konten hiburan dari Transvision</p>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className="mt-5">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-3.5">
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder="Email Anda"
                                        {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                                        className="py-4 px-7 w-full text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-full"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-red-500 text-xs">
                                        Mohon masukkan email anda dengan format yang benar
                                    </p>
                                )}
                            </div>
                            <div className="mt-4">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Nomor Telepon
                                </label>
                                <div className="mt-3.5">
                                    <input
                                        type="text"
                                        pattern="[0-9]*"
                                        name="phone"
                                        id="phone"
                                        placeholder="Nomor Telepon Anda"
                                        onInput={handlePhone}
                                        value={phone}
                                        {...register("phone_number", { required: true })}
                                        className="py-4 px-7 w-full text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-full"
                                    />
                                </div>
                                {errors.phone_number && (
                                    <p className="mt-1 text-red-500 text-xs">
                                        Mohon masukkan nomor telepon anda
                                    </p>
                                )}
                            </div>
                            <div className="mt-4">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-3.5 relative flex items-stretch flex-grow ">
                                    <input
                                        type={Password ? "text" : "password"}
                                        name="password"
                                        placeholder="Password Anda"
                                        {...register("password", { required: true, minLength: 8 })}
                                        className="py-4 px-7 block w-full text-sm border-gray-300 rounded-full"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                        {Password ? (
                                            <EyeIcon
                                                className="h-5 w-5 text-gray-400 cursor-pointer"
                                                aria-hidden="true"
                                                onClick={() => setPassword(false)}
                                            />
                                        ) : (
                                            <EyeOffIcon
                                                className="h-5 w-5 text-gray-400 cursor-pointer"
                                                aria-hidden="true"
                                                onClick={() => setPassword(true)}
                                            />
                                        )}
                                    </div>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-red-500 text-xs">
                                        Password harus berisi minimal 8 karakter
                                    </p>
                                )}
                            </div>

                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="w-full self-center items-center px-8 py-5 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    style={{ backgroundColor: '#0285e4' }}
                                >
                                    Daftar
                                </button>
                            </div>

                            {/* <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-4 bg-white text-xs text-gray-500">atau</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button
                                    className="w-full text-gray-800 bg-white text-gray-800 px-10 py-5 font-semibold text-white items-center space-x-2 rounded-full"
                                    style={{ boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.08)' }}
                                >
                                    <div className="flex">
                                        <img src={'../png/google.png'} className="mr-14" width="24px" height="24px" />
                                        <span>Masuk dengan Google</span>
                                    </div>
                                </button>
                            </div> */}

                            <div className="mt-4 px-8 text-center">
                                <label className="font-small text-xs text-gray-500">
                                    Dengan mendaftar Anda berarti menyetujui <a href="#" className="text-blue-600" onClick={() => setOpenModal(true)}>syarat dan ketentuan</a> yang berlaku.
                                </label>

                            </div>
                        </div>
                    </form>
                    <div className="mt-14 mb-28 flex justify-center">
                        <label htmlFor="comments" className="font-small text-base text-gray-700">
                            Sudah punya akun? <a href={'/login'} className="text-blue-600">Masuk</a>
                        </label>

                    </div>
                </div>
            </div>
        </>
    )
}