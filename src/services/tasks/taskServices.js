import axios from "../../api/axios"

// approve task
export const handleApprove = async ( currentTask, message, getTasks ) => {
    if( !currentTask.task_start_date || !currentTask.task_end_date){
        message.error('Vous devez definir le délai d\'une tâche avant de l\'approuver.', 8)
    }
    else{
        await axios.put(`/task/update/${currentTask.task_id}`, { task_status: 'approved'})
        .then(_=>{
            message.success('Opération effectuée avec succès!')
            getTasks()
        })
        .catch( error => {
            message.error(error.response?.data?.message)
        })
    }
}

// reject task
export const handleReject = async ( currentTask, message, getTasks ) => {
    await axios.put(`/task/update/${currentTask.task_id}`, { task_status: 'rejected'})
    .then(_=>{
        message.success('Opération effectuée avec succès!')
        getTasks()
    })
    .catch( error => {
        message.error(error.response?.data?.message)
    })
}
    
// delete task
export const handleDelete = async ( currentTask, message, getTasks ) => {
    // if the delete action have any constraint
    if(false){}
    else{
        await axios.delete(`/task/delete/${currentTask.task_id}`)
        .then(_=>{
            message.success('Opération effectuée avec succès!')
            getTasks()
        })
        .catch( error => {
            message.error(error.response?.data?.message)
        })
    }
}