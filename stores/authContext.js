import { createContext } from 'react'
import netlifyIdentity from 'netlify-identity-widget'
import { useState, useEffect } from 'react'

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    authReady: false
})

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authReady, setAuthReady] = useState(false)

    useEffect(() => {
        netlifyIdentity.on('login', (user) => {
            setUser(user)
            netlifyIdentity.close()
            console.log('Login Event')
        })

        netlifyIdentity.on('logout', (user) => {
            setUser(null)
            console.log('Logout Event')
        })

        netlifyIdentity.on('init', (user) => {
            setUser(user)
            setAuthReady(true)
            console.log('Init Event')
        })

        // configure netlify identity connection
        netlifyIdentity.init()

        return () => {
            // Unregistering the listeners
            netlifyIdentity.off('login')
        }
    }, [])

    const login = () => {
        netlifyIdentity.open()
    }

    const logout = () => {
        netlifyIdentity.logout()
    }

    const context = { user, login, logout, authReady }

    return (
        <AuthContext.Provider value={context}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext