import React from "react";
import { observer } from "mobx-react-lite";
import { IkasProduct, useTranslation } from "@ikas/storefront";

import AlertComponent from "src/components/components/alert";

import Modal from "src/components/components/modal";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import Input from "src/components/components/input";
import Button from "src/components/components/button";

import useModalBackInStock from "./useModalBackInStock";

import { NS } from "src/components/product-detail";

import * as S from "./style";

type Props = {
  isModalVisible: boolean;
  product: IkasProduct;
  onClose: () => void;
};

const ModalBackInStock = ({ isModalVisible, product, onClose }: Props) => {
  const { t } = useTranslation();
  const {
    pending,
    model,
    formAlert,
    status,
    validator,
    onFormAlertClose,
    onSubmit,
  } = useModalBackInStock({ product });

  return (
    <Modal
      visible={isModalVisible}
      title={"GELİNCE HABER VER"}
      onClose={onClose}
    >
      <S.Text>
        Bu ürün stoğa döndüğünde haberdar olmak için lütfen e-posta adresinizi
        yazın.
      </S.Text>
      {formAlert && (
        <AlertComponent
          closable
          status={formAlert.status}
          text={formAlert.text}
          title={formAlert.title}
          onClose={onFormAlertClose}
        />
      )}
      {!formAlert && (
        <Form onSubmit={onSubmit}>
          <FormItem
            help={validator.results.email.errorMessage}
            status={status.email}
            className="!mb-0"
          >
            <Input
              type="text"
              placeholder={"E-posta adresiniz"}
              value={model.email}
              status={status.email}
              onChange={(event) => (model.email = event.target.value)}
            />
          </FormItem>
          <Button block size="large" loading={pending} disabled={pending}>
            GÖNDER
          </Button>
        </Form>
      )}
    </Modal>
  );
};

export default observer(ModalBackInStock);
