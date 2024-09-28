import { observer } from "mobx-react-lite";
import Link from "next/link";

import { FooterProps } from "../__generated__/types";
import EmailSubscription from "./email-subscription";

export const NS = "footer"; // Namespace for translation (i18n);

const Footer = (props: FooterProps) => {
  return (
    <div className="w-full">
      <div className="w-full h-[22px] bg-[#D9D9D9] border-b border-t border-solid border-[#222]"></div>
      <div className="w-full flex items-stretch flex-wrap">
        <BrandArea {...props} />
        <EmailSubscriptionArea {...props} />
        <InformationArea {...props} />
        <SocialMediaArea {...props} />
      </div>
    </div>
  );
};

export default observer(Footer);

const EmailSubscriptionArea = observer((props: FooterProps) => {
  return (
    <div className="w-1/4 md:w-1/2 xs:w-full flex flex-col gap-y-1 border-l border-solid border-[#222] xs:border-l-0 py-10 px-5 sm:py-5  md:border-b md:border-solid md:border-[#222]">
      <EmailSubscription {...props} />
    </div>
  );
});

const BrandArea = observer((props: FooterProps) => {
  return (
    <div className="w-1/4 md:w-1/2 xs:w-full flex flex-col gap-y-3 py-10 px-5 sm:py-5 md:border-b md:border-solid md:border-[#222]">
      <h6 className="text-base font-semibold text-black">
        {props.brandTextTitle}
      </h6>
      <div
        className="text-xs xs:text-2xs font-normal text-black"
        dangerouslySetInnerHTML={{ __html: props.brandText }}
      />
    </div>
  );
});

const InformationArea = observer((props: FooterProps) => {
  return (
    <div className="w-1/4 md:w-1/2 xs:w-full flex flex-col gap-y-1 border-l border-r border-solid border-[#222] md:border-r-0 py-10 px-5 sm:py-5 xs:border-b">
      <h6 className="text-base font-semibold text-black">
        {props.informationBlockTitle}
      </h6>
      <div className="w-full flex flex-col gap-y-2 mt-2">
        {props.informationLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <a
              target={link.isExternal ? "_blank" : undefined}
              className="text-xs xs:text-2xs font-normal text-black"
            >
              {link.label}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
});

const SocialMediaArea = observer((props: FooterProps) => {
  return (
    <div className="w-1/4 md:w-1/2 xs:w-full flex flex-col gap-y-1 border-solid border-[#222] md:border-l xs:border-none py-10 px-5 sm:py-5">
      <h6 className="text-base font-semibold text-black">
        {props.socialMediaTitle}
      </h6>
      <div className="w-full flex flex-col gap-y-2 mt-2">
        {props.socialMediaLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <a
              target={link.isExternal ? "_blank" : undefined}
              className="text-xs xs:text-2xs font-normal text-black"
            >
              {link.label}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
});
