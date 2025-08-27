import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RouteWrapper from './components/RouteWrapper/RouteWrapper'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme/theme'
import i18n from "./translation/i18n"
import { lazy } from 'react'

const Home = lazy(() => import("./pages/Home/Home"))
const NotFound = lazy(() => import("./pages/NotFound/NotFound"))

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<Navigate to={'/en'} replace />} />
            <Route path='/:lng/' element={<RouteWrapper />}>
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
