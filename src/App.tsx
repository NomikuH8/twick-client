import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect } from "react"

import EmptyPageWrapper from "./pageWrappers/EmptyPageWrapper"
import { ResponsiveLayout } from "./pageWrappers/Responsive"
import Recommendations from "./pages/Recommendations"
import { getUser } from "./wrappers/user"
import SetVarSys from "./pages/SetVarSys"
import NoUsers from "./pages/NoUsers"
import Tweeter from "./pages/Tweeter"
import Home from "./pages/Home"

function App() {
  useEffect(() => {
    ;(async () => {
      const user = await getUser()
      localStorage.setItem("loggedUserId", user.id)
    })()
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<EmptyPageWrapper />}>
            <Route
              path="setvarsys"
              element={<SetVarSys />}
            />
            <Route
              path="nousers"
              element={<NoUsers />}
            />
          </Route>
          <Route element={<ResponsiveLayout />}>
            <Route
              index
              element={<Home />}
            />
            <Route
              path="tweeter"
              element={<Tweeter />}
            />
            <Route
              path="recommendations"
              element={<Recommendations />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
