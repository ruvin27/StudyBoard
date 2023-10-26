import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import io from 'socket.io-client'

// const serverURL = "http://localhost:5000";
const serverURL = 'https://studyboardchat.azurewebsites.net/'
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [socket, setSocket] = useState(null)

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    handleDisconnect(user)
    setUser(null)
    localStorage.removeItem('user')
  }

  const handleConnect = () => {
    console.log('Socket connected')
  }

  const handleDisconnect = useCallback(
    (user) => {
      if (!socket) return
      socket.emit('user_disconnect', { email: user.email })
    },
    [socket]
  )

  useEffect(() => {
    if (socket) {
      socket.on('connect', handleConnect)
      socket.on('disconnect', handleDisconnect)

      return () => {
        socket.off('connect', handleConnect)
        socket.off('disconnect', handleDisconnect)
      }
    }
  }, [handleDisconnect])

  useEffect(() => {
    if (!user) {
      socket?.disconnect()
      return
    }

    const userData = {
      userid: user.userid,
      name: user.name,
      email: user.email,
      role: user.role,
    }

    const newSocket = io.connect(serverURL)
    newSocket.emit('user_connected', userData)
    setSocket(newSocket)
  }, [user])

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!user) {
      return localStorage.removeItem('user')
    }

    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, socket }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an <AuthProvider />')
  }

  return useContext(AuthContext)
}
