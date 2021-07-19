import { DarkTheme } from "../../JSS_StyledComponent/Themes/DarkTheme";

const initialState = {
  themToDoList: DarkTheme,
  taskList: [],
};

export const ToDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

export default ToDoListReducer;
