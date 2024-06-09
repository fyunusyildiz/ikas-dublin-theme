import { useState } from "react";
import { useRouter } from "next/router";
import { RecoverPasswordForm, useTranslation } from "@ikas/storefront";

import { NS } from ".";
import { FormAlertType } from "../components/alert";
import { FormItemStatus } from "../components/form/form-item";

type UseRecoverPasswordStatus = {
  password: FormItemStatus;
  passwordAgain: FormItemStatus;
};

export default function useRecoverPassword() {
  const router = useRouter();
  const { t } = useTranslation();

  const [form] = useState(
    new RecoverPasswordForm({
      message: {
        requiredRule: "Bu alan zorunludur",
        minRule: "En az 6 karakter olmalıdır",
        equalsRule: "Şifreler eşleşmiyor",
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
        text: "Şifreniz başarıyla değiştirildi.",
      });

      setTimeout(() => {
        if (form.redirect) {
          router.push(decodeURIComponent(form.redirect));
        } else {
          router.push("/account/login");
        }
      }, 1000);
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

  const status: UseRecoverPasswordStatus = {
    password: form.passwordErrorMessage ? "error" : undefined,
    passwordAgain: form.passwordAgainErrorMessage ? "error" : undefined,
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
