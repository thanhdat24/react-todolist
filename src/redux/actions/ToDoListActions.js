import { add_task, change_theme } from "../types/ToDoListTypes";

export const addTaskACtion = (newTask) => ({
  type: add_task,
  newTask,
});

export const changeThemeAction = (themeId) => ({
  type: change_theme,
  themeId,
});
