import React, { Fragment } from "react";
import moment from "moment";
import * as microsoftTeams from "@microsoft/teams-js";
import "./task.css";
import { Task_Link1, Task_Link3, Task_Link2 } from "../../links";

import { Task_Title } from "../../strings ";

import { GetTeamsConfig, GetTaskDetails } from "../../services/serviceApi";
interface ITask {
  dueDateTime: string;
  title: string;
  taskDueDate: string;
  taskLink: string;
  planId: string;
  id: string;
}

interface IProps {}

interface IState {
  moreTask: boolean;
  moreTaskLink: string | null;
  taskData?: Array<any>;
}

class Task extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      moreTask: false,
      moreTaskLink: null,
      taskData: [],
    };
  }

  sortTasks = (a: ITask, b: ITask) => {
    return new Date(a.dueDateTime) > new Date(b.dueDateTime) ? 1 : -1;
  };
  //fetch task details from planner
  getTaskDetails = async (tasksAppId: string) => {
    try {
      let moreTask = false,
        moreTaskLink = null,
        sortedArr: ITask[] = [];
      let counter = 0;
      let taskDetails = await GetTaskDetails().catch((err: any) => {
        console.log(err);
      });
      if (taskDetails != null) {
        if (taskDetails) {
          let listOfTasks = taskDetails?.value || [];
          sortedArr = listOfTasks;
          let taskUrl = `${Task_Link2}${tasksAppId}/teamstasks.personalApp.mytasks?webUrl=https%3A%2F%2Fretailservices.teams.microsoft.com%2Fui%2Ftasks%2FpersonalApp%2Falltasklists&context=%7B%22subEntityId%22%3A%22%2FtaskListType%2FsmartList%2FSL_AssignedToMe%2Fplan%2F`;
          sortedArr.map((item: ITask) => {
            counter++;
            item.taskDueDate = new Date(item.dueDateTime).toLocaleDateString();
            item.taskLink = `${taskUrl}${encodeURIComponent(
              item.planId
            )}${encodeURIComponent("/task/")}${encodeURIComponent(
              item.id
            )}${encodeURIComponent("}")}`;
            if (counter === 3) {
              moreTask = true;
              moreTaskLink = `${Task_Link3}${tasksAppId}/tasks`;
            }
            return item;
          });
        } else {
          console.log("No Tasks Found !!!");
        }
      }
      this.setState({
        moreTask: moreTask,
        moreTaskLink: moreTaskLink,
        taskData: sortedArr,
      });
    } catch (err) {
      console.log("Something went wrong !!", err);
    }
  };
  async componentDidMount() {
    this.bindData();
  }

  async bindData() {
    let teamsConfigfromApi = await GetTeamsConfig().catch((err: any) => {
      console.log(err);
    });
    if (teamsConfigfromApi != null) {
      if (teamsConfigfromApi) {
        this.getTaskDetails(teamsConfigfromApi?.tasksAppId);
      } else {
        console.log("No Team Config Found !!");
      }
    }
  }
  openTask = (selectedTask: string) => {
    microsoftTeams.initialize();
    microsoftTeams.executeDeepLink(selectedTask);
  };

  render() {
    const { taskData, moreTask, moreTaskLink } = this.state;
    return (
      <Fragment>
        <div className="task-header">
          <div className="percen-head">${Task_Title}</div>
          {moreTask && (
            <span
              onClick={() => this.openTask(moreTaskLink || "/")}
              className="see-more2"
            >
              See more
            </span>
          )}
        </div>
        <div className="card cd2">
          {taskData?.slice(0, 3).map((task, index) => (
            <div id={`task${index + 1}`} key={index}>
              <div className="custom-control custom-radio cs-radio">
                <input
                  type="radio"
                  name="1"
                  className="custom-control-input"
                  disabled
                />
                <label className={`custom-control-label lb lb${index + 1}`}>
                  <span className="lb-flow">{task.title}</span>
                </label>
              </div>
              <span
                className="cd2-time"
                onClick={() => this.openTask(task.taskLink)}
              >
                {moment(task.dueDateTime).format("DD/MM/YYYY")}
              </span>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default Task;
