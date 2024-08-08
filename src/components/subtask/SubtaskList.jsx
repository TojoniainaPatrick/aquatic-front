import React, { useState } from 'react';
import { Button, Card, Checkbox, Flex, List, message, Popconfirm, Space } from 'antd';
import { AntDesignOutlined, CheckCircleTwoTone, DashboardTwoTone, DeleteTwoTone, EditTwoTone, FieldTimeOutlined, InstagramOutlined, SunOutlined, UnorderedListOutlined } from '@ant-design/icons';
import EditSubTask from './EditSubtask';
import useCustomContext from '../../context/useCustomContext';
import axios from '../../api/axios';

const SubtaskList = ({ subtasks }) => {

    const {
        setCurrentSubtask,
        getCurrentTask,
        currentTask
    } = useCustomContext()

    const confirm = async subtask_id => {
        await axios.delete(`/subtask/delete/${subtask_id}`)
        .then( response => {
            getCurrentTask(currentTask.task_id)
            message.success('Opération effectuée avec succès')
        })
        .catch( error => {
            message.error(error.response.data.message)
        })
    }

    const [ openEdit, setOpenEdit ] = useState(false)

    const handleEdit = subtask => {
        setCurrentSubtask(subtask)
        setOpenEdit(true)
    }

    const handleCheck = async ( e, subtask_id ) => {

        try
        {
            if( e.target.checked ){
                await axios.put(`/subtask/update/${ subtask_id }`, { subtask_status: 'finished' })
            }
            else{
                await axios.put(`/subtask/update/${ subtask_id }`, { subtask_status: 'new' })
            }

            getCurrentTask( currentTask.task_id )
            message.success('Opération effectuée avec succès!')

        }
        catch (error)
        {
            if ( error.response.data.message ) message.error( error.response.data.message )
            else message.error( error.message )
        }
        
    }

    return(
        <>
            <EditSubTask open = { openEdit } setOpen = { setOpenEdit }/>

            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
            
                dataSource={subtasks}
                renderItem={(item) => (
                    
                    <List.Item>
                        <Card title={item.subtask_name} style={{paddingBottom: 0}}>

                            <ul style={{listStyleType: 'none', textWrap: 'nowrap'}}>

                                <li>
                                    <i style={{ fontSize: '1.1rem', marginRight: 5 }} > <FieldTimeOutlined /> </i>
                                    <span style={{fontSize: '.8rem', fontWeight: 'bold', color: 'gray'}}> Debut : </span> { item.subtask_start_date ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(item.subtask_start_date)) : 'Non définie' }
                                </li>

                                <li>
                                    <i style={{ fontSize: '1.1rem', marginRight: 5 }} ><DashboardTwoTone /> </i> 
                                    <span style={{fontSize: '.8rem', fontWeight: 'bold', color: 'gray'}}> Fin : </span> { item.subtask_end_date ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(item.subtask_end_date)) : 'Non définie' }
                                </li>

                                <li>
                                    <i style={{ fontSize: '1.1rem', marginRight: 5 }} > <AntDesignOutlined  /> </i>
                                    <span style={{fontSize: '.8rem', fontWeight: 'bold', color: 'gray'}}> Statut : </span> { item.subtask_status || '' }
                                </li>

                                <li>
                                    <i style={{ fontSize: '1.1rem', marginRight: 5 }} > <CheckCircleTwoTone  /> </i>
                                    <span style={{fontSize: '.8rem', fontWeight: 'bold', color: 'gray'}}> Accomplie : </span>
                                    <Checkbox style = {{ fontSize: '1rem'}} checked = { item.subtask_status == 'finished' } disabled = { ['rejected', 'new', 'finished'].includes( currentTask.task_status.toString().toLowerCase()) }  onChange = { e => handleCheck( e, item.subtask_id ) }></Checkbox>
                                </li>

                            </ul>

                            {
                                currentTask.task_status != 'finished' &&
                                <Flex vertical = { false } justify = 'end' style={{ marginTop: 10}}>
                                    <Button type="default" shape="circle" style={{ marginRight: 5}} icon={<EditTwoTone />} onClick = { () => handleEdit(item) } />
                                    <Popconfirm
                                        title="Suppression"
                                        description="Voulez-vous continuer?"
                                        onConfirm={ () => confirm(item.subtask_id)}
                                        okText="Oui"
                                        cancelText="Non"
                                    >
                                        <Button danger type="default" shape="circle" icon={<DeleteTwoTone />} />
                                    </Popconfirm>
                                </Flex>
                            }
                            
                        </Card>
                    </List.Item>
            
                )}
                />
        </>
    )
};

export default SubtaskList;