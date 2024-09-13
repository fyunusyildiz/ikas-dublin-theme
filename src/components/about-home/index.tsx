import { observer } from "mobx-react-lite";
import { AboutHomeProps } from "../__generated__/types";
import { useCallback } from "react";
import { Link } from "@ikas/storefront";

const AboutHome: React.FC<AboutHomeProps> = (props) => {
  const {
    title,
    subtitle,
    description,
    url,
    marginBottomDesktop,
    marginTopDesktop,
    marginBottomMobile,
    marginTopMobile,
  } = props;

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
      className={`w-full flex items-center justify-between px-5 md:flex-col md:gap-5 sm:gap-3`}
      style={{ margin: getMargin() }}
    >
      <div className="flex flex-col md:w-full">
        <h3 className="text-2xl font-bold uppercase text-[#6F6448]">{title}</h3>
        <h6 className="text-xl xl:text-lg md:text-lg uppercase text-black">
          {subtitle}
        </h6>
      </div>
      <div className="flex flex-col gap-5 md:w-full">
        <p className="text-base font-light tracking-wider text-black max-w-[900px] xl:max-w-[700px] xl:text-sm xs:text-xs md:max-w-[unset] md:w-full">
          {description}
        </p>
        <Link href={url.href}>
          <a className="bg-transparent w-fit text-black border border-solid border-black px-6 py-2 transition-colors duration-300 hover:bg-black hover:text-white rounded-sm text-base sm:text-base">
            {url.label}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default observer(AboutHome);
