import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { BannerProps } from "../__generated__/types";
import { Image, Link } from "@ikas/storefront";

const Banner: React.FC<BannerProps> = (props) => {
  const {
    leftFrameLink,
    leftFrameImage,
    leftFrameText,
    leftFrameTextColor,
    rightFrameLink,
    rightFrameImage,
    rightFrameText,
    rightFrameTextColor,
    leftFrameImageHasFilter,
    rightFrameImageHasFilter,
  } = props;

  const leftFrameTextStyle = React.useMemo(() => {
    return {
      color: leftFrameTextColor ?? "white",
    };
  }, [leftFrameTextColor]);

  const rightFrameTextStyle = React.useMemo(() => {
    return {
      color: rightFrameTextColor ?? "white",
    };
  }, [rightFrameTextColor]);

  return (
    <div className="w-full h-screen md:h-fit flex relative flex-wrap">
      <Link href={leftFrameLink} passHref>
        <a className="w-1/2 xs:w-full h-full md:h-[60vh] xs:h-[45vh] relative p-5">
          {leftFrameImageHasFilter && (
            <div className="w-full h-full absolute z-[1] bg-black bg-opacity-35 top-0 left-0" />
          )}
          <Image
            image={leftFrameImage}
            layout="fill"
            objectFit={"cover"}
            objectPosition={"center"}
          />
          <h6 className={`relative z-[2] text-xl md:text-base xs:text-sm`} style={leftFrameTextStyle}>
            {leftFrameText}
          </h6>
        </a>
      </Link>
      <Link href={rightFrameLink} passHref>
        <a className="w-1/2 xs:w-full h-full md:h-[60vh] xs:h-[45vh] relative p-5">
          <Image
            image={rightFrameImage}
            layout="fill"
            objectFit={"cover"}
            objectPosition={"center"}
          />
          {rightFrameImageHasFilter && (
            <div className="w-full h-full absolute z-[1] bg-black bg-opacity-35 top-0 left-0" />
          )}
          <h6
            className={`relative z-[2] text-xl md:text-base xs:text-sm w-full h-full`}
            style={rightFrameTextStyle}
          >
            {rightFrameText}
          </h6>
        </a>
      </Link>
    </div>
  );
};

export default observer(Banner);
