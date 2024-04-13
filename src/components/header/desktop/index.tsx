import { Link, useStore } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import { HeaderProps } from "src/components/__generated__/types";

import MaxQuantityPerCartModal from "src/components/components/modal-max-quantity-per-cart";
import AccountSVG from "src/components/svg/account";
import CartSVG from "src/components/svg/cart";
import FavoriteSVG from "src/components/svg/favorite";
import ArrowDown from "src/components/header/desktop/svg/arrow-down";
import { useState } from "react";

const DesktopHeader = (props: HeaderProps) => {
  return (
    <>
      <header style={{ backgroundColor: props.headerBackgroundColor }}>
        <div className="w-full px-20 py-5">
          <div className="w-full flex justify-between items-center">
            <LeftSide {...props} />
            <Center {...props} />
            <RightSide />
          </div>
        </div>
      </header>
      <MaxQuantityPerCartModal />
    </>
  );
};

export default observer(DesktopHeader);

const LeftSide = (props: HeaderProps) => {
  const { logo, logoMaxHeight, logoMaxWidth } = props;
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
              src={logo.src}
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
              : props.headerLinkColor,
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
                  : props.headerLinkColor
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

const RightSide = observer(() => {
  const store = useStore();
  const quantity = store.cartStore.cart?.itemQuantity ?? 0;
  return (
    <div className="flex items-center gap-3">
      <Link href="/account/favorite-products" passHref>
        <a>
          <FavoriteSVG />
        </a>
      </Link>
      <Link href="/account" passHref>
        <a>
          <AccountSVG />
        </a>
      </Link>
      <Link passHref href="/cart">
        <a className="relative">
          <span className="absolute -right-1 -top-1 rounded-full text-xs">
            {quantity}
          </span>
          <CartSVG />
        </a>
      </Link>
    </div>
  );
});
