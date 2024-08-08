import { Link } from "react-router-dom";
import useCustomContext from "../../context/useCustomContext";
import { Avatar, Button, message, Progress } from "antd";
import { CheckCircleFilled, DeleteOutlined, DropboxSquareFilled, EditTwoTone, InfoCircleFilled } from "@ant-design/icons";
import PopupConfirm from "../../components/popup_confirm/PopupConfirm";
import { handleApprove, handleDelete, handleReject } from "../../services/tasks/taskServices";
import CustomTable from "../../components/datadisplay/CustomTable";
import { columns } from "../../services/tasks/taskConstant";
import PopupMenu from "../../components/popup_menu/PopupMenu";

export default function TaskTable({ search, pagination }){

    const {
        currentTask,
        getTasks,
        tasks,
        setCurrentTask
    } = useCustomContext()

    const user = JSON.parse(localStorage.getItem('user'))
    const user_role = user.user_role?.toString().toLowerCase()
    const user_id = user?.user_id
    
    // list of a task actions
    const popup_menu_items = taskItem => {
      return [
        {
          label: <Link to = {`/aqs/task/detail/${ currentTask.task_id }`}><Button type = 'default'> Détails </Button></Link>,
          key: '1',
          icon: <InfoCircleFilled />
        },

        ( ( user_role == 'approving' || 
        user_id == taskItem.task_created_by ) && ['new', 'approved', 'rejected'].includes(taskItem.task_status?.toString().toLowerCase()) )
        && {
          label: <Link to = '/aqs/task/update'> <Button> Modifier </Button> </Link>,
          key: '2',
          icon: <EditTwoTone />
        },

        ( user_role == 'approving' || 
          user_id == taskItem.task_created_by )
          && {
          label: <PopupConfirm
            title = 'Suppression de tâche'
            description = 'Voulez-vous continuer la suppression?'
            confirm = { () => handleDelete( currentTask, message, getTasks ) }
            cancel = { () => {} }
            buttonTitle = 'Supprimer'
          />,
          key: '3',
          icon: <DeleteOutlined  color = 'lightgray'/>
        },

        ( user_role == 'approving' && 
          ['new', 'rejected'].includes(taskItem.task_status?.toString().toLowerCase()))
          && {
          label: <PopupConfirm
            title = 'Approbation de tâche'
            description = 'Voulez-vous continuer?'
            confirm = { () => handleApprove( currentTask, message, getTasks ) }
            cancel = { () => {} }
            buttonTitle = 'Approuver'
          />,
          key: '4',
          icon: <CheckCircleFilled  color = 'lightgray'/>
        },

        ( user_role == 'approving' && 
          ['new', 'approved'].includes(taskItem.task_status?.toString().toLowerCase()))
          && {
          label: <PopupConfirm
            title = 'Approbation de tâche'
            description = 'Voulez-vous continuer?'
            confirm = { () => handleReject( currentTask, message, getTasks ) }
            cancel = { () => {} }
            buttonTitle = 'Rejeter'
          />,
          key: '5',
          icon: <DropboxSquareFilled  color = 'lightgray'/>
        }
      ]
    }
  
      // task list
      const data = tasks
      .filter( task => 
        task.task_name?.toString().toLowerCase().includes(search.toString().toLowerCase()) ||
        task.User?.user_name?.toString().toLowerCase().includes(search.toString().toLowerCase())
      )
      .map( task => {
  
          const subtasksCount = task.SubTasks.length
          const finished_sub_task = task.SubTasks.filter( subtask => subtask.subtask_status.toString().toLowerCase() == 'finished').length
          const progress = ( Number(finished_sub_task) * 100 ) / subtasksCount;
          const percent = progress ? progress.toFixed(1) : ( task.SubTasks.length == 0 && task.task_status.toString().includes('finish') ) ? 100 : 0
  
          return {
              task_name: task.task_name,
              user_name: <><Avatar size = 'sm' src = { task.User.user_image_url }/> <span> { task.User.user_name } </span> </>,
              task_start_date: task.task_start_date ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(task.task_start_date)) : '',
              task_end_date: task.task_end_date ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(task.task_end_date)) : '',
              task_created_at: new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(task.task_created_at)),
              task_status: task.task_status,
              task_progress: <Progress key = { task.task_id } percent = { percent } status = "active" strokeColor = {{ from: '#108ee9', to: '#87d068' }} />,
              menu: <PopupMenu  key = { task.task_id }  items = { popup_menu_items(task) } click = { () => setCurrentTask(task) } />
          }
    })

    return(
        <CustomTable
            title = 'Listes des tâches'
            columns = { columns }
            data = { data }
            pagination = { pagination }
            height = { 500 }
        />
    )
}