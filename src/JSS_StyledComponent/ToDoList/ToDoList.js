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
  addTaskAction,
  changeThemeAction,
  deleteTaskAction,
  doneTaskAction,
  editTaskAction,
  updateTaskAction,
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
    disabled: true,
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
                  this.setState(
                    {
                      disabled: false,
                    },
                    () => {
                      this.props.dispatch(editTaskAction(task));
                    }
                  );
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

  // static getDerivedStateFromProps(newProps, currentState) {
  //   // newProps: là props mới, props cũ là this.props (không truy xuất được)
  //   // currentState: ứng với tate hiện tại this.state

  //   // hoặc trả về state mới (this.state)
  //   let newState = { ...currentState, taskName: newProps.taskEdit.taskName };
  //   return {newState };
  // }

  // Hiên nút update khi ấn vào updateTask còn bth thì ẩn đi
  renderDisabled = () => {
    return this.state.disabled ? (
      <Button
        disabled
        onClick={() => {
          this.props.dispatch(updateTaskAction(this.state.taskName));
        }}
        className="ml-2"
      >
        <i className="fa fa-upload mr-1"></i>Update task
      </Button>
    ) : (
      <Button
        onClick={() => {
          // Sử dụng this.state.taskName để tránh trường hợp người dùng setState giá trị bị rỗng
          let { taskName } = this.state;
          this.setState(
            {
              disabled: true,
              taskName: "",
            },
            () => {
              this.props.dispatch(updateTaskAction(taskName));
            }
          );
        }}
        className="ml-2"
      >
        <i className="fa fa-upload mr-1"></i>Update task
      </Button>
    );
  };
  render() {
    return (
      <ThemeProvider theme={this.props.themeToDoList}>
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
            value={this.state.taskName}
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
              this.props.dispatch(addTaskAction(newTask));
            }}
            className="ml-2"
          >
            <i className="fa fa-plus mr-1"></i>Add task
          </Button>
          {this.renderDisabled()}
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

  // Đây là lifecycle trả về props ũ và state cũ của component trước khi render (lifecycle chạy sau render)
  componentDidUpdate(prevProps, prevState) {
    // So sánh nếu như props trước đó (taskEdit trước mà khác taskEdit hiện tại thì mình mới setState)
    if (prevProps.taskEdit.id !== this.props.taskEdit.id)
      this.setState({
        taskName: this.props.taskEdit.taskName,
      });
  }
}
const mapStateToProps = (state) => {
  return {
    themeToDoList: state.ToDoListReducer.themeToDoList,
    taskList: state.ToDoListReducer.taskList,
    taskEdit: state.ToDoListReducer.taskEdit,
  };
};
export default connect(mapStateToProps)(ToDoList);
