import * as React from "react";
import { observer } from "mobx-react-lite";
import { Image, Link } from "@ikas/storefront";

import {
  LeftFrame,
  Position,
  Slide,
  SliderProps,
} from "../__generated__/types";

import {
  ArrowLeft as IconArrowLeft,
  ArrowRight as IconArrowRight,
} from "./components/icons";
import useSlider from "./hooks/useSlider";

import styles from "./style.module.css";

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const { sliderRef, prevSlide, nextSlide, hasPrevSlide, hasNextSlide } =
    useSlider({
      slides,
    });

  const getLeftSlidePositionClass = React.useCallback((slide: Slide) => {
    switch (slide.left_hero.left_position) {
      case Position.TOP_LEFT:
        return styles.positionTopLeft;
      case Position.TOP_CENTER:
        return styles.positionTopCenter;
      case Position.TOP_RIGHT:
        return styles.positionTopRight;
      case Position.LEFT_CENTER:
        return styles.positionLeftCenter;
      case Position.CENTER:
        return styles.positionCenter;
      case Position.RIGHT_CENTER:
        return styles.positionRightCenter;
      case Position.BOTTOM_LEFT:
        return styles.positionBottomLeft;
      case Position.BOTTOM_CENTER:
        return styles.positionBottomCenter;
      case Position.BOTTOM_RIGHT:
        return styles.positionBottomRight;
      default:
        return styles.positionCenter;
    }
  }, []);

  const getRightSlidePositionClass = React.useCallback((slide: Slide) => {
    switch (slide.right_hero.right_position) {
      case Position.TOP_LEFT:
        return styles.positionTopLeft;
      case Position.TOP_CENTER:
        return styles.positionTopCenter;
      case Position.TOP_RIGHT:
        return styles.positionTopRight;
      case Position.LEFT_CENTER:
        return styles.positionLeftCenter;
      case Position.CENTER:
        return styles.positionCenter;
      case Position.RIGHT_CENTER:
        return styles.positionRightCenter;
      case Position.BOTTOM_LEFT:
        return styles.positionBottomLeft;
      case Position.BOTTOM_CENTER:
        return styles.positionBottomCenter;
      case Position.BOTTOM_RIGHT:
        return styles.positionBottomRight;
      default:
        return styles.positionCenter;
    }
  }, []);

  const leftSlideTextColor = React.useCallback((slide: Slide) => {
    return {
      color: slide.left_hero.left_title_color || "white",
    };
  }, []);

  const rightSlideTextColor = React.useCallback((slide: Slide) => {
    return {
      color: slide.right_hero.right_title_color || "white",
    };
  }, []);

  const leftSlideButtonStyle = React.useCallback((slide: Slide) => {
    return {
      backgroundColor: slide.left_hero.left_button_background || "white",
      color: slide.left_hero.left_button_color || "black",
    };
  }, []);

  const rightSlideButtonStyle = React.useCallback((slide: Slide) => {
    return {
      backgroundColor: slide.right_hero.right_button_background || "white",
      color: slide.right_hero.right_button_color || "black",
    };
  }, []);

  return (
    <div className={styles.container}>
      <div ref={sliderRef} className={styles.slider}>
        {slides?.map((slide, index) => (
          <div key={index} className={"snap-start relative flex-[0_0_100%] w-full flex flex-wrap"}>
            <div className={"relative w-1/2 h-full md:w-full xs:h-1/2"}>
              <Image
                layout="fill"
                objectFit="cover"
                alt=""
                image={slide.left_hero.left_image}
                useBlur={true}
                sizes="100vw"
              />
              <div className={`absolute top-0 left-0 bottom-0 right-0 p-10 md:p-5 mx-auto flex flex-col justify-center z-[2] gap-y-3 xs:gap-y-2 ${getLeftSlidePositionClass(slide)}`}>
                <div className={"z-[2] text-xl md:text-base xs:text-sm"} style={leftSlideTextColor(slide)}>
                  {slide.left_hero.left_title}
                </div>
                <Link href={slide.left_hero.left_button} passHref>
                  <a
                    className={"cursor-pointer px-10 py-[15px] rounded-[35px] text-lg z-[2] md:px-5 md:py-2 md:text-base xs:text-sm"}
                    style={leftSlideButtonStyle(slide)}
                  >
                    {slide.left_hero.left_button_text}
                  </a>
                </Link>
              </div>
              {slide.left_hero.left_has_filter && (
                <div className="w-full h-full absolute z-[1] bg-black bg-opacity-45 top-0 left-0" />
              )}
            </div>
            <div className={"relative w-1/2 h-full md:w-full xs:h-1/2"}>
              <Image
                layout="fill"
                objectFit="cover"
                alt=""
                image={slide.right_hero.right_image}
                useBlur={true}
                sizes="100vw"
              />
              <div className={`absolute top-0 left-0 bottom-0 right-0 p-10 md:p-5 mx-auto flex flex-col justify-center z-[2] gap-y-3 xs:gap-y-2 ${getRightSlidePositionClass(slide)}`}>
                <div
                  className={"z-[2] text-xl md:text-base xs:text-sm"}
                  style={rightSlideTextColor(slide)}
                >
                  {slide.right_hero.right_title}
                </div>
                <Link href={slide.right_hero.right_button} passHref>
                  <a
                    className={"cursor-pointer px-10 py-[15px] rounded-[35px] text-lg z-[2] md:px-5 md:py-2 md:text-base xs:text-sm"}
                    style={rightSlideButtonStyle(slide)}
                  >
                    {slide.right_hero.right_button_text}
                  </a>
                </Link>
              </div>
              {slide.right_hero.right_has_filter && (
                <div className="w-full h-full absolute z-[1] bg-black bg-opacity-45 top-0 left-0" />
              )}
            </div>
            {hasPrevSlide && (
              <div
                className={`absolute top-1/2 h-12 w-12 z-[4] cursor-pointer bg-white bg-opacity-40 flex items-center justify-center text-white left-[25px] xs:left-[10px] xs:w-7 xs:h-7`}
                onClick={prevSlide}
              >
                <IconArrowLeft />
              </div>
            )}
            {hasNextSlide && (
              <div
                className={`absolute top-1/2 h-12 w-12 z-[4] cursor-pointer bg-white bg-opacity-40 flex items-center justify-center text-white right-[25px] xs:right-[10px] xs:w-7 xs:h-7`}
                onClick={nextSlide}
              >
                <IconArrowRight />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(Slider);
