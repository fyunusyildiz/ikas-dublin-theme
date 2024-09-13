import React from "react";
import { AboutPageProps } from "../__generated__/types";

const AboutPage = ({ ...props }: AboutPageProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full max-w-[1024px] sm:px-5 mx-auto flex flex-col items-center">
        <h1 className="text-[10vw]">{props.aboutHugeTitle}</h1>
        <p dangerouslySetInnerHTML={{ __html: props.aboutDescription }}></p>
      </div>
      <div className="grid grid-cols-2 my-20 xs:my-10 sm:gap-5 w-full">
        {props.images.map((image, index) => (
          <div key={index} className="col-span-1 sm:col-span-2">
            <img src={image.src} alt={image.altText || ""} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
