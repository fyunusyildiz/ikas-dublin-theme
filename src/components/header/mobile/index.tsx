import { IkasNavigationLink, Link, useStore } from "@ikas/storefront";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useRouter } from "next/router";

import UIStore from "src/store/ui-store";

import { HeaderProps, TextPosition } from "src/components/__generated__/types";
import MaxQuantityPerCartModal from "src/components/components/modal-max-quantity-per-cart";
import AccountSVG from "src/components/svg/account";
import CartSVG from "src/components/svg/cart";

import IOCloseSVG from "./svg/io-close";
import Search from "./svg/search";
import IOMenuSVG from "./svg/io-menu";
import { useEffect, useCallback, useMemo } from "react";

const MobileHeader = (props: HeaderProps) => {
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
        <div className="relative flex flex-row items-center justify-between px-5 h-[70px]">
          <LeftSide {...props} />
          <Center {...props} />
          <RightSide {...props} />
        </div>
        <Sidenav {...props} />
      </header>
      <MaxQuantityPerCartModal />
    </>
  );
};

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
        className={`w-full block text-base px-3 py-1 sm:text-2xs ${getTextPosition()}`}
        style={getStyle}
      >
        {announcementText}
      </a>
    </Link>
  );
};

export default observer(MobileHeader);

const LeftSide = observer((props: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const uiStore = UIStore.getInstance();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }, []);

  return (
    <div className="flex items-center">
      <button className="w-[30px] h-[30px]" onClick={uiStore.toggleSidenav}>
        <IOMenuSVG
          className="w-full h-full"
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
  );
});

const Center = observer((props: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const logo = props.noTransparentHeader
    ? props.logo
    : isScrolled
    ? props.logo
    : props.transparentHeaderLogo;

  const height = props.logoMaxHeightMobile.value;
  const maxWidth = props.logoMaxWidthMobile.value;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }, []);

  return (
    <div className="absolute left-0 right-0 w-fit mx-auto flex items-center">
      <Link passHref href="/">
        <a>
          <figure
            className="relative h-full flex items-center justify-center"
            style={{ height, maxWidth }}
          >
            <img
              className="max-w-full object-contain block mx-auto"
              style={{ height }}
              src={logo?.src}
            />
          </figure>
        </a>
      </Link>
    </div>
  );
});

const Sidenav = observer((props: HeaderProps) => {
  const uiStore = UIStore.getInstance();
  const { logo } = props;

  const height = props.logoMaxHeightMobile.value;
  const maxWidth = props.logoMaxWidthMobile.value;
  return (
    <>
      {uiStore.sidenavVisible && (
        <div
          className="fixed bg-black bg-opacity-50 top-0 right-0 left-0 bottom-0 transition-opacity duration-1000 ease-in-out z-[99]"
          onClick={() => uiStore.toggleSidenav()}
        />
      )}
      <div
        className={`fixed top-0 left-0 bottom-0 bg-white w-full max-w-full py-2 transition-transform z-[100] ${
          uiStore.sidenavVisible ? "translate-x-0" : "-translate-x-full"
        } duration-300 ease-in-out overflow-auto`}
      >
        <div className="flex justify-between items-center px-4 border-b border-solid pb-3 border-b-[#adadad]">
          <figure
            className="relative h-full flex items-center justify-center"
            style={{ height, maxWidth }}
          >
            <img
              className="max-w-full object-contain block mx-auto"
              style={{ height }}
              src={logo.src}
            />
          </figure>
          <button
            className="w-10 h-10 ml-auto mt-2"
            onClick={uiStore.toggleSidenav}
          >
            <IOCloseSVG className="w-full h-full" />
          </button>
        </div>
        <Navigation {...props} />
      </div>
    </>
  );
});

const Navigation = (props: HeaderProps) => {
  return (
    <nav className="flex items-center w-full mb-6 mx-0">
      <ul className="w-full">
        {props.links?.map((link, index) => (
          <NavigationListItem key={index} link={link} />
        ))}
      </ul>
    </nav>
  );
};

const NavigationListItem = ({ link }: { link: IkasNavigationLink }) => {
  const [showSubLinks, setSubLinks] = useState(false);
  const uiStore = UIStore.getInstance();

  return (
    <li>
      <div className="flex items-center justify-between text-base px-4 py-2">
        <Link href={link.href} passHref>
          <a
            className="block uppercase"
            onClick={() => uiStore.toggleSidenav()}
          >
            {link.label}
          </a>
        </Link>
        {!!link.subLinks.length && (
          <button
            className="w-9 h-9 p-1"
            onClick={() => setSubLinks((prev) => !prev)}
          >
            {showSubLinks ? "-" : "+"}
          </button>
        )}
      </div>
      {!!link.subLinks.length && showSubLinks && (
        <div className="bg-white rounded-sm px-4">
          <ul>
            {link.subLinks.map((subLink, subIndex) => (
              <li key={subIndex}>
                <Link href={subLink.href} passHref>
                  <a
                    className="block px-2 py-3"
                    onClick={() => uiStore.toggleSidenav()}
                  >
                    {subLink.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export const SearchInput = observer((props: HeaderProps) => {
  const uiStore = UIStore.getInstance();
  const router = useRouter();
  const [searchClicked, setSearchClicked] = useState(false);

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push(`/search?s=${uiStore.searchKeyword}`);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    uiStore.searchKeyword = event.target.value;
  };

  return (
    <>
      <button onClick={() => setSearchClicked((prev) => !prev)}>
        <Search
          fill={props.noTransparentHeader ? props.headerLinkColor : "black"}
        />
      </button>
      <input
        type="text"
        value={uiStore.searchKeyword}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Ürün Ara"
        className={`absolute top-full left-0 focus:outline-none w-full h-10 p-2 border border-solid border-gray-two transition-all duration-300 z-10 ease-in-out ${
          searchClicked ? "translate-x-0 opacity-100 z-20" : "-translate-x-full -z-10 opacity-0"
        }`}
      />
      <button
        onClick={() => router.push(`/search?s=${uiStore.searchKeyword}`)}
        className={`absolute top-full mt-1 right-1 ease-in bg-[#6F6448] text-white font-bold h-8 px-3 z-30 transition-all duration-300 ${
          searchClicked ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        Ara
      </button>
    </>
  );
});

const RightSide = observer((props: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }, []);
  const store = useStore();
  const quantity = store.cartStore.cart?.itemQuantity ?? 0;
  return (
    <div className="flex items-center gap-0">
      <SearchInput {...props} />
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
      <Link href="/cart" passHref>
        <a className="relative">
          <span
            className="absolute -right-[2px] -top-1 rounded-full text-xs"
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
        </a>
      </Link>
    </div>
  );
});
