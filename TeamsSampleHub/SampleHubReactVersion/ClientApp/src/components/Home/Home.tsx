import React, { Fragment } from "react";
import Task from "../Task/Task";
import Shift from "../Shift/Shift";
import Metrics from "../Metrics/Metrics";
import Announcements from "../Announcements/Announcements";
import WorkingNow from "../WorkingNow/WorkingNow";
import TeamMember from "../TeamMember/TeamMember";
import News from "../News/News";
import AppItem from "../AppItem/AppItem";
import Footer from "../Footer/Footer";
import NewBannerLogo from "../NewBannerLogo/NewBannerLogo";
import TellUs from "../TellUs/TellUs";
import { GraphHomeapi } from "../../services/serviceApi";
import "../Home/home.css";

interface IProps {
  data: any;
  configuredData: any;
}
interface IState {
  userData: any;
}

class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      userData: {},
    };
  }

  async componentDidMount() {
    this.bindData();
  }

  async bindData() {
    //getting announcemet adaptive card details
    let graphHomeapi = await GraphHomeapi().catch((err: any) => {
      console.log(err);
    });
    if (graphHomeapi != null) {
      this.setState({
        userData: graphHomeapi,
      });
    }
  }
  render() {
    const { data, configuredData } = this.props;
    const { userData } = this.state;
    let myDate = new Date();
    let hrs = myDate.getHours();
    let greet;
    if (hrs < 12) {
      greet = "Good Morning, ";
    } else if (hrs >= 12 && hrs <= 17) {
      greet = "Good Afternoon, ";
    } else if (hrs >= 17 && hrs <= 24) {
      greet = "Good Evening, ";
    }

    return (
      <Fragment>
        <div className="container" id="content">
          <div className="banner-logo">
            <NewBannerLogo
              title={configuredData.appTitle}
              logo={configuredData.logoImage}
            />
          </div>
          <div className="main-heading">
            <span id="greet" className="greet">
              {`${greet}${userData.givenName}`}!
            </span>
          </div>
          {userData?.id && configuredData.teamId ? (
            <div id="banner" className="wish-bg">
              <Shift
                shiftData={data.sharedShiftData}
                userId={userData.id}
                teamId={configuredData.teamId}
              />
            </div>
          ) : (
            ""
          )}
          <div className="section-pad" id="tasks">
            <Task />
          </div>
          <div className="feedback pointer section-pad" id="survey">
            <TellUs></TellUs>
          </div>
          <div className="percentages" id="report">
            <Metrics />
          </div>
          <div className="announcement">
            <Announcements announcementData={data.announcementData} />
          </div>
          <div className="working">
            <WorkingNow WorkingNow={data.workingNowData} />
          </div>
          <div className="row custom-row">
            <TeamMember TeamMember={data.workingNowData} />
          </div>
          <div className="news">
            <News newsData={data.newsData} />
          </div>
          <div className="apps row">
            <AppItem
              lobApplications={configuredData.lobApplicationsLookUp?.filter(
                (app: any) => app.lobApp.tab === "home"
              )}
            />
          </div>

          <Footer
            text={configuredData.homeFooterText}
            imageSrc={configuredData.footerImage}
          />
        </div>
      </Fragment>
    );
  }
}

export default Home;
