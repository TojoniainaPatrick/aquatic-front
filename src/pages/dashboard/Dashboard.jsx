import { useEffect } from "react";
import useCustomContext from '../../context/useCustomContext'
import dayjs from 'dayjs'
import { Divider } from "antd";
import { CheckCircleFilled, FileDoneOutlined, MinusCircleFilled, WarningFilled } from "@ant-design/icons";
import CardContainer from "../../components/dashboard/CardContainer";
import CardPercentContainer from "../../components/dashboard/CardPercentContainer";
import CurrentTasks from "./Currentasks";

export default function Dashboard() {

    const {
        getTasks,
        tasks
    } = useCustomContext()

    const approvedTasks = tasks.filter( task => 
        task.task_status?.toString().toLowerCase() == 'finished' ||
        task.task_status?.toString().toLowerCase() == 'approved'
    )

    const tasksCount = approvedTasks.length

    const unfinishedTask = approvedTasks.filter( task =>
        task.task_status.toString().toLowerCase() == 'approved'
    ).length

    const finishedOnTime = approvedTasks.filter( task =>
        (task.task_finished_at && task.task_end_date) && dayjs(task.task_end_date).isAfter(dayjs(task.task_finished_at))
    ).length 
    
    const finishedOutTime = approvedTasks.filter( task =>
        (task.task_finished_at && task.task_end_date) && dayjs(task.task_end_date).isBefore(dayjs(task.task_finished_at))
    ).length

    const cardsContent = [
        {
            icon: <FileDoneOutlined />,
            title: 'Approuvées',
            value: tasksCount,
            key: 1,
            color: '#387cf1'
        },
        {
            icon: <CheckCircleFilled />,
            title: 'Accomplies dans le délai',
            value: finishedOnTime,
            key: 2,
            color: '#35df81'
        },
        {
            icon: <WarningFilled />,
            title: 'Accomplies hors du délai',
            value: finishedOutTime,
            key: 3,
            color: '#f1bd38'
        },
        {
            icon: <MinusCircleFilled />,
            title: 'Non accomplies',
            value: unfinishedTask,
            key: 4,
            color: '#f73b73'
        }
    ]

    const unfinishedTask_percent = Number((Number(unfinishedTask) * 100) / Number(tasksCount))
    const finishedOnTime_percent = Number((Number(finishedOnTime) * 100) / Number(tasksCount))
    const finishedOutTime_percent = Number((Number(finishedOutTime) * 100) / Number(tasksCount))

    
    useEffect(() => {
        getTasks()
    }, [])

    return(
        <>

            <Divider style={{ color: 'gray' }}>Effectifs</Divider>
            <CardContainer items = { cardsContent } />

            <Divider style={{ color: 'gray' }}>Pourcentages</Divider>
            <CardPercentContainer
                finishedOnTime = { finishedOnTime_percent }
                finishedOutTime = { finishedOutTime_percent }
                unFinished = { unfinishedTask_percent }
            />

            <Divider style={{ color: 'gray' }}>Tâches en cours</Divider>
            <CurrentTasks />
        </>
    )
}