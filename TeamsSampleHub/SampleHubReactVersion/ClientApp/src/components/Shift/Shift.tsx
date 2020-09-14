import React, { Fragment } from "react";
import moment from "moment";
import "./shift.css";
import { GetShiftDetails } from "../../services/serviceApi";

interface IProps {
  shiftData: any;
  userId: string;
  teamId: string;
}

interface IState {
  shiftTitle: string;
  displayName: string;
  startDateTime: string;
  endDateTime: string;
}

class Shift extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      shiftTitle: "",
      displayName: "",
      startDateTime: "",
      endDateTime: "",
    };
    this.getShift = this.getShift.bind(this);
  }

  async componentDidMount() {
    this.getShift(this.props.teamId);
  }

  // getting shift details
  async getShift(teamId: string) {
    let dateTimeNow = new Date().toISOString();
    let shiftFromDate = new Date();
    let objectId = this.props.userId;
    shiftFromDate.setDate(shiftFromDate.getDate() - 1);
    let graphShiftsUrl = `https://graph.microsoft.com/beta/teams/${teamId}/schedule/shifts?$filter=sharedShift/startDateTime ge ${shiftFromDate.toISOString()}`;
    let graphTemp: any[] = [];
    let shiftTitle = "";
    let shiftDetails = await GetShiftDetails(graphShiftsUrl).catch(
      (err: any) => {
        console.log(err);
      }
    );

    if (shiftDetails) {
      graphShiftsUrl = shiftDetails["@odata.nextLink"];
      graphTemp = graphTemp.concat(shiftDetails.value);
      graphTemp.sort(this.sortShifts);
      let shift = graphTemp.find(
        (s) =>
          s.userId === objectId &&
          ((s.sharedShift.startDateTime <= dateTimeNow &&
            s.sharedShift.endDateTime >= dateTimeNow) ||
            s.sharedShift.startDateTime >= dateTimeNow)
      );
      if (shift) {
        if (shift.sharedShift.startDateTime >= dateTimeNow) {
          shiftTitle = "Your next shift is:";
        } else {
          shiftTitle = "Enjoy your shift and review the tasks assigned to you.";
        }
        this.setShiftCard(shift);
      } else {
        shiftTitle = "No upcoming shifts are available";
      }
    } else {
      console.log("No Team Config Found !!");
    }
    this.setState({ shiftTitle });
  }

  sortShifts = (a: any, b: any) => {
    if (
      new Date(a.sharedShift.startDateTime) <
      new Date(b.sharedShift.startDateTime)
    )
      return -1;
    if (
      new Date(a.sharedShift.startDateTime) >
      new Date(b.sharedShift.startDateTime)
    )
      return 1;
    return 0;
  };

  setShiftCard = (shift: any) => {
    this.setState({
      displayName: shift?.sharedShift?.displayName,
      startDateTime: shift.sharedShift?.startDateTime,
      endDateTime: shift.sharedShift.endDateTime,
    });

    const lineEle = document.getElementById("line");
    if (lineEle) {
      if (shift.sharedShift.theme.includes("dark")) {
        lineEle.style.background = shift.sharedShift.theme
          .substr(4)
          .toLowerCase();
      } else {
        lineEle.style.background = shift.sharedShift.theme
          .substr(4)
          .toLowerCase();
      }
    }
  };

  render() {
    const { shiftTitle, startDateTime, endDateTime, displayName } = this.state;
    return (
      <Fragment>
        <div className="sub-heading">
          <span id="tasksCount" className="tasksCount">
            {shiftTitle}
          </span>
        </div>
        {startDateTime && (
          <div className="card pointer" id="shifts">
            <div>
              <div className="date" id="shiftDate">
                {moment(startDateTime).format("DD")}
              </div>
              <div className="day" id="shiftDay">
                {moment(startDateTime).format("ddd")}
              </div>
            </div>
            <div className="line" id="line"></div>
            <div>
              <div className="time" id="shiftHours">{`${moment(
                startDateTime
              ).format("h:mm A")} - ${moment(endDateTime).format(
                "h:mm A"
              )}`}</div>
            </div>
            <div>
              <div className="msg" id="shiftName">
                {displayName}
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Shift;
