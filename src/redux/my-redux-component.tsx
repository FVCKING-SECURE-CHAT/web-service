import { Provider } from "react-redux"
import { store } from "./store"

export const MyReduxComponent = ({ children }: any) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}