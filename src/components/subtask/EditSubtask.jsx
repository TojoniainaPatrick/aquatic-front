import React, { useState } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, DatePicker, Flex, Form, Input, message, Modal, Select, Space } from 'antd';
import dayjs from 'dayjs'
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import axios from '../../api/axios'
import useCustomContext from '../../context/useCustomContext'

const EditSubTask = ({open, setOpen}) => {


    const {
        currentTask,
        getTasks,
        currentSubtask,
        setCurrentSubtask,
        getCurrentTask,
        load,
        unload
    } = useCustomContext()

    const showModal = () => {
        setOpen(true);
    }

    const handleSubmit = async _=> {

        if( !currentSubtask.subtask_name ){
            setOpen(true)
            message.warning('Veuillez saisir le nom de la tâche!')
        }
    
        else{
            load()
            await axios.put(`/subtask/update/${currentSubtask.subtask_id}`, { ...currentSubtask })
            .then( async response => {
                await getCurrentTask(currentTask.task_id)
                message.success(response.data.message)
                setOpen(false)
                setCurrentSubtask({})
            })
            .catch( error =>  {
                setOpen(true)
                message.error( error.response.data.message )
            })
            .finally( _=> unload())
        }
      }

    const handleCancel = () => {
        setOpen(false);
        setCurrentSubtask({})
    };

    return (
        <>
            <Modal
                open={open}
                title="Title"
                onOk={handleSubmit}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <OkBtn />
                    <CancelBtn />
                </>
                )}
            >
                <Form
                    layout="vertical"
                    style = {{ maxWidth: '300px', margin: 'auto', padding: '10px' }}
                >

                    <Form.Item label="Nom de la tâche" required>
                        <Input
                            placeholder = 'Nom de la tâche'
                            value = { currentSubtask.subtask_name || '' }
                            onChange = { value => setCurrentSubtask({ ...currentSubtask, subtask_name: value.target.value}) }
                        />
                    </Form.Item>

                    <Form.Item label="Description">
                        <TextArea
                            rows={4}
                            value = { currentSubtask.subtask_description || '' }
                            onChange = { value => setCurrentSubtask({ ...currentSubtask, subtask_description: value.target.value}) }
                        />
                    </Form.Item>

                    <Space direction = 'horizontal' className = 'mobile-time-limite'>

                        <Form.Item label="Début">
                        <DatePicker
                            inputReadOnly = { true }
                            minDate = { currentTask.task_start_date ? dayjs(currentTask.task_start_date) : null }
                            maxDate = { currentTask.task_end_date ? dayjs(currentTask.task_end_date) : null }
                            value = { currentSubtask.subtask_start_date ? dayjs(currentSubtask.subtask_start_date) : null }
                            onChange = { value => setCurrentSubtask({ ...currentSubtask, subtask_start_date: dayjs(value).format('YYYY-MM-DD')}) }
                        />
                        </Form.Item>

                        <Form.Item label="Fin">
                        <DatePicker
                            inputReadOnly = { true }
                            minDate = { currentTask.task_start_date ? dayjs(currentTask.task_start_date) : null }
                            maxDate = { currentTask.task_end_date ? dayjs(currentTask.task_end_date) : null }
                            value = { currentSubtask.subtask_end_date ? dayjs(currentSubtask.subtask_start_date) : null }
                            onChange = { value => setCurrentSubtask({ ...currentSubtask, subtask_end_date: dayjs(value).format('YYYY-MM-DD')}) }
                        />
                        </Form.Item>

                    </Space>

                    <Form.Item label="Délais" className = 'default-time-limite'>
                        <RangePicker
                            allowEmpty = { true }
                            inputReadOnly = { true }
                            minDate = { currentTask.task_start_date ? dayjs(currentTask.task_start_date) : null }
                            maxDate = { currentTask.task_end_date ? dayjs(currentTask.task_end_date) : null }
                            value = {[
                                currentSubtask.subtask_start_date ? dayjs(currentSubtask.subtask_start_date) : null,
                                currentSubtask.subtask_end_date ? dayjs(currentSubtask.subtask_end_date) : null
                            ]}
                            popupClassName = 'date-picker-popup'
                            onChange = { value => {
                                if(value && value.length > 0 ){
                                    const [ start, end ] = value
                                    setCurrentSubtask({
                                        ...currentSubtask,
                                        subtask_start_date: start ? dayjs(start).format('YYYY-MM-DD') : null,
                                        subtask_end_date: end ? dayjs(end).format('YYYY-MM-DD') : null,
                                    })
                                }
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default EditSubTask;