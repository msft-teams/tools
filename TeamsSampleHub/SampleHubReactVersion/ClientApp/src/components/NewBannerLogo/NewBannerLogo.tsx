import React, { Fragment } from "react";
import "./NewBannerLogo.css";

interface IProps {
  title: string;
  logo: string;
}

class NewBannerLogo extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, logo } = this.props;
    return (
      <Fragment>
        <div className="new-logo-banner">
          <img
            src={`data:image/png;base64,${logo}`}
            alt="logo"
            className="design-logo"
          />
          <div className="design-logo-title">{title}</div>
        </div>
      </Fragment>
    );
  }
}

export default NewBannerLogo;
