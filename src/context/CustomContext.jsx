import { createContext, useState } from 'react'
import axios from '../api/axios'
import { message } from 'antd'

const CustomContext = createContext()

export const CustomContextProvider = ({ children }) => {

    // logged user
    const user = JSON.parse(localStorage.getItem('user')) || {}

    // tasks
    const [ tasks, setTasks ] = useState([])
    const [ currentTask, setCurrentTask ] = useState({})
    const [ unfinishedTask, setUnfinishedTask ] = useState([])

    const getTasks = async() => {
        await axios('/task/list')
        .then( response => setTasks( response.data.data ))
        .catch( error => { console.log(error) })
    }
    
    const getCurrentTask = async(task_id) => {
        await axios(`/task/byId/${task_id}`)
        .then( response => setCurrentTask( response.data.data ))
        .catch( error => { console.log(error) })
    }

    // subtasks
    const [ currentSubtask, setCurrentSubtask ] = useState({})

    // users
    const [ users, setUsers ] = useState([])
    const [ currentUser, setCurrentUser ] = useState({})

    const getUsers = async () => {
        await axios('/user/list')
        .then( response =>  setUsers( response.data.data ))
        .catch( error => {
            if( error.response.data.message ) message.error( error.response.data.message )
            else message.error( error.message )
        })
    }

    // user logged in
    const [ loggedUser, setLoggedUser ] = useState({})

    // notification
    const [ notifications, setNotifications ] = useState([])

    // get all notifications
    const getNotifications = async () => {
        await axios('/notification/list')
        .then( response =>  setNotifications( response.data.data ))
        .catch( error => {
            if( error.response.data.message ) message.error( error.response.data.message )
            else message.error( error.message )
        })
    }

    // current user notification
    const currentUserNotifications = user.user_role == 'approving'
    ? notifications.filter( notification => notification.notification_receiver == null || notification.notification_receiver == user.user_id )
    : notifications.filter( notification => notification.notification_receiver == user.user_id )

    // new notification
    const notificationCount = currentUserNotifications.filter( notification => notification.notification_status == 'new').length

    // check tasks
    const checkTasks = async () => {
        await axios('/task/check')
        .then( response =>  setUnfinishedTask( response.data.data ))
        .catch( error => {
            if( error.response.data.message ) message.error( error.response.data.message )
            else message.error( error.message )
        })
    }

    return(
        <CustomContext.Provider value = {{

            // task
            tasks,
            currentTask,
            setCurrentTask,
            getTasks,
            getCurrentTask,
            unfinishedTask,
            checkTasks,

            // subtask
            currentSubtask,
            setCurrentSubtask,

            // user
            users,
            setUsers,
            currentUser,
            setCurrentUser,
            getUsers,

            // logged user
            loggedUser,
            setLoggedUser,

            // notification
            currentUserNotifications,
            notificationCount,
            getNotifications,
        }}>
            { children }
        </CustomContext.Provider>
    )
}

export default CustomContext