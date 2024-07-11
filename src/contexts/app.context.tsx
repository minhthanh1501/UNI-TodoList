import { createContext, ReactNode, useState } from "react"
import { getListTodosFromLocalStorage } from "../utils/helpers"

interface AppContextInterface {
    listTodos: string | null
    setListTodos: React.Dispatch<React.SetStateAction<string | null>>
    clearData: () => void,
}

export const getInitContext: () => AppContextInterface = () => ({
    listTodos: getListTodosFromLocalStorage(),
    setListTodos: () => null,
    clearData: () => null
})

const initialContext: AppContextInterface = getInitContext()

export const AppContext = createContext<AppContextInterface>(initialContext)

export default function AppProvider(
    { children, defaultContext = initialContext }:
        { children: ReactNode, defaultContext?: AppContextInterface }) {
    const [listTodos, setListTodos] = useState<string | null>(defaultContext.listTodos)
    const clearData = () => {
        setListTodos(null)
    }

    return (
        <AppContext.Provider
            value={{
                listTodos,
                setListTodos,
                clearData
            }}
        >
            {children}
        </AppContext.Provider>
    )
}