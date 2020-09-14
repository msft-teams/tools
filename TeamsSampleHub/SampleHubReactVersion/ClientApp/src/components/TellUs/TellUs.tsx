import React from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import tellUs from "../../assets/images/How you feeling 2.svg";

class TellUs extends React.Component {
  handleClick() {
    microsoftTeams.initialize();
    microsoftTeams.executeDeepLink(
      "https://teams.microsoft.com/_#/apps/c1e14ebc-36ee-406c-a223-cd902f683c22/sections/surveys"
    );
  }
  render() {
    return (
      <img
        src={tellUs}
        alt="how are feeling"
        className="hw-are-u-feeling"
        onClick={this.handleClick}
      />
    );
  }
}
export default TellUs;
