import React, { useState } from "react";
import { observable } from "mobx";
import {
  Validator,
  EmailRule,
  useTranslation,
  IkasProduct,
} from "@ikas/storefront";

import { FormAlertType } from "src/components/components/alert";
import { FormItemStatus } from "src/components/components/form/form-item";


type Status = {
  email: FormItemStatus;
};

type Props = {
  product: IkasProduct;
};

export default function useModalBackInStock({ product }: Props) {
  const { t } = useTranslation();
  const [model] = useState(() => observable({ email: "" }));
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState<FormAlertType | null>();


  const [validator] = useState(
    new Validator(model, [
      new EmailRule({
        fieldKey: "email",
        fieldName: "E-posta",
        valuePath: "email",
        message: "Lütfen bir e-posta adresi girin.",
      }),
    ])
  );

  const onSubmit = async () => {
    const hasError = await validator.validateAll();
    if (hasError) return;

    try {
      const { isBackInStockReminderSaved } = product.selectedVariant;

      setPending(true);
      const result = await product.selectedVariant.saveBackInStockReminder(
        model.email
      );

      const status =
        !isBackInStockReminderSaved && !result
          ? "error"
          : isBackInStockReminderSaved && !result
          ? "info"
          : "success";
      const title =
        status === "error"
          ? "Hata"
          : status === "info"
          ? undefined
          : "Başarılı";
      const text =
        status === "error"
          ? "Bir hata oluştu. Lütfen tekrar deneyin."
          : status === "info"
          ? "Bu e-posta adresi zaten kayıtlı."
          : "Başarıyla kaydedildi.";

      setFormAlert({ status, title, text });
      if (status !== "error") model.email = "";
    } catch (error) {
      console.log("error", error);
      setFormAlert({
        status: "error",
        title: "Hata",
        text: "Bir hata oluştu. Lütfen tekrar deneyin.",
      });
    } finally {
      setPending(false);
    }
  };

  const status: Status = {
    email: validator.results.email.status === "error" ? "error" : undefined,
  };

  const onFormAlertClose = () => setFormAlert(null);

  return {
    pending,
    model,
    formAlert,
    validator,
    status,
    onFormAlertClose,
    onSubmit,
  };
}
