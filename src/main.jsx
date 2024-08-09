import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, Spinner } from '@chakra-ui/react'
import { CustomContextProvider } from './context/CustomContext.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <CustomContextProvider>
          <App />
        </CustomContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
