import React, { Fragment } from "react";
import "./news.css";
import * as microsoftTeams from "@microsoft/teams-js";
import { News_Title } from "../../strings ";
import { GetTeamsConfig, GetNewsData } from "../../services/serviceApi";
interface IProps {
  newsData: Array<any>;
}

interface IState {
  newsData?: void | Array<any>;
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
  newsAppId?: string | null;
}

class News extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      newsData: [],
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
      newsAppId: null,
    };

    this.openTask.bind(this.openTask);
  }
  openTask = (DeepLinkBaseUrl: any, appName: string) => {
    microsoftTeams.initialize();
    let urlToOpen = "";
    if (appName === "News")
      urlToOpen = DeepLinkBaseUrl + this.state.newsAppId + "/news";

    microsoftTeams.executeDeepLink(urlToOpen);
  };

  async componentDidMount() {
    this.bindData();
  }

  async bindData() {
    let newsData = await GetNewsData().catch((err: any) => {
      console.log(err);
    });
    if (newsData !== null) {
      this.setState({
        newsData: newsData,
      });
    }
    //getting team config details
    let teamsConfigfromApi = await GetTeamsConfig().catch((err: any) => {
      console.log(err);
    });
    if (teamsConfigfromApi != null) {
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
        newsData: newsData,
        newsAppId: teamsConfigfromApi?.data?.newsAppId,
      });
    } else {
      console.log("No Team Config Found !!");
    }
  }

  render() {
    const { newsData = [] } = this.state;
    return (
      <Fragment>
        <div className="news-head">${News_Title}</div>
        <div
          className="see-more3"
          id="news"
          onClick={() =>
            this.openTask(
              this.state.DeepLinkBaseUrl != null
                ? this.state.DeepLinkBaseUrl
                : null,
              "News"
            )
          }
        >
          See more
        </div>
        {newsData.length > 1 ? (
          <div className="carousel3">
            <div id="news" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner car-card">
                <div
                  className="carousel-item active"
                  onClick={() =>
                    this.openTask(
                      this.state.DeepLinkBaseUrl != null
                        ? this.state.DeepLinkBaseUrl
                        : null,
                      "News"
                    )
                  }
                  id="newsLink1"
                >
                  <div className="car-head" id="newsTitle1">
                    {newsData[2].title}{" "}
                  </div>
                  <div className="car-date">March 18, 2020</div>
                  <img
                    className="d-block w-100"
                    src="images/news1.jfif"
                    alt="First slide"
                  />
                  <div className="car-desc" id="newsDescription1">
                    {newsData[2]?.description}
                  </div>
                </div>
                <div
                  className="carousel-item"
                  onClick={() =>
                    this.openTask(
                      this.state.DeepLinkBaseUrl != null
                        ? this.state.DeepLinkBaseUrl
                        : null,
                      "News"
                    )
                  }
                  id="newsLink2"
                >
                  <div className="car-head" id="newsTitle2">
                    {newsData[3].title}{" "}
                  </div>
                  <div className="car-date">March 18, 2020</div>
                  <img
                    className="d-block w-100"
                    src="images/news2.png"
                    alt="Second slide"
                  />
                  <div className="car-desc" id="newsDescription2">
                    {newsData[3]?.description}
                  </div>
                </div>
                <div
                  className="carousel-item"
                  onClick={() =>
                    this.openTask(
                      this.state.DeepLinkBaseUrl != null
                        ? this.state.DeepLinkBaseUrl
                        : null,
                      "News"
                    )
                  }
                  id="newsLink3"
                >
                  <div className="car-head" id="newsTitle3">
                    {newsData[4].title}{" "}
                  </div>
                  <div className="car-date">March 18, 2020</div>
                  <img
                    className="d-block w-100"
                    src="images/news3.png"
                    alt="Third slide"
                  />
                  <div className="car-desc" id="newsDescription3">
                    {newsData[4]?.description}
                  </div>
                </div>
              </div>
              <ol className="carousel-indicators">
                <li
                  data-target="#news"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li data-target="#news" data-slide-to="1"></li>
                <li data-target="#news" data-slide-to="2"></li>
              </ol>
            </div>
          </div>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

export default News;
