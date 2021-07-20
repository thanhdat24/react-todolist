import { add_task, change_theme } from "../types/ToDoListTypes";

import { DarkTheme } from "../../JSS_StyledComponent/Themes/DarkTheme";
import { arrTheme } from "../../JSS_StyledComponent/Themes/ThemeManager";

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
    case add_task: {
      if (action.newTask.taskName.trim() === "") {
        alert("Task name is required!");
        return;
      }

      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.taskName === action.newTask.taskName
      );
      if (index !== -1) {
        alert("task name already exists!");
        return { ...state };
      }
      taskListUpdate.push(action.newTask);
      state.taskList = taskListUpdate;
      return { ...state };
    }
    case change_theme: {
      // Tìm theme dựa vào action.themId được chọn
      let themeIndex = arrTheme.find((theme) => theme.id == action.themeId);
      if (themeIndex) state.themToDoList = { ...themeIndex.theme };
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default ToDoListReducer;
