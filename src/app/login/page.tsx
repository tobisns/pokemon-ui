'use client'

import {Formik,Field,Form} from "formik";
import { useRouter } from 'next/navigation'
import { login } from "../../services/auth";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .max(32, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .required('Required'),
  });

export default function Login() {
    const { push } = useRouter();
    
    return (
        <div className="bg-[#c0c0c0]">
            <div
                className="bg-gradient-to-b from-[rgba(209,209,209,0.2)] to-white flex flex-col justify-center items-center min-h-screen overflow-y-auto">
            <div className="bg-black w-full md:w-[60vh] max-w-max-content h-fit-content rounded-lg flex flex-col justify-center items-center md:p-8 pt-5">
                <h4 className="text-center text-white w-full md:w-20% text-lg">
                    Log in to Pokemon UI
                </h4>
                <hr className="bg-white w-full h-[1px] my-3 hidden md:block" />
                    <Formik 
                    initialValues={{
                        username: '',
                        password: '',
                    }} 
                    validationSchema={SignupSchema}
                    onSubmit={async (values) => {
                        try {
                            const res = await login(values);
                            console.log(res)
                            if(res) {
                                toast.success("Login Successful! 🎉")
                                localStorage.setItem("isAdmin", res.is_admin)
                                push("/userarea/home")
                            }
                        } catch (err) {
                            console.log(err)
                            toast.error("Login Failed 😞")
                        }
                    }}
                    >
                        {({ errors, touched ,isSubmitting}) => (
                        <Form className="flex flex-col gap-2 p-5 w-full">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="username" className="sub-1 text-white">Username</label>
                                <Field type="text" name="username" placeholder="Username" id="username"
                                       className="sub-1 rounded px-2 py-1 border border-white bg-white text-black" />
                                {errors.username && touched.username ? (
                                    <p className="tag text-red-500">{errors.username}</p>
                                ) : null}
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="password" className="sub-1 text-white">Password</label>
                                <Field type="password" name="password" placeholder="Password" id="password" autoComplete="on"
                                       className="sub-1 rounded px-2 py-1 border border-white bg-white text-black" />
                                {errors.password && touched.password ? (
                                    <p className="tag text-red-500">{errors.username}</p>
                                ) : null}
                            </div>
                            <div className="form-button">
                                <button type="submit" className="button bg-white w-full border-0 rounded-full py-2" disabled={isSubmitting}>Log in</button>
                            </div>
                        </Form>
                            )}
                    </Formik>
                </div>
            </div>
            <Toaster/>
        </div>

    )
}