import React, { Fragment } from "react";
import "./metrics.css";
import * as microsoftTeams from "@microsoft/teams-js";
import { GetTeamsConfig } from "../../services/serviceApi";
import { Key_Title } from "../../strings ";
interface IState {
  DeepLinkBaseUrl: string | null;
  report: string | null;
}
interface IProps {}

class Metrics extends React.Component<IProps, IState> {
  getTop(num: number) {
    return `${100 - num}%`;
  }
  getHeight(num: number) {
    return `${num}%`;
  }
  constructor(props: IProps) {
    super(props);
    this.state = {
      DeepLinkBaseUrl: null,

      report: null,
    };

    this.openTask.bind(this.openTask);
  }

  openTask = (DeepLinkBaseUrl: any) => {
    microsoftTeams.initialize();
    let urlToOpen = "";
    urlToOpen = DeepLinkBaseUrl + this.state.report + "/report";
    microsoftTeams.executeDeepLink(urlToOpen);
  };

  async componentDidMount() {
    this.bindData();
  }

  async bindData() {
    //getting team config details
    let teamsConfigfromApi = await GetTeamsConfig().catch((err: any) => {
      console.log(err);
    });
    if (teamsConfigfromApi !== null && teamsConfigfromApi?.length !== 0) {
      this.setState({
        DeepLinkBaseUrl: teamsConfigfromApi?.deepLinkBaseUrl,
        report: teamsConfigfromApi?.reportAppId,
      });
    } else {
      console.log("No Team Config Found !!");
    }
  }

  render() {
    return (
      <Fragment>
        <div className="ht">
          <div className="percen-head">${Key_Title}</div>
          <div
            className="see-more2"
            onClick={() =>
              this.openTask(
                this.state.DeepLinkBaseUrl != null
                  ? this.state.DeepLinkBaseUrl
                  : null
              )
            }
          >
            See more
          </div>
        </div>
        <div className="centage-block">
          <div className="row custom-row vertical rounded">
            <div className="pro-card">
              <span className="percentage-head">Store Sales</span>
              <div className="progress-bar">
                <div className="progress-track">
                  <div
                    className="progress-fill bg-red"
                    style={{ height: this.getHeight(59), top: this.getTop(59) }}
                  >
                    <span className="pr-percentage">59%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pro-card">
              <span className="percentage-head">Cust Sat</span>
              <div className="progress-bar">
                <div className="progress-track">
                  <div
                    className="progress-fill bg-gray"
                    style={{ height: this.getHeight(60), top: this.getTop(60) }}
                  >
                    <span className="pr-percentage">60%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pro-card">
              <span className="percentage-head">My Sales</span>
              <div className="progress-bar">
                <div className="progress-track">
                  <div
                    className="progress-fill bg-gray"
                    style={{ height: this.getHeight(75), top: this.getTop(75) }}
                  >
                    <span className="pr-percentage">75%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Metrics;
