import React from "react";
import "./navlist.css";
import * as microsoftTeams from "@microsoft/teams-js";

interface listItem {
  id: string;
  label: string;
  link: string;
}

interface IProps {
  navListItems: listItem[];
}

class NavList extends React.Component<IProps, {}> {
  handleOnClick(link: string) {
    microsoftTeams.initialize();
    microsoftTeams.executeDeepLink(link);
  }
  render() {
    const { navListItems } = this.props;
    return (
      <React.Fragment>
        {navListItems.map((item: listItem, key) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            key={key}
            onClick={() => this.handleOnClick(item.link)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="head-blk">
              <div className="headings" id={item.id}>
                {item.label}
              </div>
              <div className="chev"></div>
            </div>
          </a>
        ))}
      </React.Fragment>
    );
  }
}

export default NavList;
