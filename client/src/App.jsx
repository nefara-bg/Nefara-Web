import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RouteWrapper from './components/RouteWrapper/RouteWrapper'
import Home from './pages/Home/Home'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme/theme'

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<RouteWrapper />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
