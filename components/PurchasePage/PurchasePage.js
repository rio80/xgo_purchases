import * as React from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { data } from 'autoprefixer'

export default function PurchasePage() {

  const paket = [
    {
      nama: 'Paket 30 Hari VOD',
      icon: true,
    }, {
      nama: 'Paket SVOD',
      icon: true,
    }, {
      nama: 'XGO Free',
      icon: true,
    }, {
      nama: 'XGO Premium',
      icon: false
    }
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [detail, setDetail] = React.useState(
    [
      {
        paket: 'Paket 30 Hari VOD',
        harga: 'Rp9.900',
        hari: '/ 30 Hari',
        detail: '*Hingga 31 Oktober 2021',
        color: true
      }, {
        paket: 'Paket 7 Hari Linear TV + VOD',
        harga: 'Rp9.900',
        hari: '/ 30 Hari',
        detail: '*Hingga 31 Oktober 2021',
        color: false
      }, {
        paket: 'Paket 30 hari Linear TV + VOD',
        harga: 'Rp9.900',
        hari: '/ 30 Hari',
        detail: '*Hingga 31 Oktober 2021',
        color: false
      }
    ]
  )

  // const handleClick = (idx) => {
  //   let newArr = [...detail]
  //   detail.map((data, i => (
  //     i === idx ? data.color = true : data.color = false
  //   ))
  //   // newArr[data].color = true
  //   // setDetail(newArr)

  //   // console.log(detail)
  // }

  return (
    <>
      <div className="max-w-3xl mx-auto hidden lg:block">
        <div className="overflow-hidden mt-24">
          <div className="px-4 py-5 sm:px-6">
            <p className="font-medium text-2xl text-center">Pembelian </p> <br />
            <p className="font-medium text-sm text-center text-gray-400">Untuk berlangganan, tersedia berbagai paket yang sesuai dengan kebutuhanmu. </p>
          </div>
          <div className="pt-5 pb-6">
            <div class="grid grid-cols-3 gap-20">
              <div className="w-72 rounded-lg py-6 px-8" style={{ backgroundColor: '#f6f9ff' }}>
                <button
                  type="button"
                  className="rounded-3xl inline-flex items-center px-4 py-2 text-xs font-light shadow-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  style={{ background: 'linear-gradient(90deg, rgba(0,36,3,1) 0%, rgba(212,13,150,1) 0%, rgba(73,88,218,1) 100%)' }}
                >
                  30 HARI
                </button>
                {paket.map((data) => (
                  <div className="w-full mt-9 flex">
                    <p className="font-xs text-xs">
                      {data.nama}
                    </p>
                    {data.icon ? <img src={`../png/checklist-circle.png`} className="ml-auto" width="16px" height="16px" /> : <img src={`../png/close-circle.png`} className="ml-auto" width="16px" height="16px" />}
                  </div>
                ))}
              </div>

              <div className="col-span-2 ml-10 rounded-lg flex flex-wrap content-between">
                {detail.map((data, i) => (
                  <div
                    className="w-full rounded-lg flex h-20 border-black px-6 cursor-pointer"
                    style={data.color ? { background: 'linear-gradient(90deg, rgba(0,36,3,1) 0%, rgba(212,13,150,1) 0%, rgba(73,88,218,1) 100%)' } : { border: '1px solid #b0c6e9' }}
                    // onClick={() => handleClick(i)}
                    key={i}
                  >
                    <div className="flex self-center">
                      <input
                        id="windows"
                        value="windows"
                        name="platform"
                        type="radio"
                        className="self-center"
                      />
                      <div className="grid grid-cols-4 grid-flow-row w-full mt-3">
                        <div className="col-span-2 self-center">
                          <p className={classNames(data.color ? "text-white" : "text-black", "font-normal text-sm ml-5")}>
                            {data.paket}
                          </p>
                        </div>
                        <div className="self-center">
                          <p className={classNames(data.color ? "text-white" : "text-black", "font-semibold text-2xl ml-7")}>
                            {data.harga}
                          </p>
                        </div>
                        <div className="justify-self-end self-center">
                          <p className={classNames(data.color ? "text-white" : "text-black", "pl-5 font-light text-sm ml-1")}>
                            {data.hari}
                          </p>
                        </div>
                        <div className="justify-self-end col-span-4">
                          <p className={classNames(data.color ? "text-white" : "text-black")} style={{ fontSize: '7px' }}>
                            {data.detail}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center h-5 mt-6">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <div className="ml-3 text-sm">
                <label htmlFor="comments" className="font-small text-xs text-gray-700">
                  Saya menyetujui <a href="#" className="text-blue-600">Syarat dan Ketentuan</a>
                </label>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
          </div>
          <div className="py-5 mx-1">
            <div className="relative flex items-center">
              <div>
                <label htmlFor="comments" className="font-small text-xs text-gray-700">
                  Punya Voucher? <a href="#" className="text-blue-600">Aktivasi disini</a>
                </label>
              </div>

              <div className="ml-auto">
                <button
                  type="button"
                  className="inline-flex self-center items-center px-8 py-3 border border-transparent text-xs leading-4 font-light rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Pilih Paket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex flex-col min-h-screen relative lg:hidden">
        <div className="w-full px-7 mt-24">
          <p className="font-medium text-2xl flex justify-center">
            Pembelian
          </p>
          <p className="font-medium text-gray-400 text-sm flex justify-center mt-4 text-center">
            Untuk berlangganan, tersedia berbagai paket yang sesuai dengan kebutuhanmu.
          </p>
        </div>
        <div className="w-full px-5 mt-8 mb-auto">
          <div className="rounded-lg">
            {detail.map((data) => (
              <>
                <div className="mt-6">
                  <Disclosure>
                    <Disclosure.Button className="w-full">
                      <div className="w-full rounded-lg flex h-20 border-black px-6 cursor-pointer" style={data.color ? { background: 'linear-gradient(90deg, rgba(0,36,3,1) 0%, rgba(212,13,150,1) 0%, rgba(73,88,218,1) 100%)' } : { border: '1px solid #b0c6e9' }}>
                        <div className="w-full h-20 flex self-center">
                          <input
                            id="windows"
                            value="windows"
                            name="platform"
                            type="radio"
                            className="self-center"
                          />
                          <div className="grid grid-cols-4 w-full grid-rows-4">
                            <div className="justify-self-start col-span-2 self-center row-span-4">
                              <p className={classNames(data.color ? "text-white" : "text-black", "font-normal text-sm ml-5")}>
                                {data.paket}
                              </p>
                            </div>
                            <div className="justify-self-end self-end col-span-2 row-span-2">
                              <p className={classNames(data.color ? "text-white" : "text-black", "font-semibold text-2xl ml-7")}>
                                {data.harga}
                              </p>
                            </div>
                            <div className="justify-self-end self-center col-span-2">
                              <p className={classNames(data.color ? "text-white" : "text-black", "pl-5 font-light text-xs ml-1")}>
                                {data.hari}
                              </p>
                            </div>
                            <div className="justify-self-end col-span-2">
                              <p className={classNames(data.color ? "text-white" : "text-black")} style={{ fontSize: '7px' }}>
                                {data.detail}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="text-gray-500">
                        <div className="w-full mt-4 rounded-lg py-6 px-8" style={{ backgroundColor: '#f6f9ff' }}>
                          <div className="flex justify-center">
                            <button
                              type="button"
                              className="rounded-3xl inline-flex items-center px-4 py-2 text-xs font-light shadow-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              style={{ background: 'linear-gradient(90deg, rgba(0,36,3,1) 0%, rgba(212,13,150,1) 0%, rgba(73,88,218,1) 100%)' }}
                            >
                              30 HARI
                            </button>
                          </div>

                          {paket.map((data) => (
                            <div className="w-full mt-9 flex">
                              <p className={classNames(data.icon ? "" : "text-gray-400", "font-semibold text-xs")}>
                                {data.nama}
                              </p>
                              {data.icon ? <img src={`../png/checklist-circle.png`} className="ml-auto" width="16px" height="16px" /> : <img src={`../png/close-circle.png`} className="ml-auto" width="16px" height="16px" />}
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </Disclosure>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="sticky bottom-0 mt-10 bg-white drop-shadow-3xl h-28 px-4 py-3.5">
          <div className="flex items-center h-5">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <div className="ml-3 text-sm">
              <label htmlFor="comments" className="font-small text-xs text-gray-700">
                Saya menyetujui <a href="#" className="text-blue-600">Syarat dan Ketentuan</a>
              </label>
            </div>

          </div>
          <div className=" mt-4">
            <button
              type="button"
              className="w-full self-center items-center px-8 py-3 border border-transparent text-xs leading-4 font-light rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Pilih Paket
            </button>
          </div>

        </div>
      </div>
    </>
  )
}
