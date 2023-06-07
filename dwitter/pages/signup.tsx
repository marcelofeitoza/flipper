import Image from "next/image"
import { Layout } from "@/components/Layout"

import metamask from '@/assets/icons/metamask.svg'
import Link from "next/link"

import { verifyConnectToMetamask } from "@/utils/verifyConnectToMetamask"
import  Cookies  from "universal-cookie"
import { useEffect, useState } from "react"
import userService from "@/services/userService"
import { useRouter } from 'next/navigation';
import toast, { Toaster } from "react-hot-toast"


const SignUp = () => {

    const [ address, setAddress ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ name, setName ] = useState("")

    const router = useRouter();

    const cookie = new Cookies()

    async function Subscribe() {
        try {
            const response = await userService.register(address, password, name, email)
            toast.success("User created successfully")
            try {
                const response = await userService.auth(address, password)
                cookie.set("token", response.data.access_token)
                setTimeout(() => {
                    router.push("/")
                }, 2000)
            } catch (err) {
                console.log(err)
                toast.error("Invalid credentials")
            }
        } catch (err) {
            console.log(err)
            toast.error("Invalid infos")
        }
    }  
    
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        setAddress(urlParams.get('address'))
    }, [])

    return (
        <Layout title={"Login"} navbar={false}>
            <Toaster />
            <div className="flex flex-1">
                <div className="bg-[#7CB4B8] w-1/2 flex flex-col flex-1 items-center justify-center h-full">
                    <div className="mb-8 flex flex-col items-center">
                        <p className="text-7xl font-semibold text-white text-center mb-4">Welcome to<br />Dwitter</p>

                        <p className="text-xl text-white font-medium text-center">Share, donate, create</p>
                    </div>

                    <Image width={256} alt="Metamask" src={metamask} />
                </div>

                <div className="w-1/2 flex flex-col items-center justify-center h-full">
                    <p className="text-4xl font-medium mb-16">Sign Up into Dwitter</p>

                    <div className="w-full md:w-2/5 flex flex-col items-center">
                        <div className="w-full">

                            <div>
                                <p className="text-2xl text-[#7cb4b8]">Address</p>
                                <input className="border-2 border-[#7cb4b8] rounded-lg w-full px-4 placeholder:text-[#7cb4b8] focus:border-blue-500 py-2" disabled value={address} type="text" placeholder="email@email.com" />
                            </div>
                            
                            <div>
                                <p className="text-2xl text-[#7cb4b8]">Email</p>
                                <input onChange={event => setEmail(event.target.value)} className="border-2 border-[#7cb4b8] rounded-lg w-full px-4 placeholder:text-[#7cb4b8] focus:border-blue-500 py-2" type="text" placeholder="email@email.com" />
                            </div>

                            <div>
                                <p className="text-2xl text-[#7cb4b8]">Name</p>
                                <input onChange={event => setName(event.target.value)} className="border-2 border-[#7cb4b8] rounded-lg w-full px-4 placeholder:text-[#7cb4b8] focus:border-blue-500 py-2" type="text" placeholder="Full Name" />
                            </div>

                            <div>
                                <p className="text-2xl text-[#7cb4b8]">Password</p>
                                <input onChange={event => setPassword(event.target.value)} className="border-2 border-[#7cb4b8] rounded-lg w-full px-4 py-2 placeholder:text-[#7cb4b8] focus:border-blue-500" type="password" placeholder="********" />
                            </div>

                            <button onClick={() => {Subscribe()}} className="bg-[#7CB4B8] text-white font-semibold text-xl rounded-lg px-4 py-2 justify-center flex items-center p-2 mt-8 w-full">
                                SignUp
                            </button>

                            {/* <div className="w-full flex justify-end">
                                <Link href="/signup" className="text-[#7CB4B8] text-sm underline text-end">I don't have an account</Link>
                            </div> */}
                        </div>
                        
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default SignUp