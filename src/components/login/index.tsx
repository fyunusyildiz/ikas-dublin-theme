import { Link } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import Alert from "src/components/components/alert";
import Button from "src/components/components/button";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import GoogleCaptcha from "src/components/components/google-captcha";
import Input from "src/components/components/input";
import SocialLoginButton from "src/components/components/button/social-login";

import useLogin from "./useLogin";
import useSocialLogin from "src/utils/hooks/useSocialLogin";
import FacebookSVG from "src/components/svg/social-login/facebook";
import GoogleSVG from "src/components/svg/social-login/google";

export const NS = "login";

const Login = () => {
  const login = useLogin();
  const { formAlert, onFormAlertClose, form } = login;

  return (
    <div className="w-full flex flex-col items-center my-20">
      <div className="w-full max-w-[500px] px-5">
        <h1 className="text-lg xs:text-base font-normal text-black mb-4 w-full text-center">
          Oturum Aç
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
  ({ status, isPending, setFormAlert, form, onFormSubmit }: LoginFormProps) => {
    const { onSocialLogin } = useSocialLogin({
      onStatusSuccess: () => {
        setFormAlert({
          status: "success",
          title: "Başarılı",
          text: "Başarıyla giriş yaptınız.",
        });
      },
      onStatusFail: (error?: string | null) => {
        setFormAlert({
          status: "error",
          title: "Hata",
          text: error || "Bir hata oluştu.",
        });
      },
    });

    return (
      <Form onSubmit={onFormSubmit}>
        <FormItem help={form.emailErrorMessage} status={status.email}>
          <Input
            status={status.email}
            value={form.email}
            placeholder="E-POSTA"
            onChange={(event) => form.onEmailChange(event.target.value)}
          />
        </FormItem>
        <FormItem help={form.passwordErrorMessage} status={status.password}>
          <Input
            placeholder="ŞİFRE"
            type="password"
            status={status.password}
            value={form.password}
            onChange={(event) => form.onPasswordChange(event.target.value)}
          />
        </FormItem>
        <Link passHref href={`/account/forgot-password`}>
          <a className="w-full text-left block underline text-2xs text-[#616161]">
            Şifremi unuttum
          </a>
        </Link>
        <GoogleCaptcha i18nFileName="login" />
        <Button
          size="large"
          block
          type="submit"
          loading={isPending}
          disabled={isPending}
        >
          GİRİŞ YAP
        </Button>
        <div className="w-full gap-2 xs:gap-4 grid grid-cols-2 mt-7">
          <SocialLoginButton
            color="#494949"
            bgColor="#F4F4F4"
            borderColor="#222"
            subText="İLE GİRİŞ YAP"
            icon={<FacebookSVG />}
            onClick={() => onSocialLogin("facebook")}
          />
          <SocialLoginButton
            color="#494949"
            bgColor="#F4F4F4"
            borderColor="#222"
            subText="İLE GİRİŞ YAP"
            icon={<GoogleSVG />}
            onClick={() => onSocialLogin("google")}
          />
        </div>
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
      <Link passHref href={`/account/register${redirectHref}`}>
        <a className="block w-full text-center py-3 mt-2 text-[#222] text-xs">
          HESAP OLUŞTUR
        </a>
      </Link>
    </footer>
  );
};
