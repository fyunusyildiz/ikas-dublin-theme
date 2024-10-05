import {
  IkasBaseStore,
  IkasProduct,
  Image,
  Link,
  useStore,
} from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import { HeaderProps, TextPosition } from "src/components/__generated__/types";

import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import MaxQuantityPerCartModal from "src/components/components/modal-max-quantity-per-cart";
import ArrowDown from "src/components/header/desktop/svg/arrow-down";
import Search from "src/components/header/desktop/svg/search";
import AccountSVG from "src/components/svg/account";
import CartSVG from "src/components/svg/cart";
import Close from "src/components/svg/close";
import FavoriteSVG from "src/components/svg/favorite";
import UIStore from "src/store/ui-store";
import { useAddToCart } from "src/utils/hooks/useAddToCart";
import useFavoriteProducts from "../../account/favorite-products/useFavoriteProducts";
import Delete from "./svg/delete";
import { Items } from "src/components/cart";

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
        className={`w-full border-b border-solid border-[#222222] ${
          isScrolled ? "fixed top-0 z-[999]" : ""
        } ${
          props.noTransparentHeader
            ? ""
            : isScrolled
            ? "fixed top-0 z-[999]"
            : "fixed top-[0px] z-[999] ease-in-out"
        }`}
        style={{
          backgroundColor: props.noTransparentHeader
            ? props.headerBackgroundColor
            : "transparent",
        }}
      >
        <div className="w-full px-[14px] h-[80px]">
          <div className="w-full h-full flex justify-between items-center">
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
        className={`w-full block text-sm px-3 py-1 sm:text-xs ${getTextPosition()}`}
        style={getStyle}
      >
        {announcementText}
      </a>
    </Link>
  );
};

const LeftSide = (props: HeaderProps) => {
  return <Navigation {...props} />;
};

const Navigation = (props: HeaderProps) => {
  return (
    <nav className="w-[40%] h-full">
      <ul
        className={`w-full h-full flex items-center ${
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
  const [hoveredLink, setHoveredLink] = useState("");
  const [categoryOrder, setCategoryOrder] = useState(0);
  const [firstImageOfCategory, setFirstImageOfCategory] = useState("");
  const [secondImageOfCategory, setSecondImageOfCategory] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    props.links.forEach((link, index) => {
      if (link.label === hoveredLink) {
        setCategoryOrder(index);
      }
    });

    if (categoryOrder === 0) {
      setFirstImageOfCategory(props.firstCategoryImages?.[0]?.src ?? "");
      setSecondImageOfCategory(props.firstCategoryImages?.[1]?.src ?? "");
    } else if (categoryOrder === 1) {
      setFirstImageOfCategory(props.secondCategoryImages?.[0]?.src ?? "");
      setSecondImageOfCategory(props.secondCategoryImages?.[1]?.src ?? "");
    } else {
      setFirstImageOfCategory(props.thirdCategoryImages?.[0]?.src ?? "");
      setSecondImageOfCategory(props.thirdCategoryImages?.[1]?.src ?? "");
    }
  }, [hoveredLink, categoryOrder, props]);

  const toggleLinkHover = () => {
    setLinkHoverState(!linkHoverState);
    setHoveredLink(props.link.label);
  };

  const { link } = props;

  return (
    <li className="flex items-center group h-full">
      <Link href={link.href} passHref>
        <a
          onMouseEnter={toggleLinkHover}
          onMouseLeave={toggleLinkHover}
          className={`flex hover:opacity-50 text-xs h-full items-center p-2 uppercase`}
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
          className="hidden group-hover:flex fixed top-[79px] left-0 bg-white z-[9999] w-full flex-col border-b border-solid border-[#222]"
          onMouseEnter={() => setLinkHoverState(true)}
          onMouseLeave={() => setLinkHoverState(false)}
        >
          <div className="w-full h-[22px] bg-[#d9d9d9] border-y border-solid border-[#222]"></div>
          <div className="w-full grid grid-cols-4 h-[450px]">
            <div className="col-span-1 p-5 border-r border-solid border-[#222]">
              <ul className="w-full flex flex-col gap-3">
                {link.subLinks.slice(0, 6).map((subLink, subIndex) => (
                  <li key={subIndex}>
                    <Link href={subLink.href} passHref>
                      <a className="flex items-center gap-3 hover:opacity-60">
                        {subLink.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-1 p-5 border-r border-solid border-[#222]">
              <ul className="w-full flex flex-col gap-3">
                {link.subLinks.slice(6).map((subLink, subIndex) => (
                  <li key={subIndex}>
                    <Link href={subLink.href} passHref>
                      <a className="flex items-center gap-3 hover:opacity-60">
                        {subLink.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-1 overflow-hidden border-r border-solid border-[#222]">
              <img
                src={firstImageOfCategory}
                alt={link.label}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="col-span-1 overflow-hidden">
              <img
                src={secondImageOfCategory}
                alt={link.label}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export const SearchInput = observer((props: HeaderProps) => {
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const uiStore = UIStore.getInstance();
  const router = useRouter();

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push(`/search?s=${uiStore.searchKeyword}`);
    }
  };

  const toggleSearchDrawer = () => {
    setOpenSearchDrawer(!openSearchDrawer);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    uiStore.searchKeyword = event.target.value;
  };

  return (
    <>
      <button onClick={toggleSearchDrawer}>
        <Search
          fill={props.noTransparentHeader ? props.headerLinkColor : "black"}
        />
      </button>
      <div
        className={`w-[660px] fixed top-[80px] z-[999] h-[640px] border border-solid border-[#222] bg-white flex flex-col ${
          openSearchDrawer ? "right-0" : "-right-full"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="w-full flex items-center gap-5 h-[37px]">
          <input
            className="text-2xs h-full px-4 flex-1 focus:outline-none placeholder:text-[#A1A1A1]"
            type="search"
            value={uiStore.searchKeyword}
            placeholder={"ÜRÜN ARA"}
            onKeyPress={onKeyPress}
            onChange={onChange}
          />
          <button
            className="h-full text-2xs flex items-center justify-center p-2 text-[#222]"
            onClick={() => router.push(`/search?s=${uiStore.searchKeyword}`)}
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
        <div className="block w-full h-[22px] bg-[#D9D9D9] border-y border-solid border-[#222]">
          <div className="w-[160.75px] h-full border-r border-solid border-[#222]"></div>
        </div>
        <div className="w-full flex flex-1 overflow-y-scroll flex-wrap bg-[#D9D9D9]">
          <ul className="w-[25%] sticky top-0 h-full flex flex-col gap-2 p-4">
            {props.searchCategories?.map((category, index) => (
              <li key={index}>
                <Link href={category.href} passHref>
                  <a className="text-2xs">{category.label}</a>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap h-full w-3/4 pr-[1px]">
            {props.searchProducts?.data.map((product, index) => (
              <Link href={product.href} key={index} passHref>
                <a className="w-1/2 h-[250px] outline outline-1">
                  <img
                    src={product.selectedVariant.mainImage?.image?.src}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
});

const Center = (props: HeaderProps) => {
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
    <div className="w-fit h-auto">
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

type FavoriteProductProps = {
  product: IkasProduct;
  store: IkasBaseStore;
  getFavoriteProducts: () => void;
};

export const FavoriteProduct = observer((props: FavoriteProductProps) => {
  const [addToCartText, setAddToCartText] = useState("SEPETE EKLE");

  const { addToCart } = useAddToCart();
  const { product, store, getFavoriteProducts } = props;

  const handleDeleteFavoriteProduct = async () => {
    await store.customerStore.removeProductFromFavorites(product.id);
    getFavoriteProducts();
  };
  return (
    <div className="h-full flex flex-col">
      <Link href={product.href} passHref>
        <a className="col-span-1 h-fit flex flex-col border border-solid border-[#222]">
          <figure className="h-[540px] overflow-hidden border-b border-solid border-[#222222d2] relative">
            {!product.selectedVariant.mainImage?.image?.id ? (
              <img src="/product-dummy-image.jpeg" />
            ) : product.selectedVariant.mainImage.image.isVideo ? (
              <video src={product.selectedVariant.mainImage.image.src} />
            ) : (
              <Image
                layout="fill"
                width="125px"
                height="200px"
                className="object-cover object-center"
                image={product.selectedVariant.mainImage?.image!}
              />
            )}
          </figure>
          <div className="w-full flex justify-between px-2 py-2 xs:gap-y-0 xs:flex-col overflow-hidden">
            <p className="text-[13px] h-[22px] xs:w-full uppercase leading-relaxed flex-1 whitespace-nowrap overflow-hidden relative after:absolute after:h-full after:w-5 after:top-0 after:right-0 after:bg-gradient-to-l after:from-white after:to-transparent after:content-['']">
              {product.name}
            </p>
            <div className="flex flex-col items-end min-w-[75px] xs:min-w-[unset] xs:flex-row xs:gap-2">
              {product.selectedVariant.price.hasDiscount && (
                <span className="text-2xs xs:text-[12px] line-through">
                  {product.selectedVariant.price.formattedSellPrice}
                </span>
              )}
              <span className="text-[14px]">
                {product.selectedVariant.price.formattedFinalPrice}
              </span>
            </div>
          </div>
        </a>
      </Link>
      <div className="w-full flex items-center mt-4 xl:mt-2 gap-4">
        {product.selectedVariant.hasStock && (
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
              setAddToCartText("SEPETE EKLENDİ");
              setTimeout(() => {
                setAddToCartText("SEPETE EKLE");
              }, 2000);
            }}
            className="flex-1 h-14 xl:h-12 bg-[#222] text-white py-3 flex items-center justify-center"
          >
            {addToCartText}
          </button>
        )}
        <button
          className="w-24 h-14 xl:h-12 bg-[#222] flex items-center justify-center"
          onClick={() => handleDeleteFavoriteProduct()}
        >
          <Delete />
        </button>
      </div>
    </div>
  );
});

const RightSide = observer((props: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openFavoriteDrawer, setOpenFavoriteDrawer] = useState(false);
  const { products, isPending, getFavoriteProducts } = useFavoriteProducts();
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }, []);

  const handleOpenFavoriteDrawer = () => {
    setOpenFavoriteDrawer(!openFavoriteDrawer);
    if (!products.length) {
      getFavoriteProducts();
    }
  };

  const store = useStore();
  const quantity = store.cartStore.cart?.itemQuantity ?? 0;
  return (
    <>
      <div className="flex items-center gap-3 w-[40%] justify-end">
        <SearchInput {...props} />
        <button
          onClick={() => {
            if (!store.customerStore.customer) {
              router.push("/account/login");
              return;
            }
            getFavoriteProducts();
            handleOpenFavoriteDrawer();
          }}
        >
          <FavoriteSVG
            stroke={
              props.noTransparentHeader
                ? props.headerLinkColor
                : isScrolled
                ? "black"
                : "white"
            }
            fill="transparent"
          />
        </button>
        {openFavoriteDrawer && (
          <div className="fixed border border-solid border-[#222] h-[85vh] w-[90%] top-20 left-0 bottom-0 right-0 flex flex-col items-center m-auto bg-white z-[100]">
            <div className="w-full h-[30px] bg-[#D9D9D9] flex items-center justify-between p-[10px] border-b border-solid border-[#222]">
              <h3 className="text-xs text-[#222] uppercase">FAVORİLER</h3>
              <button onClick={handleOpenFavoriteDrawer}>
                <Close />
              </button>
            </div>
            <div className="w-[95%] h-full my-5 grid grid-cols-3 md:grid-cols-2 px-20 gap-20 xl:gap-10 xl:px-10 md:gap-10 overflow-y-auto">
              {isPending && (
                <div className="col-span-3 h-full flex items-center justify-center">
                  <h3 className="text-4xl text-[#222] text-center">
                    Yükleniyor...
                  </h3>
                </div>
              )}
              {!isPending && products.length === 0 && (
                <div className="col-span-3 h-full flex flex-col gap-5 items-center justify-center">
                  <h3 className="text-4xl md:text-3xl text-[#222] leading-tight text-center">
                    Favori ürününüz bulunmamaktadır.
                  </h3>
                  <button
                    className="underline"
                    onClick={() => {
                      router.push("/");
                      setOpenFavoriteDrawer(false);
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
            className="absolute -right-2 -top-3 font-bold rounded-full text-2xs"
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
        className={`w-full fixed flex justify-end z-[999] top-0 transition-all duration-300 h-screen ${
          openDrawer ? "right-0" : "-right-full"
        }`}
        onClick={() => setOpenDrawer(false)}
      >
        <div
          className="w-[800px] h-full flex flex-col bg-white relative border-l border-solid border-[#222]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full flex items-center h-[81px] px-10 border-b border-solid border-[#222]">
            <div className="flex items-end gap-[20px] sm:gap-5 xs:gap-3">
              <h6 className="text-[40px] text-[#222] leading-none xs:leading-10 sm:text-2xl xs:text-xl">
                Sepet
              </h6>
              <span className="text-base leading-tight text-[#222] sm:text-sm xs:text-xs">
                {quantity} öğe
              </span>
            </div>
          </div>
          <div className="w-full flex-1 flex flex-col overflow-y-auto gap-10">
            <Items insidePadding />
          </div>
          <div className="w-full flex flex-col sticky left-0 bottom-0 pb-5">
            <div className="w-full py-[10px] bg-[#d9d9d9] border-y border-solid border-[#222]"></div>
            <div className="flex items-center justify-between px-5 my-5">
              <div className="flex flex-col">
                Toplam
                <span className="text-[#7a7a7a]">KDV Dahil</span>
              </div>
              <div className="text-[#222] text-[20px]">
                {store.cartStore.cart?.formattedTotalPrice}
              </div>
            </div>
            <div className="w-full flex items-center justify-between px-5">
              <Link passHref href={"/cart"}>
                <a className="w-[49%] flex items-center justify-center py-4 text-base font-semibold bg-[#222] text-white">
                  Sepete Git
                </a>
              </Link>
              <Link passHref href={`${store.cartStore.checkoutUrl}`}>
                <a className="w-[49%] flex items-center justify-center py-4 text-base font-semibold bg-[#222] text-white">
                  Satın Al
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
