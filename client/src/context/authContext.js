import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || false
    );

    const login = () => {
        setCurrentUser({ 
            id: 1, 
            name: "JT Go", 
            profilePic: "https://th.bing.com/th/id/R.e7e9781ae5651742f6dcb1ae532b7570?rik=rkCZz0EbWYBsyQ&riu=http%3a%2f%2fapplesofgoldcommunications.com%2fwp-content%2fuploads%2f2016%2f08%2fsocialmedia.jpg&ehk=q29%2fj3EZI5r4wZdMBCl3OZJzy%2buYIpR4VcD7O3SRt%2bU%3d&risl=&pid=ImgRaw&r=0"
        })
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            { children }
        </AuthContext.Provider>
    )
}