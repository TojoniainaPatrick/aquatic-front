import { useEffect, useState } from 'react'
import useCustomContext from '../../context/useCustomContext'
import { Button, Input, Flex, DatePicker, Select } from 'antd'
import { Link } from 'react-router-dom'
import { FileExcelOutlined, PlusSquareOutlined } from '@ant-design/icons'
const { Search } = Input
import { paginationOptions } from '../../services/tasks/taskConstant'
import TaskTable from './TaskTable'
import dayjs from 'dayjs'
import * as XLSX from 'xlsx'


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
  {
      value: '',
      label: ''
  },
]

export default function Task(){

    const {
        getTasks,
        tasks
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
    
    // handle date search
    const filteredTasks = data => {
      if( dateColumn == 'creation' ) return data.filter( task => dayjs(task.task_created_at).format('YYYY-MM-DD').includes(dateFilter))
      else if( dateColumn == 'start' ) return data.filter( task => dayjs(task.task_start_date).format('YYYY-MM-DD').includes(dateFilter))
      else if( dateColumn == 'end' ) return data.filter( task => dayjs(task.task_end_date).format('YYYY-MM-DD').includes(dateFilter))
      else if( dateColumn == 'finish' ) data.filter( task => dayjs(task.task_finished_at).format('YYYY-MM-DD').includes(dateFilter))
      else return data
    }

    const user = JSON.parse(localStorage.getItem('user'))
    const user_role = user.user_role?.toString().toLowerCase()
    const user_id = user?.user_id

    const handleExport = () => {

      let exportData

      if(user_role == 'approving')
      {
        exportData = filteredTasks(tasks)
        .map( task => {
          return {
            'Identifiant': task.task_id,
            'Créé par': task.User.user_name,
            'Nom de tâche': task.task_name,
            'Description': task.task_description,
            'Statut': task.task_status,
            'Début': task.task_start_date ? new Intl.DateTimeFormat( 'fr-FR', { dateStyle: 'long'}).format( new Date(task.task_start_date) ) : null,
            'Fin': task.task_end_date ? new Intl.DateTimeFormat( 'fr-FR', { dateStyle: 'long'}).format( new Date(task.task_end_date) ) : null,
            'Terminé': task.task_finished_at ? new Intl.DateTimeFormat( 'fr-FR', { dateStyle: 'long'}).format( new Date(task.task_finished_at) ) : null,
          }
        })
      }
      else
      {
        exportData = filteredTasks(tasks)
        .filter( task => task.task_created_by == user.user_id )
        .map( task => {
          return {
            'Identifiant': task.task_id,
            'Créé par': task.User.user_name,
            'Nom de tâche': task.task_name,
            'Description': task.task_description,
            'Statut': task.task_status,
            'Début': task.task_start_date ? new Intl.DateTimeFormat( 'fr-FR', { dateStyle: 'long'}).format( new Date(task.task_start_date) ) : null,
            'Fin': task.task_end_date ? new Intl.DateTimeFormat( 'fr-FR', { dateStyle: 'long'}).format( new Date(task.task_end_date) ) : null,
            'Terminé': task.task_finished_at ? new Intl.DateTimeFormat( 'fr-FR', { dateStyle: 'long'}).format( new Date(task.task_finished_at) ) : null,
          }
        })
      }

      let wb = XLSX.utils.book_new()
      let ws = XLSX.utils.json_to_sheet(exportData)

      XLSX.utils.book_append_sheet( wb, ws, 'Liste')
      XLSX.writeFile( wb, `${ user.user_name}${dayjs().millisecond()}.xlsx`)

    }

    return(
        <>
          <Flex vertical = { false } align = 'center' justify = 'space-between' style = {{ padding: '0 20px'}} wrap = { true }>
            <Flex vertical = { false } wrap = { true }>

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

              <DatePicker 
                disabled = { dateColumn.toString().trim() == '' }
                style = {{ margin: '2px 5px' }}
                onChange = { e => {
                  e == null ? setDateFilter('') : setDateFilter(dayjs(e).format('YYYY-MM-DD'))
                }}
              />

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

            <Button 
              style = {{ color: 'white', background: '#0DA250' }}
              onClick = { handleExport }
            >
              <i> <FileExcelOutlined /> </i>
              <span> Exporter au format Excel </span>
            </Button>
          </Flex>

            <TaskTable search = { search } pagination = { pagination } filteredTasks = { filteredTasks( tasks ) } />
        </>
    )
}