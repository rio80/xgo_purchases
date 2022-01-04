import { EyeIcon } from '@heroicons/react/solid'
import * as React from 'react'
import { useController } from 'react-hook-form'
import css from './ComboBox.module.css'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ComboBox = ({ id, control, search = true, placeholder = 'Silahkan Pilih', data = [], variant = 'default', dataValue= '',message = 'data tidak ditemukan', name }) => {
    const [open, setOpen] = React.useState(false)
    const suggest = data
    const [searchTerm, setSearchTerm] = React.useState('');
    const [value, setValue] = React.useState(dataValue)

    if (!control) {
        return null;
    }

    const {
        field: { onChange, onBlur, name: fieldName, value: fieldValue, ref },
    } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: "",
    });

    const handleOpen = () => {
        setSearchTerm('')
        setOpen(!open)
    }

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const results = !searchTerm
        ? suggest
        : suggest.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );


    const handleSelect = (dataId,data) => {
        id(dataId)
        onChange(data)
        setValue(data)
        setOpen(!open)
    }

    const close = () => {
        setSearchTerm('')
        setOpen(false)
    }

    return (
        <div>
            <div className="mt-3.5 relative flex items-stretch flex-grow z-10">
                {value ? (
                    <div className={classNames("w-full mt-2", css.container)}>
                        <div class={classNames("w-full", css.materialTextfield)}>
                            <input
                                className={classNames("focus:outline-none", css.materialInput)}
                                placeholder={placeholder}
                                type="text"
                                onChange={onChange}
                                onBlur={onBlur}
                                onClick={handleOpen}
                                name={fieldName}
                                value={fieldValue}
                                ref={ref} />
                            <label className={classNames("font-semibold text-gray-900", css.materialLabel)}> {placeholder}</label>
                        </div>
                    </div>
                ) : (
                    <>
                        <button
                            type="button"
                            className={classNames(variant === 'default' ? "bg-gray-100 border-none" : "bg-white", "z-10 relative w-full rounded-lg shadow-sm py-3 px-4 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm")}
                            ariaHaspopup="listbox"
                            ariaExpanded="true"
                            onClick={handleOpen}
                            style={{ border: variant === 'default' ? '' : '1.5px solid rgb(219, 219, 219)' }}
                        >
                            <span class="block truncate font-semibold">
                                {placeholder}
                            </span>
                        </button>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <img src={'../png/right.png'}
                                className="h-5 w-5 text-gray-400 cursor-pointer"
                                aria-hidden="true"
                            />
                        </div>
                    </>
                )}

            </div>
            {
                open ? (
                    <>
                        <div className="absolute h-full w-full inset-0 z-20" onClick={close}></div>
                        <div class="relative rounded-md mt-2 z-20">
                            <div className="w-full shadow-lg rounded-md absolute z-20" style={{ backgroundColor: '#ebeef2' }}>
                                {search ?
                                    <div className="mt-3.5 py-4 relative flex items-stretch flex-grow ">
                                        <div className="absolute inset-y-0 left-0 pl-8 flex items-center text-sm leading-5">
                                            <img src={'../png/search.png'} />
                                        </div>
                                        <input
                                            type="text"
                                            name="password"
                                            placeholder="Cari"
                                            className="mx-4 py-2.5 pl-12 pr-7 block w-full font-semibold sm:text-sm border-none rounded-lg"
                                            onChange={handleChange}
                                            autoFocus
                                        />
                                    </div> : ''}
                                <ul class="w-full max-h-60 py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                                    {results.length === 0 ? (
                                        <li className="text-gray-900 cursor-default select-none relative py-3 px-4 pr-9 hover:bg-gray-100" id="listbox-option-0" role="option" onClick={() => handleSelect('')}>
                                            <span className="font-semibold block">
                                                {message}
                                            </span>
                                        </li>
                                    ) : (
                                        <>
                                            {results.map((data, idx) => (
                                                <li key={idx} className="text-gray-900 cursor-default select-none relative py-3 px-4 pr-9 hover:bg-gray-100" id="listbox-option-0" role="option" onClick={() => handleSelect(data.id,data.name)}>
                                                    <span className="font-semibold block">
                                                        {data.name}
                                                    </span>
                                                </li>
                                            ))}
                                        </>
                                    )}
                                </ul>
                            </div>

                        </div>
                    </>
                ) : ('')
            }
        </div >
    )
}

export default ComboBox