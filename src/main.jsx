import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { CustomContextProvider } from './context/CustomContext.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/authentication/LoginPage.jsx'
import PageNotFound from './pages/error/PageNotFound.jsx'
import SignUpPage from './pages/authentication/SignUpPage.jsx'
import OtpChecking from './pages/authentication/OtpChecking.jsx'
import EmailCheking from './pages/authentication/EmailCheking.jsx'
import NewPassword from './pages/authentication/NewPassword.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <CustomContextProvider>
          <Routes>

            <Route index element = { <LoginPage />} />
            <Route path = '/signup' element = { <SignUpPage />} />
            <Route path = '/otpcheking' element = { <OtpChecking />} />
            <Route path = '/emailcheking' element = { <EmailCheking />} />
            <Route path = '/newpassword' element = { <NewPassword />} />

            <Route path = '/aqs/*' element = { <App /> } />
            <Route path = '*' element = { <PageNotFound /> } />

          </Routes>
          
        </CustomContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
