import { observer } from "mobx-react-lite";
import { HeroProps } from "../__generated__/types";
import { Link } from "@ikas/storefront";

const Hero = ({
  desktopImage,
  hasButton,
  hasFilter,
  heroLink,
  mobileImage,
  heroDescription,
  heroTitle,
}: HeroProps) => {
  return (
    <Link href={heroLink.href}>
      <a className="w-full h-screen relative flex items-center justify-center border-b border-solid border-[#222]">
        {hasFilter && (
          <div className="w-full h-full absolute z-[1] bg-black bg-opacity-35 top-0 left-0" />
        )}
        <img
          src={desktopImage.src}
          alt={heroLink.label}
          className="absolute top-0 left-0 w-full h-full object-cover object-center md:hidden"
        />
        <img
          src={mobileImage.src}
          alt={heroLink.label}
          className="absolute top-0 left-0 w-full h-full object-cover object-top hidden md:block"
        />
        {(heroTitle || hasButton || heroDescription) && (
          <div className="flex flex-col gap-3 relative z-10 max-w-[760px] xs:w-[90%]">
            {heroTitle && (
              <h2 className="text-3xl md:text-2xl xs:text-xl font-bold text-white text-center">
                {heroTitle}
              </h2>
            )}
            {heroDescription?.length && (
              <p
                className="text-lg md:text-base xs:text-sm"
                dangerouslySetInnerHTML={{ __html: heroDescription }}
              />
            )}
            {hasButton && (
              <button className="px-8 py-3 text-sm bg-white text-[#222] border border-solid border-[#222] hover:bg-[#222] hover:text-white">
                {heroLink.label}
              </button>
            )}
          </div>
        )}
      </a>
    </Link>
  );
};

export default observer(Hero);
