import React, { useContext, useState, useEffect } from 'react'


const AuthContext = React.createContext()
export function useAuth() {
  return useContext(AuthContext)
;}

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)

  const onSaveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
  };
  
  useEffect(() => {
    let savedData = localStorage.getItem("user");
    savedData = JSON.parse(savedData)
    setUser(savedData);
  }, []);

  const onLogout = (user) => {
    localStorage.removeItem("user");
    setUser(null);
  }

  const value = {
    user,
    onSaveUser,
    onLogout
  }
  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}