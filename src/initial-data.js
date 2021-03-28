const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: '買い物' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Todo',
      taskIds: ['task-1']
    },
    'column-2': {
      id: 'column-2',
      title: 'Progress',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: []
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
}

export default initialData