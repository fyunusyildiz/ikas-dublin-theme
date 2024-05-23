import { LoginForm, useStore, useTranslation } from "@ikas/storefront";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { FormAlertType } from "../components/alert";
import { FormItemStatus } from "../components/form/form-item";

type UseLoginStatus = {
  email: FormItemStatus;
  password: FormItemStatus;
};

export default function useLogin() {
  const router = useRouter();
  const { t } = useTranslation();

  const [form] = useState(
    new LoginForm({
      message: {
        requiredRule: "Bu alan zorunludur.",
        emailRule: "Geçerli bir e-posta adresi giriniz.",
        minRule: "En az 8 karakter girmelisiniz.",
      },
    })
  );

  const [isPending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState<FormAlertType>();

  useEffect(() => {
    const store = useStore();

    if (!store.customerStore.customer?.id) return;
    if (form.redirect) {
      router.push(decodeURIComponent(form.redirect));
    } else {
      router.push("/account");
    }
  }, []);

  const onFormSubmit = async () => {
    if (isPending) return;

    try {
      setPending(true);
      setFormAlert(undefined);
      const response = await form.login();
      if (response.isFormError) return;
      if (!response.isSuccess) {
        setFormAlert({
          status: "error",
          title: "Hata!",
          text: "E-posta adresi veya şifre hatalı.",
        });
        return;
      }

      setFormAlert({
        status: "success",
        title: "Başarılı!",
        text: "Başarıyla giriş yaptınız.",
      });

      setTimeout(() => {
        if (form.redirect) {
          router.push(decodeURIComponent(form.redirect));
        } else {
          router.push("/account");
        }
      }, 1000);
    } catch {
      setFormAlert({
        status: "error",
        title: "Hata!",
        text: "Bir hata oluştu.",
      });
    } finally {
      setPending(false);
    }
  };

  const onFormAlertClose = () => {
    setFormAlert(undefined);
  };

  const status: UseLoginStatus = {
    email: form.emailErrorMessage ? "error" : undefined,
    password: form.passwordErrorMessage ? "error" : undefined,
  };

  return {
    isPending,
    status,
    form,
    onFormSubmit,
    formAlert,
    setFormAlert,
    onFormAlertClose,
  };
}
