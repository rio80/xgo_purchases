import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const details = [
    {
      paket: 'Paket 30 Hari VOD',
      harga: 'Rp9.900',
      hari: '/30 Hari',
      detail: '*Hingga 31 Oktober 2021',
      color: true
    }, {
      paket: 'Paket 7 Hari Linear TV + VOD',
      harga: 'Rp9.900',
      hari: '/30 Hari',
      detail: '*Hingga 31 Oktober 2021',
      color: false
    }, {
      paket: 'Paket 30 hari Linear TV + VOD',
      harga: 'Rp9.900',
      hari: '/30 Hari',
      detail: '*Hingga 31 Oktober 2021',
      color: false
    }
  ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Radio() {
  const [selected, setSelected] = useState(details[0])

  return (
    <RadioGroup value={selected} onChange={setSelected}>      
    <div className="space-y-9">
        {details.map((detail, detailIdx) => (
          <RadioGroup.Option
            key={detail.name}
            value={detail}
            className={({ checked }) =>
              classNames(
                checked ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200',
                'rounded-lg relative border p-4 flex cursor-pointer focus:outline-none'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={classNames(
                    checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                    active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                    'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                  )}
                  aria-hidden="true"
                >
                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                </span>
                <div className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={classNames(checked ? 'text-indigo-900' : 'text-gray-900', 'block text-sm font-medium')}
                  >
                    {detail.paket} {detail.harga}
                  </RadioGroup.Label>

                  
                  {/* <RadioGroup.Description
                    as="span"
                    className={classNames(checked ? 'text-indigo-700' : 'text-gray-500', 'block text-sm')}
                  >
                    {detail.description}
                  </RadioGroup.Description> */}
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
