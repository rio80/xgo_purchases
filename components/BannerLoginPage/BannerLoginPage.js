export default function BannerLoginPage() {
    return (
        <div className="w-2/5 relative">
            <img src={'../png/login.png'} className="w-full h-screen object-cover" />
            <div className="absolute top-16 ml-20 w-3/5">
                <img src={'../png/transvision-light.png'} className="w-52" height="23px" />
                <div className="mt-32 w-full">
                    <img src={'../png/top.png'} width="33px" height="34px" />
                    <p className="text-white font-semibold text-3xl text-center mt-12">
                        Satu aplikasi, <br /> Jutaan hiburan
                    </p>
                    <p className="text-white font-light text-center mt-6">
                        Nikmati Streaming Kapanpun Dimanapun <br />
                        dalam Satu Aplikasi
                    </p>
                    <div className="flex justify-end mt-12">
                        <img src={'../png/bottom.png'} width="33px" height="34px" />
                    </div>
                </div>
            </div>
        </div>
    )
}