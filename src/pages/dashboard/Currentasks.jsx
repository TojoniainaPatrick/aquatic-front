import { Avatar, Progress } from "antd";
import CustomTable from "../../components/datadisplay/CustomTable";
import useCustomContext from "../../context/useCustomContext";
import { currentTasksColumns } from "../../services/tasks/taskConstant";

export default function CurrentTasks(){

    const {
        tasks
    } = useCustomContext()

    // task list
    const data = tasks
    .filter( task => 
      task.task_status?.toString().toLowerCase() == 'approved'
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
            task_progress: <Progress key = { task.task_id } percent = { percent } status = "active" strokeColor = {{ from: '#108ee9', to: '#87d068' }} />,
        }
  })
    
    return(
        <CustomTable
            title = "Tâche en cours"
            columns = { currentTasksColumns }
            data = { data }
            pagination = { 10 }
            height = { 400 }
        />
    )
}