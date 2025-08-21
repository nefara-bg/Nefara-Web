import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RouteWrapper from './components/RouteWrapper/RouteWrapper'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme/theme'
import i18n from "./translation/i18n"
import { lazy, useEffect } from 'react'

const Home = lazy(() => import("./pages/Home/Home"))
const NotFound = lazy(() => import("./pages/NotFound/NotFound"))

function App() {
  useEffect(() => {
    const language = localStorage.getItem("lng")
    if(language) {
      i18n.changeLanguage(language)
    }
    else {
      i18n.changeLanguage(navigator.language)
      localStorage.setItem("lng", navigator.language)
    }
  }, [])



  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<RouteWrapper />}>
              <Route index element={<Home />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
