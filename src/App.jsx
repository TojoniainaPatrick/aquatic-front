import { Outlet } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import useCustomContext from './context/useCustomContext'
import { Spin } from 'antd'
import { Modal } from '@chakra-ui/react'

function App() {

  const {
    loading
  } = useCustomContext()

  return (
    <>
      
      {/* loading page */}
      <Spin className = { loading ? 'load' : 'unload' } />

      <NavBar />
      <div className="page-content">
        <Outlet />
      </div>
    </>
  )
}

export default App
