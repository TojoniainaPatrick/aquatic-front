// the tasks table columns
export const columns = [
    {
      title: 'Libellé',
      dataIndex: 'task_name',
      width: 80,
    },
    {
      title: 'Créé par',
      dataIndex: 'user_name',
      width: 80,
    },
    {
      title: 'Début',
      dataIndex: 'task_start_date',
      width: 80,
    },
    {
      title: 'Fin',
      dataIndex: 'task_end_date',
      width: 80,
    },
    {
      title: 'Créé le',
      dataIndex: 'task_created_at',
      width: 80,
    },
    {
      title: 'Progression',
      dataIndex: 'task_progress',
      width: 80
    },
    {
      title: 'Statut',
      dataIndex: 'task_status',
      width: 50
    },
    {
      title: '',
      dataIndex: 'menu',
      width: 30,
    }
];

// current tasks
export const currentTasksColumns = [
  {
    title: 'Libellé',
    dataIndex: 'task_name',
    width: 80,
  },
  {
    title: 'Créé par',
    dataIndex: 'user_name',
    width: 80,
  },
  {
    title: 'Début',
    dataIndex: 'task_start_date',
    width: 80,
  },
  {
    title: 'Fin',
    dataIndex: 'task_end_date',
    width: 80,
  },
  {
    title: 'Créé le',
    dataIndex: 'task_created_at',
    width: 80,
  },
  {
    title: 'Progression',
    dataIndex: 'task_progress',
    width: 80
  }
]

// paginations options
export const paginationOptions = [
    {
      value: 1,
      label: '1'
    },
    {
      value: 5,
      label: '5'
    },
    {
      value: 10,
      label: '10'
    },
    {
      value: 20,
      label: '20'
    },
    {
      value: 30,
      label: '30'
    },
    {
      value: 60,
      label: '60'
    }
  ]