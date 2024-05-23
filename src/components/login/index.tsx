import { Link, useTranslation } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import Alert from "src/components/components/alert";
import Button from "src/components/components/button";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import GoogleCaptcha from "src/components/components/google-captcha";
import Input from "src/components/components/input";

import useSocialLogin from "src/utils/hooks/useSocialLogin";
import useLogin from "./useLogin";

export const NS = "login";

const Login = () => {
  const { t } = useTranslation();
  const login = useLogin();
  const { formAlert, onFormAlertClose, form } = login;

  return (
    <div className="w-full">
      <div className="w-full max-w-[500px] px-5 mt-40 mb-20 ml-28 md:mt-16 md:mb-16 md:ml-12 xs:ml-0 xs:mt-10">
        <h1 className="text-3xl xs:text-2xl font-semibold text-black mb-4">
          Giriş Yap
        </h1>
        <LoginFormAlert
          formAlert={formAlert}
          onFormAlertClose={onFormAlertClose}
        />
        <LoginFormComponent {...login} />
        <Footer redirect={form.redirect} />
      </div>
    </div>
  );
};

export default observer(Login);

type LoginFormAlertProps = {
  formAlert: ReturnType<typeof useLogin>["formAlert"];
  onFormAlertClose: ReturnType<typeof useLogin>["onFormAlertClose"];
};

const LoginFormAlert = observer(
  ({ formAlert, onFormAlertClose }: LoginFormAlertProps) => {
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

type LoginFormProps = ReturnType<typeof useLogin>;

const LoginFormComponent = observer(
  ({ status, isPending, form, setFormAlert, onFormSubmit }: LoginFormProps) => {
    const { t } = useTranslation();
    const { onSocialLogin } = useSocialLogin({
      onStatusSuccess: () => {
        setFormAlert({
          status: "success",
          title: "Başarılı!",
          text: "Başarıyla giriş yaptınız.",
        });
      },
      onStatusFail: (error?: string | null) => {
        setFormAlert({
          status: "error",
          title: "Hata!",
          text: error || "Bir hata oluştu.",
        });
      },
    });

    return (
      <Form onSubmit={onFormSubmit}>
        <FormItem
          label={"E-mail"}
          help={form.emailErrorMessage}
          status={status.email}
        >
          <Input
            status={status.email}
            value={form.email}
            onChange={(event) => form.onEmailChange(event.target.value)}
          />
        </FormItem>
        <FormItem
          label={"Parola"}
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
        <GoogleCaptcha i18nFileName="login" />
        <Button block type="submit" loading={isPending} disabled={isPending}>
          Giriş Yap
        </Button>
        <Link passHref href={`/account/forgot-password`}>
          <a>Parolamı unuttum</a>
        </Link>
        {/* <S.SocialLoginWrapper>
          <SocialLoginButton
            color="#fff"
            bgColor="#3a5a98"
            borderColor="#3a5a98"
            lineColor="#000"
            text="Facebook"
            subText={t(`${NS}:form.loginWith`)}
            icon={<FacebookSVG />}
            onClick={() => onSocialLogin("facebook")}
          />
          <SocialLoginButton
            color="#000"
            bgColor="#fff"
            borderColor="#ddd"
            lineColor="#ddd"
            text="Google"
            subText={t(`${NS}:form.loginWith`)}
            icon={<GoogleSVG />}
            onClick={() => onSocialLogin("google")}
          />
        </S.SocialLoginWrapper> */}
      </Form>
    );
  }
);

type FooterProps = {
  redirect?: string | null;
};

const Footer = ({ redirect }: FooterProps) => {
  const { t } = useTranslation();

  const redirectHref = redirect ? "?redirect=" + redirect : "";
  return (
    <footer className="mt-20">
      <h1 className="text-3xl xs:text-2xl font-semibold text-black mb-4">
        Kayıt Ol
      </h1>
      <p>Hesabınız yok mu?</p>
      <Link passHref href={`/account/register${redirectHref}`}>
        <a>Hesap oluşturun</a>
      </Link>
    </footer>
  );
};
