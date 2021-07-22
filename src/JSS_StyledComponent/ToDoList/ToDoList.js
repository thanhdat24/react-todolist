import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "../Components/Heading";
import { Input, Label, TextField } from "../Components/TextField";
import React, { Component } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "../Components/Table";
import {
  addTaskACtion,
  changeThemeAction,
  deleteTaskAction,
  doneTaskAction,
  editTaskAction,
} from "../../redux/actions/ToDoListActions";

import { Button } from "../Components/Button";
import { Container } from "../Containers/Containers";
import { DarkTheme } from "../Themes/DarkTheme";
import { Dropdown } from "../Components/Dropdown";
import { LightTheme } from "../Themes/LightTheme";
import { PrimaryTheme } from "../Themes/PrimaryTheme";
import { ThemeProvider } from "styled-components";
import { arrTheme } from "../Themes/ThemeManager";
import { connect } from "react-redux";

class ToDoList extends Component {
  state = {
    taskName: "",
  };
  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button>
                <i className="fa fa-trash"></i>
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(editTaskAction(task));
                }}
                className="mx-2"
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(doneTaskAction(task.id));
                }}
              >
                <i className="fa fa-check"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTheme = () => {
    return arrTheme.map((theme, index) => {
      return <option value={theme.id}>{theme.name}</option>;
    });
  };
  render() {
    return (
      <ThemeProvider theme={this.props.themToDoList}>
        {" "}
        <Container className="w-50">
          <Dropdown
            onChange={(e) => {
              let { value } = e.target;
              // Dispatch value ên reducer
              this.props.dispatch(changeThemeAction(value));
            }}
            className="my-2"
          >
            {this.renderTheme()}
          </Dropdown>
          <Heading2 className="mb-5">To do list</Heading2>
          <TextField
            value={this.props.taskEdit.taskName}
            onChange={(event) => {
              this.setState({
                taskName: event.target.value,
              });
            }}
            label="Task name"
            className="w-50 mt-3"
          ></TextField>
          <Button
            onClick={() => {
              // Lấy thông tin người dùng nhập vào input
              let { taskName } = this.state;
              // Tạo ra 1 task object
              let newTask = {
                id: Date.now(),
                taskName: taskName,
                done: false,
              };

              // Đưa task object redux thông qua phương thức dispatch
              this.props.dispatch(addTaskACtion(newTask));
            }}
            className="ml-2"
          >
            <i className="fa fa-plus mr-1"></i>Add task
          </Button>
          <Button className="ml-2">
            <i className="fa fa-upload mr-1"></i>Update task
          </Button>
          <Heading3 className="mt-4 mb-3">Task to do</Heading3>
          <Table>
            <Thead>{this.renderTaskToDo()}</Thead>
          </Table>
          <Heading3 className="mt-4 mb-3">Task completed</Heading3>
          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    themToDoList: state.ToDoListReducer.themToDoList,
    taskList: state.ToDoListReducer.taskList,
    taskEdit: state.ToDoListReducer.taskEdit,
  };
};
export default connect(mapStateToProps)(ToDoList);
