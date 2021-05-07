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

        // configure netlify identity connection
        netlifyIdentity.init()

        return () => {
            // Unregistering the listeners
            netlifyIdentity.off('login')
            netlifyIdentity.off('logout')
        }
    }, [])

    const login = () => {
        netlifyIdentity.open()
    }

    const logout = () => {
        netlifyIdentity.logout()
    }

    const context = { user, login, logout }

    return (
        <AuthContext.Provider value={context}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext