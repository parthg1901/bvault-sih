import { createContext, useReducer, useEffect } from 'react'

export const AdminContext = createContext()

export const adminReducer = (state, action) => {
  switch (action.type) {
    case 'ADMIN':
      return { admin: true }
    case 'NOTADMIN':
      return { admin: null }
    default:
      return state
  }
}

export const AdminContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, { 
    admin: null
  })

  useEffect(() => {
    const fetchData = async () => {
        const admin = localStorage.getItem("admin")
        if (admin === "yes") {
            dispatch({type: "ADMIN"})
        }
    }
    fetchData()

  }, [])

  console.log('AdminContext state:', state)
  
  return (
    <AdminContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AdminContext.Provider>
  )

}