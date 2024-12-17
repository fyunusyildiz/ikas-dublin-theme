import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "src/components/__generated__/types";
import useFavorite from "./useFavorite";
// import { Loading } from "src/components/components/button";
import ModalLoginRequired from "../components/modal-login-required";

import FavoriteSVG from "src/components/svg/favorite";

export const FavoriteButton = observer(({ product }: ProductDetailProps) => {
  const {
    isProductFavorite,
    showLoginModal,
    closeLoginModal,
    pending,
    toggleFavorite,
  } = useFavorite({
    productId: product.id,
  });

  return (
    <>
      <button
        className="w-[70px] xs:w-[50px] md:w-[60px] md:h-[50px] h-[60px] bg-[#d9d9d9] text-[#222] flex items-center justify-center"
        disabled={pending}
        onClick={toggleFavorite}
      >
        {!pending && (
          <FavoriteSVG
            stroke={"#222"}
            fill={isProductFavorite ? "#222" : "transparent"}
          />
        )}
      </button>
      <ModalLoginRequired
        isModalVisible={showLoginModal}
        title={"Giriş Yap"}
        text={"Favorilere eklemek için giriş yapmanız gerekmektedir."}
        loginButtonText={"Giriş Yap"}
        noAccountText={"Hesabınız yok mu? Hemen üye olun!"}
        redirectUrl={product.productHref}
        onClose={closeLoginModal}
      />
    </>
  );
});

FavoriteButton.displayName = "FavoriteButton";
