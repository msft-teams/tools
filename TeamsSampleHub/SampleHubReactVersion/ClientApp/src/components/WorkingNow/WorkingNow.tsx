import React, { Fragment } from "react";
import "../WorkingNow/workingNow.css";
import * as microsoftTeams from "@microsoft/teams-js";
import { WorkingNow_Link } from "../../links";
import { WorkingNow_Title } from "../../strings ";

import {
  GetTeamMemberDetails,
  GetTeamsConfig,
} from "../../services/serviceApi";
interface IProps {
  WorkingNow: Array<any>;
}

interface IState {
  workingNowData?: Array<any>;
  selectedTask?: string | null;
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

class WorkingNow extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      workingNowData: [],
      selectedTask: null,
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
  }

  async componentDidMount() {
    this.bindData();
  }

  async bindData() {
    let workingNowData: [];
    let selectedTask: null;
    let linktoClick: any;

    let TeamMember: any, TeamMemberValue: any;
    //getting new team member details
    TeamMemberValue = await GetTeamMemberDetails().then(function(res){debugger;console.log(res);}).catch((err: any) => {
       console.log(err);
    });
    if (TeamMemberValue != null) {
      if (TeamMemberValue) {
        let counter = 0;
        let groupEmail: any[] = [];
        let chatUrl = `${WorkingNow_Link}`;

        $.each(TeamMemberValue, function (i, item) {
          groupEmail.push(item.userPrincipalName);
          counter++;
          if (counter === 5) {
            return false;
          }
        });
        linktoClick =
          chatUrl +
          groupEmail.toString() +
          "&topicName=On-Shift Crew&message=Hi";
      }
      workingNowData = TeamMemberValue;
      selectedTask = linktoClick;
    }
    let teamsConfigfromApi = await GetTeamsConfig().catch((err: any) => {
      console.log(err);
    });
    if (teamsConfigfromApi != null) {
      this.setState({
        workingNowData: TeamMemberValue,
        selectedTask: linktoClick,
        DeepLinkBaseUrl: teamsConfigfromApi?.deepLinkBaseUrl,
        payStubs: teamsConfigfromApi?.payStubsAppId,
        benefits: teamsConfigfromApi?.benefitsAppId,
        rewards: teamsConfigfromApi?.rewardsAppId,
        kudos: teamsConfigfromApi?.kudosAppId,
        survey: teamsConfigfromApi?.surveyAppId,
        report: teamsConfigfromApi?.reportAppId,
        shifts: teamsConfigfromApi?.shiftsAppId,

        channelChatUrl: teamsConfigfromApi?.channelChatUrl,
        portalAppId: teamsConfigfromApi?.portalAppId,
        surveyAppId: teamsConfigfromApi?.surveyAppId,
        insightsAppId: teamsConfigfromApi?.insightsAppId,
        trainingAppId: teamsConfigfromApi?.trainingAppId,
      });
    } else {
      console.log("No Team Config Found !!");
    }
  }
  openTask = (selectedTask: string) => {
    microsoftTeams.initialize();
    microsoftTeams.executeDeepLink(selectedTask);
  };
  render() {
    const { workingNowData = [] } = this.state;
    return (
      <Fragment>
        <div className="working-head">${WorkingNow_Title}</div>
        <div
          className="start-cht pointer"
          id="groupChat"
          onClick={() => this.openTask(this.state.selectedTask || "/")}
        >
          Start chat
        </div>
        {workingNowData?.length > 0 ? (
          <div className="working-img">
            <div className="avatars">
              <span className="ava">
                <img
                  id="memberPicture0"
                  className="avatar"
                  alt="profile pic"
                  src={workingNowData[0].profilePhotoUrl}
                />
                <span id="memberName0" className="name">
                  {" "}
                  {workingNowData[0].givenName}
                </span>
              </span>
              <span className="ava">
                <img
                  id="memberPicture1"
                  className="avatar"
                  alt="img"
                  src={workingNowData[1].profilePhotoUrl}
                />
                <span id="memberName1" className="name">
                  {" "}
                  {workingNowData[1].givenName}
                </span>
              </span>
              <span className="ava">
                <img
                  id="memberPicture2"
                  className="avatar"
                  alt="img"
                  src={workingNowData[2].profilePhotoUrl}
                />
                <span id="memberName2" className="name">
                  {workingNowData[2].givenName}
                </span>
              </span>
              <span className="ava">
                <img
                  id="memberPicture3"
                  className="avatar"
                  alt="img"
                  src={workingNowData[4].profilePhotoUrl}
                />
                <span id="memberName3" className="name">
                  {workingNowData[4].givenName}
                </span>
              </span>
              <span className="ava">
                <img
                  id="memberPicture4"
                  className="avatar"
                  alt="img"
                  src={workingNowData[5].profilePhotoUrl}
                />
                <span id="memberName4" className="name">
                  {workingNowData[5].givenName}
                </span>
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

export default WorkingNow;
