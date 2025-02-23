import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation, useStore } from "@ikas/storefront";

import NewAddress from "./new-address";
import AddressBox from "./address-box";

import useAddress from "./useAddress";
import AlertComponent from "src/components/components/alert";
import Button from "src/components/components/button";
import CloseIcon from "src/components/svg/close";
import Header from "../components/header";
import { useScreen } from "src/utils/hooks/useScreen";

import { NS } from "../";

import * as S from "./style";

const Address = () => {
  const store = useStore();
  const { t } = useTranslation();
  const { isSmall } = useScreen();
  const {
    isAddressFormVisible,
    addressForm,
    addressesCount,
    hasAddress,
    onAddNewAddressClick,
    onAddressFormClose,
    onAddressSave,
    onAddresEdit,
    onAddressDelete,
  } = useAddress();

  const headerTitle = isAddressFormVisible
    ? addressForm?.isEdit
      ? "Adresi Düzenle"
      : "Yeni Adres Ekle"
    : `Adreslerim (${addressesCount})`;

  const headerRightChild = !hasAddress ? undefined : isAddressFormVisible ? (
    <button title="Close" onClick={onAddressFormClose}>
      <CloseIcon />
    </button>
  ) : (
    <Button
      title="Yeni Adres Ekle"
      size="small"
      onClick={onAddNewAddressClick}
    >
      <PlusIcon />
      {!isSmall && <div>Yeni Adres Ekle</div>}
    </Button>
  );

  return (
    <div>
      <Header title={headerTitle} rightChild={headerRightChild} />
      {!hasAddress && (
        <AlertComponent
          status="info"
          text="Henüz adres eklenmemiş."
        />
      )}
      <S.AddressBoxes $visible={!isAddressFormVisible}>
        {store.customerStore.customer?.addresses?.map((address, index) => (
          <AddressBox
            key={address.id}
            address={address}
            index={index}
            onDelete={onAddressDelete}
            onEdit={onAddresEdit}
          />
        ))}
      </S.AddressBoxes>
      {isAddressFormVisible && (
        <NewAddress addressForm={addressForm!} onSave={onAddressSave} />
      )}
    </div>
  );
};

export default observer(Address);

const PlusIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
  </svg>
);
