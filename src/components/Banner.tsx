import * as React from "react";

interface BannerProps {
  messages: string[];
}

const Banner = (props: BannerProps) => {

  return (
    <div className="flex justify-center bg-[#5979A9]">
      <p className="text-2xl font-merriweather text-white py-2">{props.messages.length > 1 && props.messages[props.messages.length - 1]}</p>
    </div>
  );
};

export default Banner;