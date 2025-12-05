import React from 'react'
import Logo from "../Elements/Logo";

function AuthLayout(props) {
    const { children, title } = props;
  return (
    <>
      <main className="min-h-screen bg-special-mainBg flex justify-center items-center">
      {/* container start */}
      <div className="w-full max-w-sm">
        <Logo />
        {title && (
          <div className="text-center text-gray-04 text-2xl font-bold mt-6 mb-4">
            {title}
          </div>
        )}
        {children}
        {/* form */}
      </div>
      {/* container end */}
    </main>
    </>
  )
}

export default AuthLayout