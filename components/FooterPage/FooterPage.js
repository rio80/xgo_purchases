function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function FooterPage({variant}) {
    return (
        <footer aria-labelledby="footer-heading" style={{ backgroundColor: '#112d57' }} className={classNames(variant ? "bottom-0 relative w-full" : "")}>

            <div className="flex justify-between items-center h-32 px-16">
                <div className="flex">
                    <div className="flex-shrink-0 flex items-center hidden lg:flex">
                        <img
                            className="h-5"
                            src={`../png/transvision-light.png`}
                            alt="XGO"
                            width="204px"
                            

                        />
                    </div>
                </div>
                <div>
                    <div className="flex-shrink-0 flex items-center hidden lg:flex gap-x-2">
                        <img
                            className="h-8 w-auto ml-10 pr-1"
                            src={`../png/twitter.png`}
                            alt="XGO"
                            width="51px"
                            height="51px"
                        />
                        <img
                            className="h-8 w-auto px-1"
                            src={`../png/facebook.png`}
                            alt="XGO"
                            width="51px"
                            height="51px"
                        />
                        <img
                            className="h-8 w-auto px-1"
                            src={`../png/linkedin.png`}
                            alt="XGO"
                            width="51px"
                            height="51px"
                        />
                    </div>
                </div>
                <div className="text-white text-sm font-extralight">
                    Copyright © 2021 XGO. All Rights Reserved
                </div>
            </div>
        </footer>
    )
}