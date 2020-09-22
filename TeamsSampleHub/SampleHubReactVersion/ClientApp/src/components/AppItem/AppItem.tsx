import React, { Fragment } from "react";
import "../AppItem/appItem.css";
import * as microsoftTeams from "@microsoft/teams-js";
import { GetTeamsConfig } from "../../services/serviceApi";
interface IProps {
  lobApplications?: Array<any>;
}

interface IState {
  DeepLinkBaseUrl?: string | null;
  payStubs?: string | null;
  benefits?: string | null;
  rewards?: string | null;
  kudos?: string | null;
  survey?: string | null;
  report?: string | null;
  shifts?: string | null;
  channelChatUrl?: string | null;
  portalAppId?: string | null;
  surveyAppId?: string | null;
  insightsAppId?: string | null;
  trainingAppId?: string | null;
}

class AppItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      DeepLinkBaseUrl: null,
      payStubs: null,
      benefits: null,
      rewards: null,
      kudos: null,
      survey: null,
      report: null,
      shifts: null,
      channelChatUrl: null,
      portalAppId: null,
      surveyAppId: null,
      insightsAppId: null,
      trainingAppId: null,
    };

    this.openTask.bind(this.openTask);
  }

  openTask = (DeepLinkBaseUrl: any, appName: string) => {
    microsoftTeams.initialize();
    let urlToOpen = "";

    switch (appName) {
      case "Training":
        urlToOpen =
          DeepLinkBaseUrl + this.state.trainingAppId + "/com.microsoft.sangam";
        break;
      case "Insights":
        urlToOpen =
          DeepLinkBaseUrl +
          this.state.insightsAppId +
          "/5da00cfb-a533-41fc-bfd4-b4e31e7a2695";
        break;
      case "Survey":
        urlToOpen = DeepLinkBaseUrl + this.state.surveyAppId + "/surveys";
        break;
      case "Portal":
        urlToOpen = DeepLinkBaseUrl + this.state.portalAppId + "/portal";
        break;
      case "Rewards":
        urlToOpen = DeepLinkBaseUrl + this.state.rewards + "/rewards";
        break;
      case "Kudos":
        urlToOpen = DeepLinkBaseUrl + this.state.kudos + "/kudos";
        break;
      case "Benefits":
        urlToOpen = DeepLinkBaseUrl + this.state.benefits + "/benefits";
        break;
      case "PayStubs":
        urlToOpen = DeepLinkBaseUrl + this.state.payStubs + "/payslipsviewer";
        break;
      default:
        urlToOpen = DeepLinkBaseUrl + this.state.portalAppId + "/portal";
        break;
    }
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
        payStubs: teamsConfigfromApi?.payStubsAppId,
        benefits: teamsConfigfromApi?.benefitsAppId,
        rewards: teamsConfigfromApi?.rewardsAppId,
        kudos: teamsConfigfromApi?.kudosAppId,
        survey: teamsConfigfromApi?.surveyAppId,
        report: teamsConfigfromApi?.reportAppId,
        shifts: teamsConfigfromApi?.shiftsAppId,
        channelChatUrl: teamsConfigfromApi?.chanpnelChatUrl,
        portalAppId: teamsConfigfromApi?.portalAppId,
        surveyAppId: teamsConfigfromApi?.surveyAppId,
        insightsAppId: teamsConfigfromApi?.insightsAppId,
        trainingAppId: teamsConfigfromApi?.trainingAppId,
      });
    } else {
      console.log("No Team Config Found !!");
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.lobApplications?.map((app, i) => {
          return (
            <div className="col-6 lob-cards" key={i}>
              <div className="app-card">
                <div className="card4" id={app.lobApp.lobAppId}>
                  <img
                    className="card-img-top img-top app-img"
                    src={app.lobApp.lobAppLogoUrl}
                    alt={app.lobApp.lobAppName}
                    width="400"
                    onClick={() =>
                      this.openTask(
                        this.state.DeepLinkBaseUrl != null
                          ? this.state.DeepLinkBaseUrl
                          : null,
                        app.lobApp.lobAppName
                      )
                    }
                  />
                  <div className="card-body cb">
                    <h4
                      className={`card-title ct mb-0 app-head-${app.lobApp.tab}`}
                    >
                      <span>{app.lobApp.lobAppName}</span>
                    </h4>
                    <p
                      className={`card-text designation app-desc-${app.lobApp.tab}`}
                    >
                      {app.lobApp.lobAppDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  }
}

export default AppItem;
