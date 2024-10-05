'use client'

import { Provider } from "react-redux"
import { store } from "./store"
import { TooltipProvider } from "@/components/ui/tooltip"
import { BasicAuthProviderComponent } from "@/components/auth/BasicAuthProvider"
import { Toaster } from "sonner"

export const MyReduxComponent = ({ children }: any) => {
    return (
        <TooltipProvider
            delayDuration={2200}
            skipDelayDuration={180}
        >
            <Provider store={store}>
                <BasicAuthProviderComponent>
                    {children}
                    <Toaster />
                </BasicAuthProviderComponent>
            </Provider>
        </TooltipProvider>
    )
}