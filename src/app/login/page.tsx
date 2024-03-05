'use client'

import axios from "axios";
import {Formik,Field,Form} from "formik";
import { useRouter } from 'next/navigation'

export default function Login() {
    const { push } = useRouter();
    
    return (
        <div className="bg-[#c0c0c0]">
            <div
                className="bg-gradient-to-b from-[rgba(209,209,209,0.2)] to-white flex flex-col justify-center items-center min-h-screen overflow-y-auto">
            <div className="bg-[#820101] w-full md:w-[60vh] max-w-max-content h-fit-content rounded-lg flex flex-col justify-center items-center md:p-8 pt-5">
                <h4 className="text-center text-white w-full md:w-20% text-lg">
                    Log in to Monitoring
                </h4>
                <hr className="bg-white w-full h-[1px] my-3 hidden md:block" />
                    <Formik initialValues={{
                        username: '',
                        password: '',
                    }} onSubmit={async (values) => {
                        axios.post('http://localhost:18080/users/login',{
                            username:values.username,
                            password:values.password,
                        },{
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                "Access-Control-Allow-Headers": "access-control-allow-origin, access-control-allow-headers",
                                'Content-Type': 'application/json'
                            },
                            withCredentials: true
                        }).then((res) => {
                            console.log(res.headers)
                            console.log(res.data.token)
                            setTimeout(()=>{
                                push("/home")
                            },1000)
                        }).catch(()=>{
                        })
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
        </div>

    )
}