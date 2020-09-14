import React from "react";
import { ReactComponent as Quote } from "../../assets/images/quote.svg";
import "./gretting.css";

interface IProps {
  quote: string;
}

const Greeting = ({ quote }: IProps) => {
  return (
    <div className="quote-block">
      <Quote className="quote-img" />
      <div className="quote-desc">
        {quote} <br /> <br />
        {"Thank you for all you do!"}
      </div>
    </div>
  );
};

export default Greeting;
