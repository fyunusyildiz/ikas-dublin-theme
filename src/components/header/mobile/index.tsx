import { IkasNavigationLink, Link, useStore } from "@ikas/storefront";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useState } from "react";

import UIStore from "src/store/ui-store";

import { HeaderProps, TextPosition } from "src/components/__generated__/types";
import MaxQuantityPerCartModal from "src/components/components/modal-max-quantity-per-cart";
import AccountSVG from "src/components/svg/account";
import CartSVG from "src/components/svg/cart";

import { useCallback, useEffect, useMemo } from "react";
import ArrowRight from "./svg/arrow-right";
import IOCloseSVG from "./svg/io-close";
import IOMenuSVG from "./svg/io-menu";
import Search from "./svg/search";

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
        className={`w-full transition-all duration-300 border-b border-solid border-[#222] ${
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
        <div className="relative flex flex-row items-center justify-between px-5 h-[60px]">
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
        {uiStore.sidenavVisible ? (
          <IOCloseSVG className="w-full h-full" />
        ) : (
          <IOMenuSVG className="w-full h-full" stroke={"#222"} />
        )}
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
  return (
    <>
      <div
        className={`fixed top-[60px] left-0 bottom-0 bg-white w-full max-w-full border-t border-solid border-[#222] transition-transform z-[100] ${
          uiStore.sidenavVisible ? "translate-x-0" : "-translate-x-full"
        } duration-300 ease-in-out overflow-auto`}
      >
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
      <div className="flex items-center justify-between text-xs border-b border-solid border-[#222]">
        <Link href={link.href} passHref>
          <a className="flex uppercase items-center justify-between w-full px-5 py-4">
            {link.label}
            <ArrowRight />
          </a>
        </Link>
      </div>
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
          searchClicked
            ? "translate-x-0 opacity-100 z-20"
            : "-translate-x-full -z-10 opacity-0"
        }`}
      />
      <button
        onClick={() => router.push(`/search?s=${uiStore.searchKeyword}`)}
        className={`absolute top-full mt-1 right-1 ease-in bg-[#6F6448] text-white font-bold h-8 px-3 z-30 transition-all duration-300 ${
          searchClicked
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2"
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
            className="absolute -right-2 -top-3 rounded-full text-2xs font-bold"
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
