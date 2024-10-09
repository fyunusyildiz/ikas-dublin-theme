import { Link } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import Alert from "src/components/components/alert";
import Button from "src/components/components/button";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import Input from "src/components/components/input";

import GoogleCaptcha from "../components/google-captcha";
import useForgotPassword from "./useForgotPassword";
export const NS = "forgot-password";

const ForgotPassword = () => {
  const forgotPassword = useForgotPassword();
  const { formAlert, onFormAlertClose, form } = forgotPassword;

  return (
    <div className="w-full flex flex-col items-center my-20">
      <div className="w-full max-w-[500px] px-5">
        <h1 className="text-lg xs:text-base font-normal text-black mb-4 w-full text-center">
          Oturum Aç
        </h1>
        <ForgotPasswordFormAlert
          formAlert={formAlert}
          onFormAlertClose={onFormAlertClose}
        />
        <ForgotPasswordFormComponent {...forgotPassword} />
        <Footer redirect={form.redirect} />
      </div>
    </div>
  );
};

export default observer(ForgotPassword);

type ForgotPasswordFormAlertProps = {
  formAlert: ReturnType<typeof useForgotPassword>["formAlert"];
  onFormAlertClose: ReturnType<typeof useForgotPassword>["onFormAlertClose"];
};

const ForgotPasswordFormAlert = observer(
  ({ formAlert, onFormAlertClose }: ForgotPasswordFormAlertProps) => {
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

type ForgotPasswordFormProps = ReturnType<typeof useForgotPassword>;

const ForgotPasswordFormComponent = observer(
  ({ status, isPending, form, onFormSubmit }: ForgotPasswordFormProps) => {
    return (
      <Form onSubmit={onFormSubmit}>
        <FormItem
          help={form.emailErrorMessage}
          status={status.email}
        >
          <Input
            placeholder="E-posta"
            status={status.email}
            value={form.email}
            onChange={(event) => form.onEmailChange(event.target.value)}
          />
        </FormItem>

        <GoogleCaptcha i18nFileName="forgot-password" />
        <Button
          size="large"
          className="!mt-0"
          block
          type="submit"
          loading={isPending}
          disabled={isPending}
        >
          GÖNDER
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
