import { useContext, createContext } from "react";

const AuthContext = createContext()

export function AuthProvider({ children, value }) {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

//Faz como se fosse um hook para importar o context e resgatar o usuário Autenticado
export function useAuthValue() {
    return (
        useContext(AuthContext)
    )
}
