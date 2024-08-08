import React, { useState } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, DatePicker, Flex, Form, Input, message, Modal, Space } from 'antd';
import dayjs from 'dayjs'
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import axios from '../../api/axios'
import useCustomContext from '../../context/useCustomContext'

const NewSubtask = () => {

    const [open, setOpen] = useState(false);
    const [ subtask, setSubtask ] = useState({})

    const {
        currentTask,
        getTasks,
        getCurrentTask
    } = useCustomContext()

    const showModal = () => {
        setOpen(true);
    };


    const handleSubmit = async _=> {

        if( !subtask.subtask_name ){
            setOpen(true)
            message.warning('Veuillez saisir le nom de la tâche!')
        }
    
        else{
          await axios.post('/subtask/create', { ...subtask, task_id: currentTask.task_id })
          .then( response => {
            getCurrentTask(currentTask.task_id)
            message.success(response.data.message)
            setOpen(false)
            setSubtask({})
          })
          .catch( error =>  {
            setOpen(true)
            message.error( error.response.data.message )
          })
        }
      }

    const handleCancel = () => {
        setOpen(false);
        setSubtask({})
    };

    return (
        <>
            <Space>
                <Button type="primary" icon={<PlusSquareOutlined />} onClick={showModal} style = {{margin: '10px auto'}}>Nouvelle sous-tâche</Button>
            </Space>

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
                        <Input placeholder = 'Nom de la tâche' onChange = { value => setSubtask({ ...subtask, subtask_name: value.target.value}) } />
                    </Form.Item>

                    <Form.Item label="Description">
                        <TextArea rows={4} onChange = { value => setSubtask({ ...subtask, subtask_description: value.target.value}) } />
                    </Form.Item>

                    <Space direction = 'horizontal' className = 'mobile-time-limite'>

                        <Form.Item label="Début">
                        <DatePicker
                            inputReadOnly = { true }
                            onChange = { value => setSubtask({ ...subtask, subtask_start_date: dayjs(value).format('YYYY-MM-DD')}) }
                        />
                        </Form.Item>

                        <Form.Item label="Fin">
                        <DatePicker
                            inputReadOnly = { true }
                            onChange = { value => setSubtask({ ...subtask, subtask_end_date: dayjs(value).format('YYYY-MM-DD')}) }
                        />
                        </Form.Item>

                    </Space>

                    <Form.Item label="Délais" className = 'default-time-limite'>
                        <RangePicker
                        allowEmpty = { true }
                        inputReadOnly = { true }
                        value = {[
                            subtask.subtask_start_date ? dayjs(subtask.subtask_start_date) : null,
                            subtask.subtask_end_date ? dayjs(subtask.subtask_end_date) : null
                        ]}
                        popupClassName = 'date-picker-popup'
                        onChange = { value => {
                            if(value && value.length > 0 ){
                                const [ start, end ] = value
                                setSubtask({
                                    ...subtask,
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
export default NewSubtask;