import {
  IkasBaseStore,
  IkasThemeJsonPageType,
  Link,
  useStore,
  useTranslation,
} from "@ikas/storefront";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import CloseSVG from "src/components/svg/close";
import { useScreen } from "src/utils/hooks/useScreen";

import * as S from "./style";

const menu = [
  {
    label: "Hesabım",
    pageType: IkasThemeJsonPageType.ACCOUNT,
    href: "/account",
  },
  {
    label: "Siparişlerim",
    pageType: IkasThemeJsonPageType.ORDERS,
    href: "/account/orders",
  },
  {
    label: "Adreslerim",
    pageType: IkasThemeJsonPageType.ADDRESSES,
    href: "/account/addresses",
  },
];

const Menu = () => {
  const { t } = useTranslation();
  const store = useStore();
  const { isMobile } = useScreen();
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  const onMenuButtonClick = () => setMobileMenuVisible((prev) => !prev);

  const isListVisible = (isMobile && isMobileMenuVisible) || !isMobile;

  return (
    <>
      {isMobile && isListVisible && <S.MobileOverlay />}
      {isMobile && (
        <FixedMenuToggleButton
          active={isListVisible}
          onMenuButtonClick={onMenuButtonClick}
        />
      )}
      {isListVisible && (
        <S.Wrapper>
          {!isMobile && <S.DesktopTitle>Hesabım</S.DesktopTitle>}
          {isMobile && <MobileTitle store={store} />}
          {isListVisible && <List store={store} />}
        </S.Wrapper>
      )}
    </>
  );
};

export default observer(Menu);

const FixedMenuToggleButton = ({
  active,
  onMenuButtonClick,
}: {
  active: boolean;
  onMenuButtonClick: () => void;
}) => {
  return (
    <S.ToggleButton title="Toggle Navigation Menu" onClick={onMenuButtonClick}>
      {active && <CloseSVG />}
      {!active && (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 20 20"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
    </S.ToggleButton>
  );
};

type MobileTitleProps = {
  store: IkasBaseStore;
};

const MobileTitle = observer(({ store }: MobileTitleProps) => {
  const { t } = useTranslation();
  const currentPage = menu.find(
    (item) => item.pageType === store.currentPageType
  );
  const title =
    store.currentPageType === IkasThemeJsonPageType.ORDER_DETAIL
      ? "Sipariş Detayı"
      : currentPage?.label || "";

  return (
    <S.TitleWrapper>
      <S.Title>{title}</S.Title>
    </S.TitleWrapper>
  );
});

const List = observer(({ store }: { store: IkasBaseStore }) => {
  const { t } = useTranslation();
  return (
    <S.List>
      {menu.map((item, index) => (
        <S.ListItem
          key={index}
          $selected={store.currentPageType === item.pageType}
        >
          <Link passHref href={item.href}>
            {item.label}
          </Link>
        </S.ListItem>
      ))}
      <S.ListItem>
        <button onClick={() => store.customerStore.logout()}>Çıkış Yap</button>
      </S.ListItem>
    </S.List>
  );
});
