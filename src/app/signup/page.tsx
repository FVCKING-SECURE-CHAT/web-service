'use client'

import { LoadingComponent } from "@/components/loading-component"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { IAuthReducerInitialState, setLoading } from "@/redux/reducers/authReducer"
import { SignIn, SignUp } from "@/services/auth-service"
import { InfoCircledIcon, SunIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"

export default function SignInPage() {
    const [name, setName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repassword, setRepassword] = useState<string>('')

    const auth = useSelector(({ auth }: any) => auth as IAuthReducerInitialState)

    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogin = async () => {
        dispatch(setLoading(true))
        const res = await SignUp(username, password, repassword, name);

        if (res === true) {
            toast.success('Signup success, Redirecting...')
            dispatch(setLoading(false))
            router.push('/signin')
        } else {
            toast.error(<div className="capitalize font-geist-sans">{res}</div>)
            dispatch(setLoading(false))
        }
    }

    return (
        <div className="w-full flex h-screen flex-col items-center justify-center p-4 lg:p-0">

            <div className='w-full md:w-96 font-geist-sans h-auto bg-white shadow-lg border border-border p-6 rounded-lg'>
                <h1 className="text-xl tracking-tight">Welcome to fucking secure chat.</h1>
                <p className="text-zinc-800 opacity-70">Please signup to continue</p>
                <div className="mt-1.5">
                    <Label className="text-primary/70" htmlFor="name" title="Name">Name</Label>
                    <Input disabled={auth.loading} type="text" id="name" name="name" className="px-2 py-1.5 h-fit rounded-md ring-ring/30 ring-1 active:ring-2 focus:ring-2 duration-200 transition-all" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                </div>

                <div className="mt-1.5">
                    <Label className="text-primary/70" htmlFor="username" title="Username">Username</Label>
                    <Input disabled={auth.loading} type="text" id="username" name="username" className="px-2 py-1.5 h-fit rounded-md ring-ring/30 ring-1 active:ring-2 focus:ring-2 duration-200 transition-all" value={username} onChange={(e) => setUsername(e.currentTarget.value.toLowerCase())} />
                </div>

                <div className="mt-1.5">
                    <Label className="text-primary/70" htmlFor="password" title="Password">Password</Label>
                    <Input disabled={auth.loading} type="password" id="password" name="password" className="px-2 py-1.5 h-fit rounded-md ring-ring/30 ring-1 active:ring-2 focus:ring-2 duration-200 transition-all" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                </div>

                <div className="mt-1.5">
                    <Label className="text-primary/70" htmlFor="repassword" title="Re password">Re password</Label>
                    <Input disabled={auth.loading} type="password" id="repassword" name="repassword" className="px-2 py-1.5 h-fit rounded-md ring-ring/30 ring-1 active:ring-2 focus:ring-2 duration-200 transition-all" value={repassword} onChange={(e) => setRepassword(e.currentTarget.value)} />
                </div>

                <div className="mt-4">
                    <Button onClick={handleLogin} disabled={auth.loading} className="py-1.5 px-4 w-full h-8">
                        {
                            auth.loading ? (
                                <div className="h-5">
                                    <LoadingComponent color="white" />
                                </div>
                            ) : (
                                <>
                                    signin
                                </>
                            )
                        }
                    </Button>
                </div>

                <div className="mt-4 space-y-2">
                    <Separator />

                    <div className="flex flex-row gap-1 text-zinc-800/70 text-sm">
                        Allready have an account ? <a href="/signin" className="text-zinc-800 underline underline-offset-4">Signin</a> here.
                    </div>
                </div>
            </div>

        </div>
    )
}