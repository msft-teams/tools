import React from "react";
import "./OffShift.css";

interface IProps {
  data: any;
}

interface IState {}

class OffShift extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <div id="content" className="offshift-container container">
        <div>
          <img
            src={`data:image/png;base64,${data.configuredData.logoImage}`}
            alt="logo"
            className="offshift-logo"
          />
        </div>
        <div className="offshift-heading">
          <div>
            <div className="offshift-red-dot"></div>
          </div>
          <div>
            <h2> You’re currently off shift </h2>
            <p className="offshift-sub-heading">
              You aren’t authorized to use Microsoft Teams during non-working
              hours and will only be compensated for using Teams during approved
              working hours.
              <br />
              <br /> Please come back once you’re on the clock
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default OffShift;
