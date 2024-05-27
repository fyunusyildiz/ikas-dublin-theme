import {
  AccountInfoForm,
  IkasCustomer,
  useStore,
  useTranslation,
} from "@ikas/storefront";
import { useEffect, useState } from "react";

import { FormAlertType } from "src/components/components/alert";
import { FormItemStatus } from "src/components/components/form/form-item";

type StatusType = {
  firstName: FormItemStatus;
  lastName: FormItemStatus;
  phone: FormItemStatus;
};

export default function useAccountInfo() {
  const { t } = useTranslation();
  const [pending, setPending] = useState(false);
  const store = useStore();

  const [formAlert, setFormAlert] = useState<FormAlertType>();
  const [accountInfoForm, setAccountInfoForm] = useState<AccountInfoForm>();

  useEffect(() => {
    if (!store.customerStore.customer) return;
    setAccountInfoForm(
      new AccountInfoForm({
        customer: new IkasCustomer(store.customerStore.customer),
        message: {
          requiredRule: "Bu alan zorunludur.",
          phoneRule: "Geçerli bir telefon numarası giriniz.",
        },
      })
    );
  }, [store.customerStore.customer]);

  const onSubmit = async () => {
    if (pending) return;
    if (!accountInfoForm) return;
    if (formAlert) setFormAlert(undefined);

    setPending(true);
    const result = await accountInfoForm.submit();
    setPending(false);
    if (result.isFormError) return;
    if (!result.isSuccess) {
      setFormAlert({
        status: "error",
        title: "Hata!",
        text: "Bilgileriniz güncellenirken bir hata oluştu.",
      });
      return;
    }

    setFormAlert({
      status: "success",
      title: "Başarılı!",
      text: "Bilgileriniz başarıyla güncellendi.",
    });
  };

  const status: StatusType = {
    firstName: accountInfoForm?.firstNameErrorMessage ? "error" : undefined,
    lastName: accountInfoForm?.lastNameErrorMessage ? "error" : undefined,
    phone: accountInfoForm?.phoneErrorMessage ? "error" : undefined,
  };

  return {
    pending,
    formAlert,
    accountInfoForm,
    status,
    onSubmit,
  };
}
