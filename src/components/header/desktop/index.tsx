import { Link, useStore } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import { HeaderProps, TextPosition } from "src/components/__generated__/types";

import MaxQuantityPerCartModal from "src/components/components/modal-max-quantity-per-cart";
import AccountSVG from "src/components/svg/account";
import CartSVG from "src/components/svg/cart";
import Close from "src/components/svg/close";
import FavoriteSVG from "src/components/svg/favorite";
import ArrowDown from "src/components/header/desktop/svg/arrow-down";
import { useState, useCallback, useMemo, useEffect } from "react";
import right from "src/components/product-list/right";
import Button from "src/components/components/button";

const DesktopHeader = (props: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }, []);
  return (
    <>
      {props.hasAnnouncement && props.noTransparentHeader && (
        <Announcement {...props} />
      )}
      <header
        className={`w-full transition-all duration-300 ${
          props.noTransparentHeader
            ? ""
            : "fixed top-[0px] z-[999] transition-all duration-300 ease-in-out"
        } ${isScrolled ? "fixed top-0 z-[999] shadow-sm" : ""}`}
        style={{
          backgroundColor: props.noTransparentHeader
            ? props.headerBackgroundColor
            : isScrolled
            ? "white"
            : "transparent",
        }}
      >
        <div className="w-full px-20 py-5">
          <div className="w-full flex justify-between items-center">
            <LeftSide {...props} />
            <Center {...props} />
            <RightSide {...props} />
          </div>
        </div>
      </header>
      <MaxQuantityPerCartModal />
    </>
  );
};

export default observer(DesktopHeader);

const Announcement: React.FC<HeaderProps> = (props) => {
  const { announcementText } = props;

  const getTextPosition = useCallback(() => {
    switch (props.announcementTextAlign) {
      case TextPosition.LEFT:
        return "text-left";
      case TextPosition.CENTER:
        return "text-center";
      case TextPosition.RIGHT:
        return "text-right";
      default:
        return "text-center";
    }
  }, [props.announcementTextAlign]);
  const getStyle = useMemo(() => {
    return {
      color: props.announcementTextColor ?? "white",
      backgroundColor: props.announcementBgColor ?? "black",
    };
  }, [props.announcementTextColor, props.announcementBgColor]);

  return (
    <Link href={props.announcementLink} passHref>
      <a
        className={`w-full block text-base px-3 py-2 sm:text-xs ${getTextPosition()}`}
        style={getStyle}
      >
        {announcementText}
      </a>
    </Link>
  );
};

const LeftSide = (props: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const logo = props.noTransparentHeader
    ? props.logo
    : isScrolled
    ? props.logo
    : props.transparentHeaderLogo;

  const { logoMaxHeight, logoMaxWidth } = props;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }, []);

  return (
    <div className="w-auto h-auto">
      <Link passHref href="/">
        <a>
          <figure
            className="relative"
            style={{
              height: logoMaxHeight.value,
              maxWidth: logoMaxWidth.value,
            }}
          >
            <img
              style={{ height: logoMaxHeight.value, width: logoMaxWidth.value }}
              src={logo?.src}
            />
          </figure>
        </a>
      </Link>
    </div>
  );
};

const Center = (props: HeaderProps) => {
  return <Navigation {...props} />;
};

const Navigation = (props: HeaderProps) => {
  return (
    <nav className="w-[80%]">
      <ul
        className={`w-full flex items-center gap-x-5 ${
          props.isCentered ? "justify-center" : "justify-start"
        }`}
      >
        {props.links?.map((link, index) => (
          <NavItem key={index} link={link} {...props} />
        ))}
      </ul>
    </nav>
  );
};

interface LinkProps {
  href: string;
  label: string;
  subLinks: { href: string; label: string }[];
}

const NavItem = (props: { link: LinkProps } & HeaderProps) => {
  const [linkHoverState, setLinkHoverState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }, []);

  const toggleLinkHover = () => {
    setLinkHoverState(!linkHoverState);
  };

  const { link } = props;

  return (
    <li className="relative inline-block group">
      <Link href={link.href} passHref>
        <a
          onMouseEnter={toggleLinkHover}
          onMouseLeave={toggleLinkHover}
          className={`flex p-2 transition-colors duration-300 ease-in-out`}
          style={{
            color: linkHoverState
              ? props.headerLinkHoverColor
              : props.noTransparentHeader
              ? props.headerLinkColor
              : isScrolled
              ? "black"
              : "white",
            backgroundColor: linkHoverState
              ? props.headerLinkHoverBg
              : "transparent",
          }}
        >
          {link.label}
          {!!link.subLinks.length && (
            <ArrowDown
              fill={
                linkHoverState
                  ? props.headerLinkHoverColor
                  : props.noTransparentHeader
                  ? props.headerLinkColor
                  : isScrolled
                  ? "black"
                  : "white"
              }
            />
          )}
        </a>
      </Link>
      {!!link.subLinks.length && (
        <div
          className="hidden group-hover:block absolute top-full bg-white z-50 p-5"
          onMouseEnter={() => setLinkHoverState(true)}
          onMouseLeave={() => setLinkHoverState(false)}
        >
          <ul>
            {link.subLinks.map((subLink, subIndex) => (
              <li key={subIndex}>
                <Link href={subLink.href} passHref>
                  <a className="flex items-center gap-3">{subLink.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

const RightSide = observer((props: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }, []);
  const store = useStore();
  const quantity = store.cartStore.cart?.itemQuantity ?? 0;
  return (
    <>
      <div className="flex items-center gap-3">
        <Link href="/account/favorite-products" passHref>
          <a>
            <FavoriteSVG
              stroke={
                props.noTransparentHeader
                  ? props.headerLinkColor
                  : isScrolled
                  ? "black"
                  : "white"
              }
            />
          </a>
        </Link>
        <Link href="/account" passHref>
          <a>
            <AccountSVG
              stroke={
                props.noTransparentHeader
                  ? props.headerLinkColor
                  : isScrolled
                  ? "black"
                  : "white"
              }
            />
          </a>
        </Link>
        <button className="relative" onClick={() => setOpenDrawer(!openDrawer)}>
          <span
            className="absolute -right-1 -top-1 rounded-full text-xs"
            style={{
              color: props.noTransparentHeader
                ? props.headerLinkColor
                : isScrolled
                ? "black"
                : "white",
            }}
          >
            {quantity}
          </span>
          <CartSVG
            stroke={
              props.noTransparentHeader
                ? props.headerLinkColor
                : isScrolled
                ? "black"
                : "white"
            }
          />
        </button>
      </div>
      <div
        className={`w-full fixed flex justify-end z-[999] top-0 transition-all duration-300 h-screen bg-black bg-opacity-30 ${
          openDrawer ? "right-0" : "-right-full"
        }`}
        onClick={() => setOpenDrawer(false)}
      >
        <div
          className="w-1/3 h-full bg-white relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full py-3 border-b border-solid border-gray-two flex items-center justify-between px-5">
            <h3 className="text-lg font-semibold">
              Sepetim <span>({quantity})</span>
            </h3>
            <button onClick={() => setOpenDrawer(false)}>
              <Close />
            </button>
          </div>
          <div className="w-full overflow-y-auto h-full">
          </div>
          <div className="w-full flex items-center justify-between p-3 absolute left-0 bottom-0">
            <Link passHref href={"/cart"}>
              <a className="w-[48%] flex items-center justify-center py-3 bg-google-green rounded-sm font-semibold">
                Sepete Git
              </a>
            </Link>
            <Link passHref href={`${store.cartStore.checkoutUrl}`}>
              <a className="w-[48%] flex items-center justify-center py-3 bg-google-green rounded-sm font-semibold">
                Alışverişi Tamamla
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
});
