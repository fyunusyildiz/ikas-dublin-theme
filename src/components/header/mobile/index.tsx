import { IkasNavigationLink, Link, useStore } from "@ikas/storefront";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import UIStore from "src/store/ui-store";

import { HeaderProps, TextPosition } from "src/components/__generated__/types";
import MaxQuantityPerCartModal from "src/components/components/modal-max-quantity-per-cart";
import AccountSVG from "src/components/svg/account";
import CartSVG from "src/components/svg/cart";

import { useCallback, useEffect, useMemo } from "react";
import useFavoriteProducts from "src/components/account/favorite-products/useFavoriteProducts";
import Close from "src/components/svg/close";
import FavoriteSVG from "src/components/svg/favorite";
import { CartDrawer, FavoriteProduct } from "../desktop";
import ArrowLeft from "./svg/arrow-left";
import ArrowRight from "./svg/arrow-right";
import IOCloseSVG from "./svg/io-close";
import IOMenuSVG from "./svg/io-menu";
import Search from "./svg/search";
import ProductList from "src/components/product-list";

const MobileHeader = (props: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsScrolled(window.scrollY > 20);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-20px 0px 0px 0px",
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={observerRef}
        className="observer-element"
        style={{
          position: "absolute",
          top: 0,
          height: "0px",
          width: "100%",
          pointerEvents: "none",
        }}
      />
      {props.hasAnnouncement && props.noTransparentHeader && (
        <Announcement {...props} />
      )}
      <header
        className={`w-full fixed-header z-[999] transition-all duration-300 border-b border-solid border-[#222] ${
          props.noTransparentHeader
            ? "relative" // transparent olmayan header için relative
            : isScrolled
            ? "fixed-header top-0 left-0 right-0 z-[99] bg-white shadow-sm" // scroll durumunda
            : "relative" // başlangıç durumu
        }`}
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
      {isScrolled && <div className="h-[60px]"></div>}
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
  const [openFavoriteDrawer, setOpenFavoriteDrawer] = useState(false);
  const router = useRouter();
  const uiStore = UIStore.getInstance();
  const { products, isPending, getFavoriteProducts } = useFavoriteProducts();
  const handleOpenFavoriteDrawer = () => {
    setOpenFavoriteDrawer(!openFavoriteDrawer);
    if (!products.length) {
      getFavoriteProducts();
    }
  };
  const store = useStore();
  return (
    <>
      <nav className="flex items-center relative w-full mb-6 mx-0">
        <ul className="w-full">
          {props.links?.map((link, index) => (
            <NavigationListItem key={index} link={link} />
          ))}
          <button
            onClick={handleOpenFavoriteDrawer}
            className="flex uppercase items-center text-base justify-between w-full px-5 py-4 border-b border-solid border-[#222]"
          >
            FAVORİLERİM
            <ArrowRight />
          </button>
        </ul>
      </nav>
      {openFavoriteDrawer && (
        <div className="fixed h-[calc(100vh-60px)] w-full top-0 left-0 bottom-0 right-0 flex flex-col items-center m-auto bg-white z-[100]">
          <div className="w-full h-[30px] bg-[#D9D9D9] flex items-center justify-between p-[10px] px-5 border-b border-solid border-[#222]">
            <h3 className="text-xs text-[#222] uppercase">FAVORİLER</h3>
            <button onClick={handleOpenFavoriteDrawer}>
              <Close />
            </button>
          </div>
          <div className="w-full h-full my-2 grid grid-cols-1 gap-16 p-5 pb-20 overflow-y-auto">
            {isPending && (
              <div className="col-span-3 h-full flex items-center justify-center">
                <h3 className="text-4xl text-[#222] text-center">
                  Yükleniyor...
                </h3>
              </div>
            )}
            {!isPending && products.length === 0 && (
              <div className="col-span-3 h-full w-full flex flex-col gap-5 items-center justify-center">
                <h3 className="text-xl text-[#222] leading-tight text-center">
                  Favori ürününüz bulunmamaktadır.
                </h3>
                <button
                  className="underline"
                  onClick={() => {
                    router.push("/");
                    setOpenFavoriteDrawer(false);
                    uiStore.toggleSidenav();
                  }}
                >
                  Ürünlerimize göz atmak için tıklayınız.
                </button>
              </div>
            )}
            {!isPending &&
              !!products.length &&
              products.map((product, index) => (
                <FavoriteProduct
                  key={index}
                  product={product}
                  store={store}
                  getFavoriteProducts={getFavoriteProducts}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

const NavigationListItem = ({ link }: { link: IkasNavigationLink }) => {
  const [showSubLinks, setSubLinks] = useState(false);
  const uiStore = UIStore.getInstance();

  const handleShowSubLinks = () => {
    setSubLinks(!showSubLinks);
  };

  return (
    <li>
      <div className="flex items-center justify-between text-xs border-b border-solid border-[#222]">
        {link.subLinks.length > 0 ? (
          <>
            <button
              className="flex text-base uppercase items-center justify-between w-full px-5 py-4"
              onClick={handleShowSubLinks}
            >
              {link.label}
              <ArrowRight />
            </button>
            <div
              className={`z-[101] fixed flex flex-col top-0 bg-white left-0 w-full h-full transition-all duration-300 ${
                showSubLinks ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="w-full flex items-center uppercase px-5 py-4 relative bg-[#d9d9d9]">
                <button onClick={handleShowSubLinks} className="z-10">
                  <ArrowLeft />
                </button>
                <h2 className="text-base text-[#222] absolute left-0 right-0 w-full text-center">
                  {link.label}
                </h2>
              </div>
              {link.subLinks.map((subLink, index) => (
                <Link href={subLink.href} key={index} passHref>
                  <a
                    className="flex uppercase text-[#222] border-b border-solid border-[#222] items-center justify-between w-full px-5 py-4"
                    onClick={uiStore.toggleSidenav}
                  >
                    {subLink.label}
                    <ArrowRight />
                  </a>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <Link href={link.href} passHref>
            <a className="flex uppercase items-center justify-between w-full px-5 py-4">
              {link.label}
              <ArrowRight />
            </a>
          </Link>
        )}
      </div>
    </li>
  );
};

export const SearchInput = observer((props: HeaderProps) => {
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const uiStore = UIStore.getInstance();
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState("");

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push(`/search?s=${searchKeyword}`);
    }
  };

  const handleSearch = () => {
    toggleSearchDrawer();
    router.push(`/search?s=${searchKeyword}`);
  };

  const toggleSearchDrawer = () => {
    setOpenSearchDrawer(!openSearchDrawer);
  };

  const onChange = (value: string) => {
    setSearchKeyword(value);
  };

  return (
    <>
      <button onClick={toggleSearchDrawer}>
        <Search
          fill={props.noTransparentHeader ? props.headerLinkColor : "black"}
        />
      </button>
      <div
        className={`w-full fixed top-[60px] z-[999] border border-solid border-[#222] bg-white flex flex-col ${
          openSearchDrawer ? "right-0" : "-right-full"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="w-full flex items-center gap-5 h-[37px]">
          <input
            className="text-2xs h-full px-4 flex-1 focus:outline-none placeholder:text-[#A1A1A1]"
            type="search"
            value={searchKeyword}
            placeholder={"ÜRÜN ARA"}
            onKeyPress={onKeyPress}
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            className="h-full text-2xs flex items-center justify-center p-2 text-[#222]"
            onClick={handleSearch}
          >
            ARA
          </button>
          <button
            className="h-full text-2xs flex items-center justify-center p-2 text-[#A1A1A1]"
            onClick={toggleSearchDrawer}
          >
            KAPAT
          </button>
        </div>
      </div>
    </>
  );
});

const RightSide = observer((props: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const [openFavoriteDrawer, setOpenFavoriteDrawer] = useState(false);
  const { products, isPending, getFavoriteProducts } = useFavoriteProducts();
  const router = useRouter();

  const handleOpenFavoriteDrawer = () => {
    setOpenFavoriteDrawer(!openFavoriteDrawer);
    if (!products.length) {
      getFavoriteProducts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }, []);
  const store = useStore();
  const quantity = store.cartStore.cart?.itemQuantity ?? 0;
  return (
    <>
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
        <button
          onClick={() => setOpenCartDrawer(!openCartDrawer)}
          className="relative"
        >
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
        </button>
      </div>
      <CartDrawer
        openDrawer={openCartDrawer}
        setOpenDrawer={setOpenCartDrawer}
        suggestedProductsList={props.suggestedProductsList.data}
        suggestedProductsTitle={props.suggestedProductsTitle}
      />
    </>
  );
});
