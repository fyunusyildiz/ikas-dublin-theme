import { Image, Link } from "@ikas/storefront";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { CategoryBannerWithFiveProps } from "../__generated__/types";

const CategoryBannerWithFive: React.FC<CategoryBannerWithFiveProps> = (
  props
) => {
  return (
    <div
      className={`w-full flex h-[600px] justify-between md:h-fit gap-3 flex-wrap ${
        props.hasMarginTop ? "mt-[160px] md:mt-[100px] sm:mt-[70px]" : ""
      }`}
    >
      <Link href={props.firstCategoryLink.href} passHref>
        <a
          className={`overflow-hidden group w-[49%] md:w-full md:h-[500px] xs:w-full h-full xs:h-[350px] relative flex items-center justify-center`}
        >
          <Image
            image={props.firstCategoryImage}
            layout="fill"
            objectFit="cover"
            alt={props.firstCategoryText}
            useBlur
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 80vw"
            className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          {props.firstCategoryHasFilter && (
            <div className="w-full h-full absolute z-[1] bg-black bg-opacity-35 top-0 left-0" />
          )}
          {props.categoriesHasText && (
            <h6
              className={`absolute z-[2] text-2xl sm:px-3 pb-1 md:pb-0 xs:pb-[2px] md:text-xl sm:text-lg xs:text-base xs:bottom-5 font-bold text-white bottom-10 px-5`}
              style={{
                backgroundColor: props.firstCategoryTextBackground,
                color: props.firstCategoryTextColor,
              }}
            >
              {props.firstCategoryText}
            </h6>
          )}
        </a>
      </Link>
      <div className="w-1/2 md:w-full h-full flex flex-wrap gap-3 justify-between">
        <Link href={props.secondCategoryLink.href} passHref>
          <a
            className={`overflow-hidden group w-[49%] sm:w-[49.2%] xs:w-full h-[294px] sm:h-[300px] xs:h-[350px] relative flex items-center justify-center`}
          >
            <Image
              image={props.secondCategoryImage}
              layout="fill"
              objectFit="cover"
              alt={props.secondCategoryText}
              useBlur
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 80vw"
              className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
            {props.secondCategoryHasFilter && (
              <div className="w-full h-full absolute z-[1] bg-black bg-opacity-35 top-0 left-0" />
            )}
            {props.categoriesHasText && (
              <h6
                className={`absolute z-[2] text-2xl sm:px-3 pb-1 md:pb-0 xs:pb-[2px] md:text-xl sm:text-lg xs:text-base xs:bottom-5 font-bold text-white bottom-10 px-5`}
                style={{
                  backgroundColor: props.secondCategoryTextBackground,
                  color: props.secondCategoryTextColor,
                }}
              >
                {props.secondCategoryText}
              </h6>
            )}
          </a>
        </Link>
        <Link href={props.thirdCategoryLink.href} passHref>
          <a
            className={`group overflow-hidden w-[49%] sm:w-[49.2%] xs:w-full h-[294px] sm:h-[300px] xs:h-[350px] relative flex items-center justify-center`}
          >
            <Image
              image={props.thirdCategoryImage}
              layout="fill"
              objectFit="cover"
              alt={props.thirdCategoryText}
              useBlur
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 80vw"
              className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
            {props.thirdCategoryHasFilter && (
              <div className="w-full h-full absolute z-[1] bg-black bg-opacity-35 top-0 left-0" />
            )}
            {props.categoriesHasText && (
              <h6
                className={`absolute z-[2] text-2xl sm:px-3 pb-1 md:pb-0 xs:pb-[2px] md:text-xl sm:text-lg xs:text-base xs:bottom-5 font-bold text-white bottom-10 px-5`}
                style={{
                  backgroundColor: props.thirdCategoryTextBackground,
                  color: props.thirdCategoryTextColor,
                }}
              >
                {props.thirdCategoryText}
              </h6>
            )}
          </a>
        </Link>
        <Link href={props.fourthCategoryLink.href} passHref>
          <a
            className={`group overflow-hidden w-[49%] sm:w-[49.2%] xs:w-full h-[294px] sm:h-[300px] xs:h-[350px] relative flex items-center justify-center`}
          >
            <Image
              image={props.fourthCategoryImage}
              layout="fill"
              objectFit="cover"
              alt={props.fourthCategoryText}
              useBlur
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 80vw"
              className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
            {props.fourthCategoryHasFilter && (
              <div className="w-full h-full absolute z-[1] bg-black bg-opacity-35 top-0 left-0" />
            )}
            {props.categoriesHasText && (
              <h6
                className={`absolute z-[2] text-2xl sm:px-3 pb-1 md:pb-0 xs:pb-[2px] md:text-xl sm:text-lg xs:text-base xs:bottom-5 font-bold text-white bottom-10 px-5`}
                style={{
                  backgroundColor: props.fourthCategoryTextBackground,
                  color: props.fourthCategoryTextColor,
                }}
              >
                {props.fourthCategoryText}
              </h6>
            )}
          </a>
        </Link>
        <Link href={props.fifthCategoryLink.href} passHref>
          <a
            className={`group overflow-hidden w-[49%] sm:w-[49.2%] xs:w-full h-[294px] sm:h-[300px] xs:h-[350px] relative flex items-center justify-center`}
          >
            <Image
              image={props.fifthCategoryImage}
              layout="fill"
              objectFit="cover"
              alt={props.fifthCategoryText}
              useBlur
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 80vw"
              className="group-hover:scale-105 transition-transform duration-300 ease-in-out"              
            />
            {props.fifthCategoryHasFilter && (
              <div className="w-full h-full absolute z-[1] bg-black bg-opacity-35 top-0 left-0" />
            )}
            {props.categoriesHasText && (
              <h6
                className={`absolute z-[2] text-2xl sm:px-3 pb-1 md:pb-0 xs:pb-[2px] md:text-xl sm:text-lg xs:text-base xs:bottom-5 font-bold text-white bottom-10 px-5`}
                style={{
                  backgroundColor: props.fifthCategoryTextBackground,
                  color: props.fifthCategoryTextColor,
                }}
              >
                {props.fifthCategoryText}
              </h6>
            )}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default observer(CategoryBannerWithFive);
