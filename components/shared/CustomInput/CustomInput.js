import React from 'react'
import css from './CustomInput.module.css'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const CustomInput = React.forwardRef(({ onChange, onBlur, name, label, placeholder, type='text' }, ref) =>  {
    return (
        <div className={classNames("my-8", css.container)}>
            <div class={classNames("w-full", css.materialTextfield)}>
                <input className={classNames("focus:outline-none", css.materialInput)} placeholder={placeholder} type={type} name={name} ref={ref} onChange={onChange} onBlur={onBlur} />
                <label className={classNames("font-semibold text-gray-900", css.materialLabel)}> {label}</label>
            </div>
        </div>
    )
})

export default CustomInput