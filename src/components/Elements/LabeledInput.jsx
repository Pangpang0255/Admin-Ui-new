import React from 'react'

function LabeledInput(props) {
    const { label, type, placeholder, name, id, icon, ...rest } = props;
  return (
    <>
    <label htmlFor={id} className="block text-sm mb-2">
                {label}
              </label>
              <div className="relative">
                <input
                  type={type}
                  placeholder={placeholder}
                  name={name}
                  className={`py-3 pl-4 text-sm rounded-md w-full bg-special-mainBg border border-gray-03 text-gray-01 focus:border-black focus:outline-none focus:ring-0 ${icon ? 'pr-12' : ''}`}
                  id={id}
                  {...rest}
                />
                {icon && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {icon}
                  </div>
                )}
              </div>
    </>
  )
}

export default LabeledInput