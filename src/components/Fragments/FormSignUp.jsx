import React, { useState } from 'react'
import LabeledInput from "../Elements/LabeledInput";
import CheckBox from '../Elements/CheckBox';
import Button from '../Elements/Button';
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Nama minimal 3 karakter")
    .required("Nama wajib diisi"),
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email wajib diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
});

function FormSignUp({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
    {/* form start */}
        <div className="mt-12">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await onSubmit(values.name, values.email, values.password);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* NAME */}
                <div className="mb-6">
                  <Field name="name">
                    {({ field }) => (
                      <LabeledInput 
                        {...field}
                        label="Name" 
                        type="text" 
                        placeholder="Tanzir Rahman" 
                        id="name" 
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* EMAIL */}
                <div className="mb-6">
                  <Field name="email">
                    {({ field }) => (
                      <LabeledInput 
                        {...field}
                        label="Email address" 
                        type="email" 
                        placeholder="hello@example.com" 
                        id="email" 
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-6">
                  <Field name="password">
                    {({ field }) => (
                      <LabeledInput
                        {...field}
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        id="password"
                        icon={
                          <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="p-1 text-gray-03 hover:text-gray-01 focus:outline-none focus:text-gray-01 transition-colors duration-200 rounded-sm hover:bg-gray-04"
                          >
                            {showPassword ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </button>
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* TERMS */}
                <div className="mb-3">
                  <div className="text-sm text-gray-01">
                    By continuing, you agree to our <span className="text-primary">Terms of service</span>
                  </div>
                </div>

                {/* BUTTON */}
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Loading..." : "Sign Up"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        {/* form end */}
        {/* teks start */}
        <div className="my-9 px-7 flex flex-col justify-center items-center text-xs text-gray-03">
          <div className="border border-gray-05 w-full"></div>
          <div className="px-2 bg-special-mainBg absolute"> or sign up with</div>
        </div>
        {/* teks end */}
        {/* sign up with google start */}
        <div className="mb-8">
            <Button type="button" variant="secondary">
  <span className="flex items-center justify-center">
		<svg
		  className="h-6 w-6 mr-2"
		  xmlns="http://www.w3.org/2000/svg"
		  xmlnsXlink="http://www.w3.org/1999/xlink"
		  width="800px"
		  height="800px"
		  viewBox="-0.5 0 48 48"
		  version="1.1"
		>
		  <title>Google-color</title> <desc>Created with Sketch.</desc>
		  <defs> </defs>
		  <g
			id="Icons"
			stroke="none"
			strokeWidth="1"
			fill="none"
			fillRule="evenodd"
		  >
			<g id="Color-" transform="translate(-401.000000, -860.000000)">
			  <g id="Google" transform="translate(401.000000, 860.000000)">
				<path
				  d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
				  id="Fill-1"
				  fill="#FBBC05"
				></path>
				<path
				  d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
				  id="Fill-2"
				  fill="#EB4335"
				></path>
				<path
				  d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
				  id="Fill-3"
				  fill="#34A853"
				></path>
				<path
				  d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
				  id="Fill-4"
				  fill="#4285F4"
				></path>
			  </g>
			</g>
		  </g>
		</svg>
		Continue with Google
  </span>
</Button>
            </div>
        {/* sign up with google end */}
        {/* link start */}
        <div className="flex justify-center">
          <Link to="/Login" className="text-sm font-bold">
            <span className="text-gray-03">Already have an account?</span> <span className="text-primary">Sign In Here</span>
          </Link>
        </div>
        {/* link end */}
    </>
  )
}

export default FormSignUp
