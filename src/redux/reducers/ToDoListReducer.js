import { DarkTheme } from "../../JSS_StyledComponent/Themes/DarkTheme";

const initialState = {
  themToDoList: DarkTheme,
  taskList: [
    {
      id: "task-1",
      taskName: "task 1",
      done: true,
    },
    {
      id: "task-2",
      taskName: "task 2",
      done: false,
    },
    {
      id: "task-3",
      taskName: "task 3",
      done: true,
    },
    {
      id: "task-4",
      taskName: "task 4",
      done: false,
    },
  ],
};

export const ToDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

export default ToDoListReducer;
