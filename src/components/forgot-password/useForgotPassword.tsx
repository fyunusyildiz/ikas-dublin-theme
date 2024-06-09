import { useState } from "react";
import { ForgotPasswordForm, useStore, useTranslation } from "@ikas/storefront";

import { NS } from ".";
import { FormAlertType } from "../components/alert";
import { FormItemStatus } from "../components/form/form-item";

type UseForgotPasswordStatus = {
  email: FormItemStatus;
};

export default function useForgotPassword() {
  const { t } = useTranslation();

  const [form] = useState(
    new ForgotPasswordForm({
      message: {
        requiredRule: "Bu alan zorunludur",
        emailRule: "Geçerli bir e-posta adresi giriniz.",
      },
    })
  );

  const [isPending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState<FormAlertType>();

  const onFormSubmit = async () => {
    if (isPending) return;

    try {
      setPending(true);
      setFormAlert(undefined);

      const hasError = await form.validateAll();
      if (hasError) return;

      const store = useStore();
      const isEmailExist = await store.customerStore.checkEmail(form.email);
      if (!isEmailExist) {
        setFormAlert({
          status: "error",
          title: "E-posta adresi bulunamadı.",
          text: "Lütfen e-posta adresinizi kontrol ediniz.",
        });
        return;
      }

      const response = await form.submit();
      if (response.isFormError) return;
      if (!response.isSuccess) {
        setFormAlert({
          status: "error",
          title: "Bir hata oluştu.",
          text: "Lütfen tekrar deneyiniz.",
        });
        return;
      }

      setFormAlert({
        status: "success",
        title: "Başarılı!",
        text: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.",
      });
    } catch {
      setFormAlert({
        status: "error",
        title: "Bir hata oluştu.",
        text: "Lütfen tekrar deneyiniz.",
      });
    } finally {
      setPending(false);
    }
  };

  const onFormAlertClose = () => {
    setFormAlert(undefined);
  };

  const status: UseForgotPasswordStatus = {
    email: form.emailErrorMessage ? "error" : undefined,
  };

  return {
    isPending,
    status,
    form,
    onFormSubmit,
    formAlert,
    onFormAlertClose,
  };
}
