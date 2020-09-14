import React from "react";
import "./MeetingVideo.css";

interface IProps {
  title: string;
  viedoUrl: string;
}
const MeetingVideo = ({ title, viedoUrl }: IProps) => {
  return (
    <>
      <div className="video-head">{title}</div>
      <div className="video">
        <iframe
          title="video"
          className="vd-stream"
          src={viedoUrl}
          frameBorder="0"
          id="stream"
        ></iframe>
      </div>
    </>
  );
};

export default MeetingVideo;
