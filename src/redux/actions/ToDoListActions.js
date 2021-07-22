import {
  add_task,
  change_theme,
  delete_task,
  done_task,
  edit_task,
} from "../types/ToDoListTypes";

export const addTaskACtion = (newTask) => ({
  type: add_task,
  newTask,
});

export const changeThemeAction = (themeId) => ({
  type: change_theme,
  themeId,
});

export const doneTaskAction = (taskId) => ({
  type: done_task,
  taskId,
});

export const deleteTaskAction = (taskId) => ({
  type: delete_task,
  taskId,
});

export const editTaskAction = (task) => ({
  type: edit_task,
  task,
});
