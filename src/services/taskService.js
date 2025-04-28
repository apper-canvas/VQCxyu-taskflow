import { fetchRecords, createRecord, updateRecord, deleteRecord } from './apperService';

const TABLE_NAME = 'task14';

// Fields we want to fetch/display for tasks
const TASK_FIELDS = [
  'Id', 
  'title', 
  'description', 
  'dueDate', 
  'priority', 
  'completed',
  'CreatedOn',
  'ModifiedOn'
];

// Fetch all tasks for the current user
export const fetchTasks = async () => {
  try {
    return await fetchRecords(TABLE_NAME, {
      fields: TASK_FIELDS,
      orderBy: [{ field: 'CreatedOn', direction: 'desc' }]
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    return await createRecord(TABLE_NAME, taskData);
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update an existing task
export const updateTaskById = async (taskId, taskData) => {
  try {
    return await updateRecord(TABLE_NAME, taskId, taskData);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Delete a task
export const deleteTaskById = async (taskId) => {
  try {
    return await deleteRecord(TABLE_NAME, taskId);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

// Get tasks by status (completed or not)
export const getTasksByStatus = async (completed) => {
  try {
    return await fetchRecords(TABLE_NAME, {
      fields: TASK_FIELDS,
      filters: [{ field: 'completed', operator: 'eq', value: completed }],
      orderBy: [{ field: 'CreatedOn', direction: 'desc' }]
    });
  } catch (error) {
    console.error('Error fetching tasks by status:', error);
    throw error;
  }
};

// Get tasks by priority
export const getTasksByPriority = async (priority) => {
  try {
    return await fetchRecords(TABLE_NAME, {
      fields: TASK_FIELDS,
      filters: [{ field: 'priority', operator: 'eq', value: priority }],
      orderBy: [{ field: 'CreatedOn', direction: 'desc' }]
    });
  } catch (error) {
    console.error('Error fetching tasks by priority:', error);
    throw error;
  }
};

// Get high priority pending tasks
export const getHighPriorityPendingTasks = async () => {
  try {
    return await fetchRecords(TABLE_NAME, {
      fields: TASK_FIELDS,
      filters: [
        { field: 'priority', operator: 'eq', value: 'high' },
        { field: 'completed', operator: 'eq', value: false }
      ],
      orderBy: [{ field: 'dueDate', direction: 'asc' }]
    });
  } catch (error) {
    console.error('Error fetching high priority pending tasks:', error);
    throw error;
  }
};