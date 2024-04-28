import { useTranslation } from "@ikas/storefront";
import React from "react";

import { ProductDetailProps } from "src/components/__generated__/types";
import { NS } from "src/components/product-detail";

import FacebookSVG from "src/components/svg/facebook";
import PinterestSVG from "src/components/svg/pinterest";
import TwitterSVG from "src/components/svg/twitter";
import WhatsAppSVG from "src/components/svg/whatsApp";

export const SocialShare = (props: ProductDetailProps) => {
  const [origin, setOrigin] = React.useState("");
  const { t } = useTranslation();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  return (
    <div className="my-5 md:mb-0">
      <h4 className="inline-block font-normal text-sm leading-8 mr-3">
        {t(`${NS}:detail.share.title`)}
      </h4>

      <ul className="inline-block">
        <SocialMedia
          type="facebook"
          href={origin + props.product.href}
          Icon={FacebookSVG}
        />
        <SocialMedia
          type="twitter"
          href={origin + props.product.href}
          Icon={TwitterSVG}
        />
        <SocialMedia
          type="whatsApp"
          href={origin + props.product.href}
          text="Hey, check this product: "
          Icon={WhatsAppSVG}
        />
        <SocialMedia
          type="pinterest"
          href={origin + props.product.href}
          Icon={PinterestSVG}
          qsDescription={props.product.description}
          qsMedia={props.product.mainVariantValue?.thumbnailImage?.src}
        />
      </ul>
    </div>
  );
};

type Facebook = {
  type: "facebook";
  href: string;
};

type Twitter = {
  type: "twitter";
  href: string;
  text?: string;
};

type Pinterest = {
  type: "pinterest";
  href: string;
  qsMedia?: string;
  qsDescription?: string;
};

type WhatsApp = {
  type: "whatsApp";
  href: string;
  text: string;
};

export type SocialMediaProps = Facebook | Twitter | Pinterest | WhatsApp;
const SocialMedia = ({
  Icon,
  ...props
}: SocialMediaProps & {
  Icon: (className: any) => JSX.Element;
}) => {
  let href;

  switch (props.type) {
    case "facebook":
      href = "//www.facebook.com/sharer.php?u=" + props.href;
      break;
    case "twitter":
      href = `//twitter.com/share?url=${props.href}&text=${props.text || ""}`;
      break;
    case "pinterest":
      href =
        `//pinterest.com/pin/create/button/?url=${props.href}&amp;media=${
          props.qsMedia || ""
        }?description=${props.qsDescription || ""}` + props.href;
      break;
    case "whatsApp":
      href = `https://wa.me/?text=${props.text} ${props.href}`;
      break;
    default:
      return null;
  }

  if (!href) return null;
  return (
    <li className="inline-block mr-4 last:mr-0">
      <a
        className="w-6 h-6 rounded-full border border-solid border-black inline-flex items-center justify-center"
        href={href}
        target="_blank"
      >
        <Icon className="w-[14px] h-[14px]" />
      </a>
    </li>
  );
};
