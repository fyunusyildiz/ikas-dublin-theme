import { observer } from "mobx-react-lite";
import { FullBannerProps } from "../__generated__/types";
import { useCallback } from "react";
import { Link } from "@ikas/storefront";

const FullBanner: React.FC<FullBannerProps> = (props) => {
  const {
    title,
    backgroundImage,
    description,
    hasFilter,
    url,
    marginTopDesktop,
    marginBottomDesktop,
    marginBottomMobile,
    marginTopMobile,
  } = props;

  const getBackground = useCallback(() => {
    if (backgroundImage) {
      return `url(${backgroundImage.src})`;
    } else {
      return "none";
    }
  }, [backgroundImage]);

  const getMargin = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 768) {
        return `${marginTopDesktop?.value}px 0 ${marginBottomDesktop?.value}px 0`;
      } else {
        return `${marginTopMobile?.value}px 0 ${marginBottomMobile?.value}px 0`;
      }
    }
  }, [
    marginTopDesktop,
    marginBottomDesktop,
    marginTopMobile,
    marginBottomMobile,
  ]);
  return (
    <div
      className={`w-full h-screen xs:h-[70vh] bg-cover bg-center flex items-center justify-center relative`}
      style={{
        backgroundImage: getBackground(),
        margin: getMargin(),
      }}
    >
      {hasFilter && (
        <div className="w-full h-full absolute z-[1] bg-black bg-opacity-35 top-0 left-0" />
      )}
      <div className="relative z-[2] flex flex-col items-center max-w-[1200px] md:w-[90%] gap-4 xs:gap-2">
        <h1 className="text-white drop-shadow-2xl text-4xl sm:text-3xl xs:text-2xl font-bold">
          {title}
        </h1>
        <p
          className="text-white text-2xl md:text-xl xs:text-base font-medium drop-shadow-2xl"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
        <Link href={url.href}>
          <a className="bg-transparent drop-shadow-2xl text-white border border-solid border-white px-8 py-2 xs:px-6 transition-colors duration-300 hover:bg-white hover:text-[#6F6448] rounded-3xl mt-5 font-bold text-xl sm:text-base">
            {url.label}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default observer(FullBanner);
