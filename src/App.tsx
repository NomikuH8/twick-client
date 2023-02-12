import { BrowserRouter, Route, Routes } from "react-router-dom"
import EmptyPageWrapper from "./pageWrappers/EmptyPageWrapper"
import { ResponsiveLayout } from "./pageWrappers/Responsive"
import SetVarSys from "./pages/SetVarSys"
import NoUsers from "./pages/NoUsers"
import Home from "./pages/Home"

function App() {
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
