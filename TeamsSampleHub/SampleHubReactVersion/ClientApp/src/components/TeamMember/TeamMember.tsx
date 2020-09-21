import React, { Fragment } from "react";
import "../TeamMember/teamMember.css";
import * as microsoftTeams from "@microsoft/teams-js";
import { TeamMember_Link1, TeamMember_Link2 } from "../../links";
import { NewTeamMembers_Title } from "../../strings ";

import {
  GetTeamMemberDetails,
  GetTeamsConfig,
} from "../../services/serviceApi";
interface IProps {
  TeamMember: Array<any>;
}

interface IState {
  TeamMember?: Array<any>;
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

class TeamMember extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      TeamMember: [],
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
    let TeamMember: [], TeamMemberValue: [];
    //getting new team member details
    TeamMemberValue = await GetTeamMemberDetails().catch((err: any) => {
      console.log(err);
    });
    if (TeamMemberValue !== null && TeamMemberValue?.length !== 0) {
      TeamMember = TeamMemberValue;
    }
    let teamsConfigfromApi = await GetTeamsConfig().catch((err: any) => {
      console.log(err);
    });
    if (teamsConfigfromApi != null) {
      this.setState({
        TeamMember: TeamMemberValue,
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
    const { TeamMember = [] } = this.state;
    return (
      <Fragment>
        <div className="new-team">${NewTeamMembers_Title}</div>
        {TeamMember?.length > 0 ? (
          <div className="profile-card">
            <div className="card3">
              <img
                className="card-img-top img-top"
                alt="Profile-card"
                width="400"
                id="newMemberPicture0"
                src={TeamMember[6].profilePhotoUrl}
              />
              <div className="card-body cb">
                <h4 className="card-title ct mb-0" id="newMemberName0">
                  {TeamMember[6].givenName}
                </h4>
                <p
                  className="card-text designation"
                  id="newMemberDesignation0"
                ></p>
              </div>
              <div
                id="newMemberChat0"
                className="btn hi pointer"
                onClick={() => this.openTask(`${TeamMember_Link1}`)}
              >
                Say hi
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {TeamMember?.length > 1 ? (
          <div className="profile-card">
            <div className="card3">
              <img
                className="card-img-top img-top"
                alt="Profile-card"
                width="400"
                id="newMemberPicture1"
                src={TeamMember[7].profilePhotoUrl}
              />
              <div className="card-body cb">
                <h4 className="card-title ct mb-0" id="newMemberName1">
                  {TeamMember[7].givenName}
                </h4>
                <p
                  className="card-text designation"
                  id="newMemberDesignation1"
                ></p>
              </div>
              <div
                id="newMemberChat1"
                className="btn hi pointer"
                onClick={() => this.openTask(`${TeamMember_Link2}`)}
              >
                Say hi
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

export default TeamMember;
