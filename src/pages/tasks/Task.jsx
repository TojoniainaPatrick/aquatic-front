import { useEffect, useState } from 'react'
import useCustomContext from '../../context/useCustomContext'
import CustomTable from '../../components/datadisplay/CustomTable'
import { Button, Progress, message, Input, Flex, DatePicker, Select, Avatar } from 'antd'
import PopupMenu from '../../components/popup_menu/PopupMenu'
import { Link } from 'react-router-dom'
import { CheckCircleFilled, DeleteOutlined, DropboxSquareFilled, EditTwoTone, InfoCircleFilled, PlusSquareOutlined } from '@ant-design/icons'
import PopupConfirm from '../../components/popup_confirm/PopupConfirm'
import axios from '../../api/axios'
const { Search } = Input
import { columns, paginationOptions } from '../../services/tasks/taskConstant'
import { handleApprove } from '../../services/tasks/taskServices'
import TaskTable from './TaskTable'


const date_filter = [
  {
      value: 'start',
      label: 'Debut'
  },
  {
      value: 'end',
      label: 'Fin'
  },
  {
      value: 'creation',
      label: 'Création'
  },
  {
      value: 'finish',
      label: 'Accomplie'
  },
]

export default function Task(){

    const {
        getTasks,
        tasks,
        currentTask,
        setCurrentTask
    } = useCustomContext()

    useEffect( () => {
        getTasks()
    }, [])

    const [ search, setSearch ] = useState('')
    const [ dateFilter, setDateFilter ] = useState('')
    const [ dateColumn, setDateColumn ] = useState('')
    const [ pagination, setPagination ] = useState(20)

    // handle search
    const onSearch = (value, _e, info) => setSearch(value)

    return(
        <>
            <Flex style = {{ padding: '0 20px'}} wrap = { true }>

              <Search
                placeholder="Recherche..."
                allowClear
                onSearch={onSearch}
                style={{
                  minWidth: 150,
                  maxWidth: 200,
                  margin: '2px 5px'
                }}
              />

              <DatePicker  disabled = { dateColumn.toString().trim() == '' } style = {{ margin: '2px 5px' }}/>

              <Select
                showSearch
                size = 'middle'
                placeholder = 'Date'
                optionFilterProp="label"
                filterSort = { (optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange = { selected => setDateColumn(selected) }
                options = { date_filter }
                style = {{ margin: '2px 5px', width: 100 }}
              />

              <Select
                showSearch
                size = 'middle'
                placeholder = 'Pagination'
                optionFilterProp="label"
                onChange = { selected => setPagination(selected) }
                options = { paginationOptions }
                style = {{ margin: '2px 5px', width: 100 }}
              />

              <Link to = '/aqs/task/new'  style = {{ margin: '2px 5px' }} > <Button type="primary" icon={<PlusSquareOutlined />}>Nouvelle tâche</Button> </Link>
                
            </Flex>

            <TaskTable search = { search } pagination = { pagination } />
        </>
    )
}