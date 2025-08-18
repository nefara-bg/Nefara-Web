import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RouteWrapper from './components/RouteWrapper/RouteWrapper'
import Home from './pages/Home/Home'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme/theme'
import i18n from "./translation/i18n"
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    i18n.changeLanguage(navigator.language)
  }, [])



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
