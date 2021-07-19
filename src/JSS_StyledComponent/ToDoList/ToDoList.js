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

import { Button } from "../Components/Button";
import { Container } from "../Containers/Containers";
import { DarkTheme } from "../Themes/DarkTheme";
import { Dropdown } from "../Components/Dropdown";
import { LightTheme } from "../Themes/LightTheme";
import { PrimaryTheme } from "../Themes/PrimaryTheme";
import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";

class ToDoList extends Component {
  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button>
                <i className="fa fa-trash"></i>
              </Button>
              <Button className="mx-2">
                <i className="fa fa-edit"></i>
              </Button>
              <Button>
                <i className="fa fa-check"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTaskCompleted = () => {
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
            </Th>
          </Tr>
        );
      });
  };
  render() {
    return (
      <ThemeProvider theme={this.props.themToDoList}>
        {" "}
        <Container className="w-50">
          <Dropdown className="my-2">
            <option>Dark theme</option>
            <option>Light theme</option>
            <option>Primary theme</option>
          </Dropdown>
          <Heading2 className="mb-5">To do list</Heading2>
          <TextField label="Task name" className="w-50 mt-3"></TextField>
          <Button className="ml-2">
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
  };
};
export default connect(mapStateToProps)(ToDoList);
