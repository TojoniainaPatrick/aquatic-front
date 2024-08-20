import { useEffect, useState } from "react";
import useCustomContext from '../../context/useCustomContext'
import dayjs from 'dayjs'
import { Divider } from "antd";
import { CheckCircleFilled, FileDoneOutlined, MinusCircleFilled, WarningFilled } from "@ant-design/icons";
import CardContainer from "../../components/dashboard/CardContainer";
import CardPercentContainer from "../../components/dashboard/CardPercentContainer";
import CurrentTasks from "./Currentasks";
import CustomSelect from "../../components/select/CustomSelect";

export default function Dashboard() {

    const {
        getTasks,
        tasks,
        getUsers,
        users
    } = useCustomContext()
    
    useEffect(() => {
        getTasks()
        getUsers()
    }, [])
    
    const user = JSON.parse(localStorage.getItem('user'))
    const user_role = user.user_role?.toString().toLowerCase()
    const user_id = user?.user_id

    const [ progression, setProgression ] = useState( JSON.parse( localStorage.getItem('user') ).user_id )

    const usersSelect = user_role == 'approving'
    ? users.map( user => { return { value: user.user_id, label: user.user_name }})
    : users
        .filter( user => user.user_id == user_id )
        .map( user => { return { value: user.user_id, label: user.user_name }})


    const generalApprovedTasks = tasks.filter( task => 
        task.task_status?.toString().toLowerCase() == 'finished' ||
        task.task_status?.toString().toLowerCase() == 'approved'
    )

    const generalTasksCount = generalApprovedTasks.length

    const generalUnfinishedTask = generalApprovedTasks.filter( task =>
        task.task_status.toString().toLowerCase() == 'approved'
    ).length

    const generalFinishedOnTime = generalApprovedTasks.filter( task =>
        (task.task_finished_at && task.task_end_date) && dayjs(task.task_end_date).isAfter(dayjs(task.task_finished_at))
    ).length 
    
    const generalFinishedOutTime = generalApprovedTasks.filter( task =>
        (task.task_finished_at && task.task_end_date) && dayjs(task.task_end_date).isBefore(dayjs(task.task_finished_at))
    ).length

    const generalUnfinishedTask_percent = Number((Number(generalUnfinishedTask) * 100) / Number(generalTasksCount))
    const generalFinishedOnTime_percent = Number((Number(generalFinishedOnTime) * 100) / Number(generalTasksCount))
    const generalFinishedOutTime_percent = Number((Number(generalFinishedOutTime) * 100) / Number(generalTasksCount))



    const currentApprovedTasks = tasks
    .filter( task => task.task_created_by == progression )
    .filter( task => 
        task.task_status?.toString().toLowerCase() == 'finished' ||
        task.task_status?.toString().toLowerCase() == 'approved'
    )

    const currentTasksCount = currentApprovedTasks.length

    const currentUnfinishedTask = currentApprovedTasks.filter( task =>
        task.task_status.toString().toLowerCase() == 'approved'
    ).length

    const currentFinishedOnTime = currentApprovedTasks.filter( task =>
        (task.task_finished_at && task.task_end_date) && dayjs(task.task_end_date).isAfter(dayjs(task.task_finished_at))
    ).length 
    
    const currentFinishedOutTime = currentApprovedTasks.filter( task =>
        (task.task_finished_at && task.task_end_date) && dayjs(task.task_end_date).isBefore(dayjs(task.task_finished_at))
    ).length

    const currentUnfinishedTask_percent = Number((Number(currentUnfinishedTask) * 100) / Number(currentTasksCount))
    const currentFinishedOnTime_percent = Number((Number(currentFinishedOnTime) * 100) / Number(currentTasksCount))
    const currentFinishedOutTime_percent = Number((Number(currentFinishedOutTime) * 100) / Number(currentTasksCount))



    const cardsContent = [
        {
            icon: <FileDoneOutlined />,
            title: 'Approuvées',
            value: generalTasksCount,
            key: 1,
            color: '#387cf1'
        },
        {
            icon: <CheckCircleFilled />,
            title: 'Accomplies dans le délai',
            value: generalFinishedOnTime,
            percent: generalFinishedOnTime_percent,
            key: 2,
            color: '#35df81'
        },
        {
            icon: <WarningFilled />,
            title: 'Accomplies hors du délai',
            value: generalFinishedOutTime,
            percent: generalFinishedOutTime_percent,
            key: 3,
            color: '#f1bd38'
        },
        {
            icon: <MinusCircleFilled />,
            title: 'Non accomplies',
            value: generalUnfinishedTask,
            percent: generalUnfinishedTask_percent,
            key: 4,
            color: '#f73b73'
        }
    ]

    return(
        <>

            <Divider style={{ color: 'gray' }}>Effectifs</Divider>

            <CardContainer items = { cardsContent } />

            <Divider style={{ color: 'gray' }}>

                <span> Progression de </span>

                <CustomSelect
                    data = { usersSelect }
                    value = { progression }
                    setValue = { setProgression }
                    placeholder = 'Utilisateur'
                />

            </Divider>

            <CardPercentContainer
                currentFinishedOnTime = { currentFinishedOnTime_percent }
                currentFinishedOutTime = { currentFinishedOutTime_percent }
                currentUnFinished = { currentUnfinishedTask_percent }
            />

            <Divider style={{ color: 'gray' }}>Tâches en cours</Divider>
            <CurrentTasks />
        </>
    )
}