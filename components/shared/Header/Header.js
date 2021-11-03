import { Disclosure } from '@headlessui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header({ data }) {
  const pages = [
    { name: 'Pembelian', href: '#', current: true },
    { name: 'Pembayaran', href: '#', current: false },
    { name: 'Verifikasi', href: '#', current: false },
  ]

  const rowLen = pages.length;

  return (
    <Disclosure as="nav" className="bg-white shadow z-10 fixed top-0 left-0 right-0">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center hidden lg:flex">
              <img
              className="h-4 w-40"
              src={`../png/transvision.png`}
              alt="TRANSVISION"
              />
            </div>


            <nav className="flex lg:ml-32" aria-label="Breadcrumb">
              <ol role="list" className="flex items-center space-x-4">
                {pages.map((page, index) => (
                  <li key={page.name}>
                    <div className="flex items-center">
                      <a
                        href={page.href}
                        className={classNames(
                          page.current ?
                            "text-blue-600 hover:text-blue-600" : "text-blue-300", "mr-4 text-sm font-semibold"
                        )}
                        aria-current={page.current ? 'page' : undefined}
                      >
                        {page.name}
                      </a>
                      {rowLen !== index + 1 && <FontAwesomeIcon icon={faCaretRight} className="flex-shrink-0 h-5 w-5 text-blue-400" aria-hidden="true" />}
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>

    </Disclosure>
  )
}
