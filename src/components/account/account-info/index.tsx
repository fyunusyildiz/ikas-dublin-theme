import { useTranslation } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import Alert from "src/components/components/alert";
import Button from "src/components/components/button";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import Input from "src/components/components/input";
import Header from "../components/header";

import useAccountInfo from "./useAccountInfo";

const AccountInfo = () => {
  const { t } = useTranslation();
  const { pending, formAlert, status, accountInfoForm, onSubmit } =
    useAccountInfo();

  if (!accountInfoForm) return null;
  return (
    <div>
      <Header title="Hesap Bilgilerim" />
      {formAlert && (
        <Alert
          closable
          status={formAlert.status}
          title={formAlert.title}
          text={formAlert.text}
        />
      )}
      <Form onSubmit={onSubmit}>
        <FormItem
          label="Ad"
          help={accountInfoForm.firstNameErrorMessage}
          status={status.firstName}
        >
          <Input
            status={status.firstName}
            value={accountInfoForm.firstName}
            onChange={(event) =>
              accountInfoForm.onFirstNameChange(event.target.value)
            }
          />
        </FormItem>
        <FormItem
          label="Soyad"
          help={accountInfoForm.lastNameErrorMessage}
          status={status.lastName}
        >
          <Input
            status={status.lastName}
            value={accountInfoForm.lastName}
            onChange={(event) =>
              accountInfoForm.onLastNameChange(event.target.value)
            }
          />
        </FormItem>
        <FormItem
          help={accountInfoForm.phoneErrorMessage}
          status={status.phone}
          label="Telefon"
        >
          <Input
            status={status.phone}
            value={accountInfoForm.phone}
            onChange={(event) =>
              accountInfoForm.onPhoneChange(event.target.value)
            }
          />
        </FormItem>
        <FormItem label="E-Posta">
          <Input disabled value={accountInfoForm.email || ""} />
        </FormItem>
        <Button type="submit" loading={pending} disabled={pending}>
          Kaydet
        </Button>
      </Form>
    </div>
  );
};

export default observer(AccountInfo);
