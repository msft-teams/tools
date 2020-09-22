import React from "react";
import "./MeetingVideo.css";

interface IProps {
  title: string;
  videoUrl: string;
}
const MeetingVideo = ({ title, videoUrl }: IProps) => {
  return (
    <>
      <div className="video-head">{title}</div>
      <div className="video">
        <iframe
          title="video"
          className="vd-stream"
                  src={videoUrl}
          frameBorder="0"
          id="stream"
        ></iframe>
      </div>
    </>
  );
};

export default MeetingVideo;