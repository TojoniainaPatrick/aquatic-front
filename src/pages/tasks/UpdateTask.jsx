import React, { useState } from 'react';
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Space,
  message
} from 'antd';
import dayjs from 'dayjs'
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import useCustomContext from '../../context/useCustomContext';

export default function UpdateTask (){

    const { currentTask, setCurrentTask } = useCustomContext()

    const navigate = useNavigate()

    const handleSubmit = async _=> {

        if( !currentTask.task_name ){
            message.warning('Veuillez saisir le nom de la tâche!')
        }
        else{
            await axios.put(`/task/update/${currentTask.task_id}`, { ...currentTask })
            .then( response => {
                message.success('Tâche modifiée avec succès!')
                navigate('/aqs/task')
            })
            .catch( error =>  {
                message.error( error.response.data.message )
                console.log(error.response.data.data);
                
            })
        }
    }

    const handleCancel = _ => navigate('/aqs/task')

    return (
        <Form
            layout="vertical"
            style = {{ maxWidth: '300px', margin: 'auto', padding: '20px', border: '1px solid lightgray', borderRadius: '10px' }}
        >

            <Form.Item label="Nom de la tâche" required>
                <Input
                    placeholder = 'Nom de la tâche'
                    value = { currentTask.task_name || '' }
                    onChange = { value => setCurrentTask({ ...currentTask, task_name: value.target.value}) }
                />
            </Form.Item>

            <Form.Item label="Description">
                <TextArea
                    rows={4}
                    value = { currentTask.task_description || '' }
                    onChange = { value => setCurrentTask({ ...currentTask, task_description: value.target.value}) }
                />
            </Form.Item>

            <Space direction = 'horizontal' className = 'mobile-time-limite'>

            <Form.Item label="Début">
                <DatePicker
                    inputReadOnly = { true }
                    value = { currentTask.task_start_date ? dayjs(currentTask.task_start_date) : null }
                    onChange = { value => setCurrentTask({ ...currentTask, task_start_date: dayjs(value).format('YYYY-MM-DD')}) }
                />
            </Form.Item>

            <Form.Item label="Fin">
                <DatePicker
                    inputReadOnly = { true }
                    value = { currentTask.task_end_date ? dayjs(currentTask.task_end_date) : null }
                    onChange = { value => setCurrentTask({ ...currentTask, task_end_date: dayjs(value).format('YYYY-MM-DD')}) }
                />
            </Form.Item>

            </Space>

            <Form.Item label="Délais" className = 'default-time-limite'>
            <RangePicker
                allowEmpty = { true }
                inputReadOnly = { true }
                value = {[
                    currentTask.task_start_date ? dayjs(currentTask.task_start_date) : null,
                    currentTask.task_end_date ? dayjs(currentTask.task_end_date) : null
                ]}
                popupClassName = 'date-picker-popup'
                onChange = { value => {
                    if(value && value.length > 0 ){
                        const [ start, end ] = value
                        setCurrentTask({
                            ...currentTask,
                            task_start_date: start ? dayjs(start).format('YYYY-MM-DD') : null,
                            task_end_date: end ? dayjs(end).format('YYYY-MM-DD') : null,
                        })
                    }
                }}
            />
            </Form.Item>

            <Flex justify='end'>
                <Button type = 'primary' onClick = { handleSubmit }>Modifier</Button>
                <Button type = 'default' onClick = { handleCancel }>Annuler</Button>
            </Flex>

        </Form>
  );
}