import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RegisterForm, useStore, useTranslation } from "@ikas/storefront";

import { NS } from ".";
import { FormAlertType } from "../components/alert";
import { FormItemStatus } from "../components/form/form-item";
import { RegisterProps } from "../__generated__/types";

type UseRegisterStatus = {
  firstName: FormItemStatus;
  lastName: FormItemStatus;
  email: FormItemStatus;
  password: FormItemStatus;
};

export default function useRegister(props: RegisterProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const [form] = useState(
    new RegisterForm({
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
    setFormSubmitted(true);
    if (props.isMarketingEmailRequired && !form.isMarketingAccepted) {
      await form.validateAll();
      return;
    }

    try {
      setPending(true);
      setFormAlert(undefined);
      const store = useStore();
      const isEmailExist = await store.customerStore.checkEmail(form.email);
      if (isEmailExist) {
        setFormAlert({
          status: "error",
          title: "Hata!",
          text: "Bu e-posta adresi zaten kullanımda.",
        });
        return;
      }
      const response = await form.register();
      if (response.isFormError) return;
      if (!response.isSuccess) {
        setFormAlert({
          status: "error",
          title: "Hata!",
          text: "Bir hata oluştu.",
        });
        return;
      }

      setFormAlert({
        status: "success",
        title: "Başarılı!",
        text: "Başarıyla kayıt oldunuz.",
      });

      setTimeout(() => {
        if (form.redirect) {
          router.push(decodeURIComponent(form.redirect));
        } else {
          router.push("/account");
        }
      }, 1000);
      setFormSubmitted(false);
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

  const status: UseRegisterStatus = {
    firstName: form.firstNameErrorMessage ? "error" : undefined,
    lastName: form.lastNameErrorMessage ? "error" : undefined,
    email: form.emailErrorMessage ? "error" : undefined,
    password: form.passwordErrorMessage ? "error" : undefined,
  };

  return {
    isPending,
    isFormSubmitted,
    status,
    form,
    onFormSubmit,
    formAlert,
    setFormAlert,
    onFormAlertClose,
  };
}
