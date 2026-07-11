import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";

function App() {

  return (
    <> 
      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
      >
      <source src="/13820343_3840_2160_30fps.mp4" type="video/mp4" />
      </video>

    <div className="video-overlay"></div>

    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

    </>

  )
}

export default App
