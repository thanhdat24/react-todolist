import {
  add_task,
  change_theme,
  delete_task,
  done_task,
  edit_task,
  update_task,
} from "../types/ToDoListTypes";

import { DarkTheme } from "../../JSS_StyledComponent/Themes/DarkTheme";
import { arrTheme } from "../../JSS_StyledComponent/Themes/ThemeManager";

const initialState = {
  themeToDoList: DarkTheme,
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
  taskEdit: { id: "-1", taskName: "", done: false },
};

export const ToDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case add_task: {
      if (action.newTask.taskName.trim() === "") {
        alert("Task name is required!");
        return { ...state };
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
      if (themeIndex) state.themeToDoList = { ...themeIndex.theme };
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
    case update_task: {
      // Chỉnh sửa lại taskName của taskEdit
      state.taskEdit = { ...state.taskEdit, taskName: action.taskName };

      //Tìm trong taskList cập mjaapj lại taskEdit người dùng update
      let taskListUpdate = [...state.taskList];

      let index = taskListUpdate.findIndex(
        (task) => task.id === state.taskEdit.id
      );
      let indexName = taskListUpdate.findIndex(
        (task) => task.taskName === action.taskName
      );

      if (index !== -1) {
        taskListUpdate[index] = state.taskEdit;
      }
      if (indexName !== -1) {
        alert("task name already exists!");
        return { ...state, taskEdit: { id: "-1", taskName: "", done: false } };
      }
      return {
        ...state,
        taskList: taskListUpdate,
        taskEdit: { id: "-1", taskName: "", done: false },
      };
    }
    default:
      return { ...state };
  }
};

export default ToDoListReducer;
