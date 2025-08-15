import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RouteWrapper from './components/RouteWrapper/RouteWrapper'
import Home from './pages/Home/Home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RouteWrapper />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
