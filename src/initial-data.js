const initialData = {
  tasks: {
    // ここにtaskを登録していきたい
    // ex ) task1 : { id: task1, content: 'これはタスク1です'}
  },
  columns: {
    'Todo': {
      id: 'Todo',
      title: 'Todo',
      taskIds: [] // ここにfirebaseで取得してきたtaskのidを入れたい
    },
    'Progress': {
      id: 'Progress',
      title: 'Progress',
      taskIds: []
    },
    'Done': {
      id: 'Done',
      title: 'Done',
      taskIds: []
    },
  },
  columnOrder: ['Todo', 'Progress', 'Done'],
}

export default initialData