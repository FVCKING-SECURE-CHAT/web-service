'use client'

import { IAuthReducerInitialState, setLoading, setSession } from "@/redux/reducers/authReducer"
import { GetCurrentSession } from "@/services/auth-service"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadingComponent } from "../loading-component"
import { useRouter } from "next/navigation"


export const BasicAuthProviderComponent = ({ children }: any) => {

    const auth = useSelector((state: any) => state.auth as IAuthReducerInitialState)
    const dispatch = useDispatch()
    const router = useRouter()

    const fetchSession = async () => {
        const session = await GetCurrentSession() // server action no worries :)

        if (!session) {
            dispatch(setLoading(false))
        } else {
            dispatch(setSession(session))
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        fetchSession();
        const interval = setInterval(() => {
            fetchSession();
        }, 5500);

        // nice and cool :)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            {children}
            {/* Dependenjy injection :) */}
            <div className={`fixed ${auth.loading ? 'bottom-4 right-4 scale-100' : '-bottom-0 right-0 scale-75 opacity-0'} w-10 h-10 rounded-md border border-border bg-white shadow-xl p-2 duration-300 transition-all`}>
                <LoadingComponent />
            </div>
        </>
    )
}