import { IkasCustomerAddress, useTranslation } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import * as S from "./style";

type Props = {
  address: IkasCustomerAddress;
  index: number;
  onEdit: (address: IkasCustomerAddress, index: number) => void;
  onDelete: (address: IkasCustomerAddress, index: number) => void;
};

const AddressBox = ({ address, index, ...props }: Props) => {
  const { t } = useTranslation();

  const onEdit = () => props.onEdit(address, index);
  const onDelete = () => {
    const isDeleteConfirm = window.confirm("Silmek istediğinize emin misiniz?");
    isDeleteConfirm && props.onDelete(address, index);
  };

  return (
    <S.AddressBox>
      <S.Title>{address.title}</S.Title>
      <S.Content>
        <S.AddressText>{address.addressText}</S.AddressText>
        <S.ButtonsWrapper>
          <S.Button onClick={onEdit}>Adresi Düzenle</S.Button>
          <S.Button onClick={onDelete}>Adresi Sil</S.Button>
        </S.ButtonsWrapper>
      </S.Content>
    </S.AddressBox>
  );
};

export default observer(AddressBox);
