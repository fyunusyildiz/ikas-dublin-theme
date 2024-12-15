import { Link } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import Alert from "src/components/components/alert";
import Button from "src/components/components/button";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import Input from "src/components/components/input";

import GoogleCaptcha from "../components/google-captcha";
import useRecoverPassword from "./useRecoverPassword";

export const NS = "recover-password";

const RecoverPassword = () => {
  const recoverPassword = useRecoverPassword();
  const { formAlert, onFormAlertClose, form } = recoverPassword;

  return (
    <div className="w-full flex flex-col items-center my-5">
      <div className="w-full max-w-[500px] px-5">
        <h1 className="text-xl xs:text-lg font-normal text-black mb-2">
          Şifre Sıfırla
        </h1>
        <RecoverPasswordFormAlert
          formAlert={formAlert}
          onFormAlertClose={onFormAlertClose}
        />
        <RecoverPasswordFormComponent {...recoverPassword} />
        <Footer redirect={form.redirect} />
      </div>
    </div>
  );
};

export default observer(RecoverPassword);

type RecoverPasswordFormAlertProps = {
  formAlert: ReturnType<typeof useRecoverPassword>["formAlert"];
  onFormAlertClose: ReturnType<typeof useRecoverPassword>["onFormAlertClose"];
};

const RecoverPasswordFormAlert = observer(
  ({ formAlert, onFormAlertClose }: RecoverPasswordFormAlertProps) => {
    if (!formAlert) return null;
    return (
      <Alert
        closable
        status={formAlert.status}
        title={formAlert.title}
        text={formAlert.text}
        onClose={onFormAlertClose}
      />
    );
  }
);

type RecoverPasswordFormProps = ReturnType<typeof useRecoverPassword>;

const RecoverPasswordFormComponent = observer(
  ({ status, isPending, form, onFormSubmit }: RecoverPasswordFormProps) => {
    return (
      <Form onSubmit={onFormSubmit}>
        <FormItem
          label="Parola"
          help={form.passwordErrorMessage}
          status={status.password}
        >
          <Input
            type="password"
            status={status.password}
            value={form.password}
            onChange={(event) => form.onPasswordChange(event.target.value)}
          />
        </FormItem>
        <FormItem
          label="Parola Tekrar"
          help={form.passwordAgainErrorMessage}
          status={status.passwordAgain}
        >
          <Input
            type="password"
            status={status.passwordAgain}
            value={form.passwordAgain}
            onChange={(event) => form.onPasswordAgainChange(event.target.value)}
          />
        </FormItem>

        <GoogleCaptcha i18nFileName="recover-password" />
        <Button
          size="large"
          block
          type="submit"
          loading={isPending}
          disabled={isPending}
        >
          Gönder
        </Button>
      </Form>
    );
  }
);

type FooterProps = {
  redirect?: string | null;
};

const Footer = ({ redirect }: FooterProps) => {
  const redirectHref = redirect ? "?redirect=" + redirect : "";
  return (
    <footer className="mt-10 py-7 border-t border-solid border-gray-three">
      <div>
        Hesabınız yok mu?{" "}
        <Link passHref href={`/account/register${redirectHref}`}>
          <a className="block w-full text-center py-3 mt-2 text-white text-sm bg-[#222]">
            Kayıt Ol
          </a>
        </Link>
      </div>
      <div className="mt-5">
        Hesabın var mı?
        <Link passHref href={`/account/login${redirectHref}`}>
          <a className="block w-full text-center py-3 mt-2 text-white text-sm bg-[#222]">
            Giriş Yap
          </a>
        </Link>
      </div>
    </footer>
  );
};
