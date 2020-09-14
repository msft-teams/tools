import React, { Fragment } from "react";
import "./footer.css";

interface IProps {
  text: string;
  imageSrc: string;
}

interface IState {}

class Footer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { text, imageSrc } = this.props;
    return (
      <Fragment>
        <div className="bt-brand">
          <span id="home-footer-text" className="footer-text">
            {text}
          </span>
          <div className="footerImage">
            <img
              src={`data:image/png;base64,${imageSrc}`}
              alt="footer-banner img"
              id="footer-banner-img"
              className="brand-img"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Footer;
