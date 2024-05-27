import { useTranslation } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "src/components/__generated__/types";
import Tooltip from "src/components/components/tooltip";
import useFavorite from "./useFavorite";
// import { Loading } from "src/components/components/button";
import { NS } from "src/components/product-detail";
import ModalLoginRequired from "../components/modal-login-required";

import FavoriteSVG from "src/components/svg/favorite";

export const FavoriteButton = observer(({ product }: ProductDetailProps) => {
  const { t } = useTranslation();
  const {
    isProductFavorite,
    showLoginModal,
    closeLoginModal,
    pending,
    toggleFavorite,
  } = useFavorite({
    productId: product.id,
  });

  const tooltipText = isProductFavorite
    ? t(`${NS}:detail.favorite.tooltipText.remove`)
    : t(`${NS}:detail.favorite.tooltipText.add`);

  const modalLoginText = (key: string) =>
    t(`${NS}:detail.favorite.loginModal.${key}`);

  return (
    <>
      <button
        className="absolute top-2 right-0 w-8 h-8 text-black"
        disabled={pending}
        onClick={toggleFavorite}
      >
        <Tooltip noCursor text={tooltipText} placement="left">
          {/* {pending && <Loading />} */}
          {!pending && <FavoriteSVG fill={isProductFavorite} />}
        </Tooltip>
      </button>
      <ModalLoginRequired
        isModalVisible={showLoginModal}
        title={modalLoginText("title")}
        text={modalLoginText("text")}
        loginButtonText={modalLoginText("loginButtonText")}
        noAccountText={modalLoginText("noAccountText")}
        redirectUrl={product.href}
        onClose={closeLoginModal}
      />
    </>
  );
});

FavoriteButton.displayName = "FavoriteButton";
