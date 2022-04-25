import * as React from "react";

interface BannerProps {
  messages: string[];
}

const Banner = (props: BannerProps) => {

  return (
    <div className="bg-blue-400">
      {/* {props.messages.map((message, key) => {
          return <p key={key}>{message}</p>
      })} */}
      <h3>{props.messages.length > 1 && props.messages[props.messages.length - 1]}</h3>
    </div>
  );
};

export default Banner;