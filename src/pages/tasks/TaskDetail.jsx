import { Avatar, Card, Checkbox, Divider, Flex, message } from "antd";
import NewSubtask from "../../components/subtask/NewSubtask";
import SubtaskList from "../../components/subtask/SubtaskList";
import useCustomContext from "../../context/useCustomContext";
import axios from "../../api/axios";

export default function TaskDetail(){

    const {
        currentTask,
        getCurrentTask
    } = useCustomContext()

    const isEverySubtaskFinished = currentTask.SubTasks?.every( subtask => subtask.subtask_status.toString().toLowerCase() == 'finished' )
    const isTaskEmpty = currentTask.SubTasks?.length == 0
    const isTaskAccomplished = currentTask.task_status?.toString().toLowerCase() == 'finished'
    
    const user  = JSON.parse(localStorage.getItem('user'))

    const onChange = async e => {

        if(e.target.checked){

            if( isTaskEmpty || isEverySubtaskFinished ){
                await axios.put(`/task/update/${currentTask.task_id}`, { task_status: 'finished', task_finished_at: new Date() })
                .then( response => {
                    message.success('Tâche modifiée avec succès!')
                })
                .catch( error =>  {
                    console.log(error);
                })
            }
            else{
                message.error( 'Toutes les sous-tâche ne sont pas encore accomplies!' )
            }
        }
        else{
            // if( isTaskEmpty ){
                await axios.put(`/task/update/${currentTask.task_id}`, { task_status: 'approved', task_finished_at: null })
                .then( response => {
                    message.success('Tâche modifiée avec succès!')
                })
                .catch( error =>  {
                    console.log(error);
                })
            // }
        }
        getCurrentTask(currentTask.task_id)
    }

    return(
        <Flex style={{ padding: 20 }} vertical = { true }>

            { 
                ( !isTaskAccomplished && ( user.user_role.toString().toLowerCase() == 'approving' || currentTask.task_created_by == user.user_id ) ) && <NewSubtask />
            }

            <Divider> Détail de la tâche </Divider>

            <Flex vertical = { false } wrap = { true } justify = 'space-evenly'>
                <Card bordered style = {{ marginTop: 5}}> Nom de la tâche : { currentTask?.task_name } </Card>
                <Card style = {{ marginTop: 5}}> Description : { currentTask?.task_description } </Card>
                <Card style = {{ marginTop: 5}}> Debut : { currentTask.task_start_date ? new Intl.DateTimeFormat( 'fr-FR', { dateStyle: 'long'}).format(new Date(currentTask.task_start_date)) : 'Non définie' } </Card>
                <Card style = {{ marginTop: 5}}> Fin : { currentTask.task_end_date ? new Intl.DateTimeFormat( 'fr-FR', { dateStyle: 'long'}).format(new Date(currentTask.task_end_date)) : 'Non définie' } </Card>
                <Card style = {{ marginTop: 5}}> Crée par : <Avatar src = { currentTask.User.user_image_url } /> { currentTask.User?.user_name } </Card>
                {
                    ['approved', 'finished'].includes(currentTask.task_status.toString().toLowerCase())
                    && ( user.user_role?.toString().toLowerCase() == 'approving' || currentTask.task_created_by == user.user_id )
                    && <Card style = {{ marginTop: 5}}> Terminée : <Checkbox style={{ fontSize: '1rem'}} checked = { isTaskAccomplished || ( isEverySubtaskFinished && !isTaskEmpty) } onChange = { onChange } disabled = { !isTaskEmpty && isEverySubtaskFinished } ></Checkbox> </Card>
                }
            </Flex>

            <Divider> Liste des sous-tâches </Divider>

            <SubtaskList subtasks = { currentTask.SubTasks }/>
        </Flex>
    )
}