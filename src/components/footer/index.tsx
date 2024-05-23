import { observer } from "mobx-react-lite";
import Link from "next/link";

import { FooterProps } from "../__generated__/types";
import EmailSubscription from "./email-subscription";

export const NS = "footer"; // Namespace for translation (i18n);

const Footer = (props: FooterProps) => {
  return (
    <div className="w-full mt-20 border-t border-solid border-t-gray-two">
      <div className="w-full flex items-stretch px-5 py-10 flex-wrap md:gap-y-10 xs:px-2 xs:gap-y-7">
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
    <div className="w-1/4 md:w-1/2 xs:w-full flex flex-col gap-y-1 px-4 xs:px-2 border-l border-solid border-gray-two xs:border-none">
      <EmailSubscription {...props} />
    </div>
  );
});

const BrandArea = observer((props: FooterProps) => {
  return (
    <div className="w-1/4 md:w-1/2 xs:w-full flex flex-col gap-y-1 px-4 xs:px-2">
      <h6 className="text-base font-semibold text-black">
        {props.brandTextTitle}
      </h6>
      <div
        className="text-2xs font-normal text-black"
        dangerouslySetInnerHTML={{ __html: props.brandText }}
      />
    </div>
  );
});

const InformationArea = observer((props: FooterProps) => {
  return (
    <div className="w-1/4 md:w-1/2 xs:w-full flex flex-col gap-y-1 px-4 xs:px-2 border-l border-r border-solid border-gray-two md:border-none">
      <h6 className="text-base font-semibold text-black">
        {props.informationBlockTitle}
      </h6>
      <div className="w-full flex flex-col gap-y-2 mt-2">
        {props.informationLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <a
              target={link.isExternal ? "_blank" : undefined}
              className="text-2xs font-normal text-black"
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
    <div className="w-1/4 md:w-1/2 xs:w-full flex flex-col gap-y-1 px-4 xs:px-2 border-solid border-gray-two md:border-l xs:border-none">
      <h6 className="text-base font-semibold text-black">
        {props.socialMediaTitle}
      </h6>
      <div className="w-full flex flex-col gap-y-2 mt-2">
        {props.socialMediaLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <a
              target={link.isExternal ? "_blank" : undefined}
              className="text-2xs font-normal text-black"
            >
              {link.label}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
});
