import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

  useEffect(() => {
    const fetchData = async () => {
      const user = await JSON.parse(localStorage.getItem("user"))
      if (user) {
        if (user.verified === "no") {
          const res = await fetch(process.env.REACT_APP_SERVER+"/api/institutions/check", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            mode: "cors",
            body: JSON.stringify({email: user.email})
          })
          const status = await res.json()
          user.verified = status
        }
        dispatch({type: "LOGIN", payload: {...user}})
        localStorage.setItem("user", JSON.stringify(user))
    }
  }
  fetchData()

  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}