import {
  add_task,
  change_theme,
  delete_task,
  done_task,
  edit_task,
} from "../types/ToDoListTypes";

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
  taskEdit: { id: "task-1", taskName: "task 1", done: false },
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
      let themeIndex = arrTheme.find((theme) => theme.id === action.themeId);
      if (themeIndex) state.themToDoList = { ...themeIndex.theme };
      return { ...state };
    }
    case done_task: {
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex((task) => task.id === action.taskId);

      if (index !== -1) taskListUpdate[index].done = true;
      return { ...state, taskList: taskListUpdate };
    }
    case delete_task: {
      // let taskListUpdate = [...state.taskList];
      // C1:
      // let index = taskListUpdate.findIndex((task) => task.id === action.taskId);

      // if (index !== -1) taskListUpdate.splice(index, 1);

      // C2:
      // taskListUpdate = taskListUpdate.filter(
      //   (task) => task.id !== action.taskId
      // );
      // return { ...state, taskList: taskListUpdate };

      // C3:
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.taskId),
      };
    }
    case edit_task: {
      return { ...state, taskEdit: action.task };
    }
    default:
      return { ...state };
  }
};

export default ToDoListReducer;
