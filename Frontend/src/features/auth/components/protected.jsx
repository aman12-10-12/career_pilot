import {useAuth} from "../hooks/useAuth.js"
import { Navigate } from "react-router"

const Protected = ({children}) => {
  const { loading, user } = useAuth()


  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if(!user) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default Protected
