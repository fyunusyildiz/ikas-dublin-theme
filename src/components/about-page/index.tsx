import React from "react";
import { AboutPageProps } from "../__generated__/types";
import { Image } from "@ikas/storefront";

const AboutPage = ({ ...props }: AboutPageProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center sm:flex-col h-screen sm:h-fit border-b border-solid border-[#222]">
        <div className="w-1/2 sm:w-full h-full sm:h-[600px] xs:h-[300px] sm:border-l-0 border-r sm:border-r-0 sm:border-b border-solid border-[#222] relative">
          <Image
            image={props.firstBlockImage}
            className="w-full h-full object-cover object-center"
            layout="fill"
          />
        </div>
        <div className="w-1/2 sm:w-full flex flex-col h-full gap-10 p-12 pt-20 md:pt-12 sm:p-10 sm:py-16 xs:px-6 sm:gap-3">
          <h3 className="w-full flex items-end text-[40px] sm:text-[30px] xs:text-base gap-x-5 sm:gap-x-3">
            <span className="text-[64px] sm:text-[40px] xs:text-[30px] text-[#222] leading-tight sm:leading-snug xs:leading-tight">
              {props.firstBlockYear}
            </span>
            {props.firstBlockMonth}
          </h3>
          <p
            className="w-full text-[24px] lg:text-base sm:text-sm xs:text-2xs text-[#222]"
            dangerouslySetInnerHTML={{ __html: props.firstBlockText }}
          ></p>
        </div>
      </div>
      <div className="w-full flex items-center sm:flex-col-reverse h-screen sm:h-fit border-b border-solid border-[#222]">
        <div className="w-1/2 sm:w-full flex flex-col h-full gap-10 p-12 pt-20 md:pt-12 sm:p-10 sm:py-16 xs:px-6 sm:gap-3 border-r border-solid border-[#222] sm:border-r-0">
          <h3 className="w-full flex items-end text-[40px] sm:text-[30px] xs:text-base gap-x-5 sm:gap-x-3">
            <span className="text-[64px] sm:text-[40px] xs:text-[30px] text-[#222] leading-tight sm:leading-snug xs:leading-tight">
              {props.secondBlockYear}
            </span>
            {props.secondBlockMonth}
          </h3>
          <p
            className="w-full text-[24px] lg:text-base sm:text-sm xs:text-2xs text-[#222]"
            dangerouslySetInnerHTML={{ __html: props.secondBlockText }}
          ></p>
        </div>
        <div className="w-1/2 sm:w-full h-full sm:h-[600px] xs:h-[300px] sm:border-l-0 sm:border-b border-solid border-[#222] relative">
          <Image
            image={props.secondBlockImage}
            className="w-full h-full object-cover object-center"
            layout="fill"
          />
        </div>
      </div>
      <div className="w-full p-12 pt-20 md:pt-12 sm:p-10 sm:py-16 xs:px-6 gap-10 flex flex-col sm:gap-3">
        <h3 className="w-full text-center text-[64px] sm:text-[40px] xs:text-[30px] text-[#222]">
          {props.thirdBlockYear}
        </h3>
        <p
          className="w-full text-center text-[24px] lg:text-base sm:text-sm xs:text-2xs text-[#222]"
          dangerouslySetInnerHTML={{ __html: props.thirdBlockText }}
        ></p>
      </div>
    </div>
  );
};

export default AboutPage;
