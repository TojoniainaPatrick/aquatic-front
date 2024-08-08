import { Outlet, Route, Routes } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import Task from './pages/tasks/Task'
import Dashboard from './pages/dashboard/Dashboard'
import NewTask from './pages/tasks/NewTask'
import UpdateTask from './pages/tasks/UpdateTask'
import TaskDetail from './pages/tasks/TaskDetail'
import Profile from './pages/profile/Profile'
import User from './pages/user/User'
import ChangePass from './pages/profile/ChangePass'
import RequireAuth from './pages/security/RequireAuth'
import Unothaurized from './pages/error/Unothaurized'

function App() {

  return (
    <>
      <NavBar />
      <div className="page-content">

        <Outlet />
        {/* <Routes>

          <Route  element = { <RequireAuth allowedRoles = {['approving', 'director']} />} >

            <Route path = '/dashboard' element = { <Dashboard /> } />

            <Route path = '/profile' element = { <Profile /> } />
            <Route path = '/profile/changePass' element = { <ChangePass /> } />

            <Route path = '/task' element = { <Task /> } />
            <Route path = '/task/new' element = { <NewTask /> } />
            <Route path = '/task/update' element = { <UpdateTask /> } />
            <Route path = '/task/detail/:task_id' element = { <TaskDetail /> } />

            <Route path = '/unothaurized' element = { <Unothaurized /> } />

          </Route>

          <Route  element = { <RequireAuth allowedRoles = {['approving']} />} >
            <Route path = '/user' element = { <User /> } />
          </Route>

        </Routes> */}
      </div>
    </>
  )
}

export default App
