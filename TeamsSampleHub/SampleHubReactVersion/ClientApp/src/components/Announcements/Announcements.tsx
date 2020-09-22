import React, { Fragment } from "react";
import * as AdaptiveCards from "adaptivecards";
import * as microsoftTeams from "@microsoft/teams-js";
import "./announcements.css";
import { Announcements_TeamsLink } from "../../links";
import { Announcement_Title } from "../../strings ";
import { GetAnnouncementAdaptiveCardDetails } from "../../services/serviceApi";
interface IProps {
  announcementData: Array<any>;
}

interface IState {
  data: any;
  renderedCard: any;
  list: Array<any>;
}

class Announcement extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: {},
      renderedCard: "",
      list: [],
    };
  }
  async componentDidMount() {
    this.bindData();
  }

  async bindData() {
    //getting announcemet adaptive card details
    let announcementsfromApi = await GetAnnouncementAdaptiveCardDetails().catch(
      (err: any) => {
        console.log(err);
      }
    );
    if (announcementsfromApi != null && announcementsfromApi.length != 0) {
      this.setState({
        list: announcementsfromApi,
        data: announcementsfromApi
          .filter(
            (item: { partitionKey: string }) =>
              item.partitionKey === "SendingNotifications"
          )
          .sort((a: any, b: any) => {
            return b.createdDate - a.createdDate;
          })[0],
      });
    }
  }

  handleClick() {
    microsoftTeams.initialize();
    microsoftTeams.executeDeepLink(`${Announcements_TeamsLink}`);
  }

  render() {
    const { list = [] } = this.state;
    const lists = list.map((item) => {
      return { ...item, createdDate: new Date(item.createdDate) };
    });
    let da = lists
      .filter((item) => item.partitionKey === "SendingNotifications")
      .sort((a: any, b: any) => {
        return b.createdDate - a.createdDate;
      })[0];
    if (da !== undefined) {
      let card = JSON.parse(da.content) || "";
      if (card) {
        let adaptiveCard = new AdaptiveCards.AdaptiveCard();
        adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
          fontFamily: "Segoe UI, Helvetica Neue, sans-serif",
        });
        adaptiveCard.parse(card);
        let renderedCard = adaptiveCard.render() || "";
        document.getElementById("annoucement")?.append(renderedCard);
      }
    }

    return (
      <Fragment>
        <div className="an-head">${Announcement_Title}</div>
        <div
          className="ann-img pointer"
          onClick={this.handleClick}
          id="annoucement"
        >
          {this.state.renderedCard}
        </div>
      </Fragment>
    );
  }
}

export default Announcement;
