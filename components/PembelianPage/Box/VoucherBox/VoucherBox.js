import * as React from 'react'
import { RadioGroup } from '@headlessui/react'

const plans = [
    {
        name: 'CATCHPLAY - Rp 409,000',
    },
    {
        name: 'CATCHPLAY - Rp 700,000',
    }
]

export default function VoucherBox() {
    const [selected, setSelected] = React.useState(plans)

    return (
        <div className="w-full mt-5">
            <div className="w-full max-w-md mx-auto">
                <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                    <div className="space-y-5">
                        {plans.map((plan) => (
                            <RadioGroup.Option
                                key={plan.name}
                                value={plan}
                                className={({ active, checked }) =>
                                    `${active ? '' : ''}
                                    ${checked ? 'bg-blue-900 bg-opacity-75 text-white' : 'bg-gray-100'}
                                    relative rounded-lg px-5 py-4 cursor-pointer flex focus:outline-none`
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center">
                                                {checked && (
                                                    <div className="flex-shrink-0 text-white">
                                                        <CheckIcon className="w-6 h-6" />
                                                    </div>
                                                )}
                                                <div className="text-sm">
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={`font-medium ml-14 ${checked ? 'text-white ml-8' : 'text-gray-900'}`}
                                                    >
                                                        {plan.name}
                                                    </RadioGroup.Label>

                                                </div>
                                            </div>

                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}