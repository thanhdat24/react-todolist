import { add_task } from "../types/ToDoListTypes";

export const addTaskACtion = (newTask) => ({
  type: add_task,
  newTask,
});
