import React from "react";
import AppItem from "../AppItem/AppItem";
import Footer from "../Footer/Footer";
import "./learning.css";
import NewBannerLogo from "../NewBannerLogo/NewBannerLogo";
import Greeting from "../Greeting/Greeting";
import SectionImg from "../../assets/images/section3.png";
import NavList from "../NavList/NavList";
import MeetingVideo from "../MeetingVideo/MeetingVideo";
import { Learning_Link2, Learning_Link3, Learning_Link1 } from "../../links";

interface IProps {
  data: any;
}

interface IState {}

class Learning extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    const navListItems = [
      {
        id: "handBook",
        label: "Read the employee handbook",
        link: `${Learning_Link1}`,
      },
      {
        id: "chat",
        label: "Connect with your coworkers",
        link: `${Learning_Link2}`,
      },
      {
        id: "portal",
        label: "Check out the employee portal",
        link: `${Learning_Link3}`,
      },
    ];

    return (
      <div id="content" className="container">
        <div className="banner-logo">
          <NewBannerLogo
            title={data.configuredData.appTitle}
            logo={data.configuredData.logoImage}
          />
        </div>
        {data?.configuredData?.learningTabDescription && (
          <Greeting quote={data.configuredData.learningTabDescription} />
        )}
        <div>
          <img src={SectionImg} alt="team-img" className="team-img" />
          <NavList navListItems={navListItems} />
        </div>
        {data?.configuredData?.learningVideoUrl && (
          <div className="section4">
            <MeetingVideo
              videoUrl={data.configuredData.learningVideoUrl}
              title={"CEO Company Meeting"}
            />
          </div>
        )}
        <div className="apps row">
          <AppItem
            lobApplications={data.configuredData.lobApplicationsLookUp.filter(
              (app: any) => app.lobApp.tab === "Learning"
            )}
          />
        </div>
        <div id="information" style={{ display: "none" }}></div>
        <div className="">
          <Footer
            text={data.configuredData.learningFooterText}
            imageSrc={data.configuredData.footerImage}
          />
        </div>
      </div>
    );
  }
}

export default Learning;
