import { Link, useTranslation } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import Alert from "src/components/components/alert";
import Button from "src/components/components/button";
import Checkbox from "src/components/components/checkbox";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import GoogleCaptcha from "src/components/components/google-captcha";
import Col from "src/components/components/grid/col";
import Row from "src/components/components/grid/row";
import Input from "src/components/components/input";

import useRegister from "./useRegister";

import { RegisterProps } from "../__generated__/types";

import useRegisterForm from "./useRegisterForm";

export const NS = "register";

const Register = (props: RegisterProps) => {
  const register = useRegister(props);
  const { formAlert, onFormAlertClose, form } = register;

  return (
    <div className="w-full flex flex-col items-center my-5">
      <div className="w-full max-w-[500px] px-5">
        <h1 className="text-xl xs:text-lg font-normal text-black mb-2">
          Kayıt Ol
        </h1>
        <RegisterFormAlert
          formAlert={formAlert}
          onFormAlertClose={onFormAlertClose}
        />
        <RegisterFormComponent {...props} {...register} />
        <Footer redirect={form.redirect} />
      </div>
    </div>
  );
};

export default observer(Register);

type RegisterFormAlertProps = {
  formAlert: ReturnType<typeof useRegister>["formAlert"];
  onFormAlertClose: ReturnType<typeof useRegister>["onFormAlertClose"];
};

const RegisterFormAlert = observer(
  ({ formAlert, onFormAlertClose }: RegisterFormAlertProps) => {
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

export type RegisterFormProps = RegisterProps & ReturnType<typeof useRegister>;

const RegisterFormComponent = observer((props: RegisterFormProps) => {
  const { t } = useTranslation();
  const { status, isPending, form, onFormSubmit } = props;
  const {
    marketingEmailFormItemHelp,
    marketingEmailFormItemStatus,
    onMarketingEmailCheckboxChange,
  } = useRegisterForm(props);

  return (
    <Form onSubmit={onFormSubmit}>
      <Row gutter={[24, 0]}>
        <Col span={12}>
          <FormItem
            label="Ad"
            help={form.firstNameErrorMessage}
            status={status.firstName}
          >
            <Input
              status={status.firstName}
              value={form.firstName}
              onChange={(event) => form.onFirstNameChange(event.target.value)}
            />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label="Soyad"
            help={form.lastNameErrorMessage}
            status={status.lastName}
          >
            <Input
              status={status.lastName}
              value={form.lastName}
              onChange={(event) => form.onLastNameChange(event.target.value)}
            />
          </FormItem>
        </Col>
      </Row>
      <FormItem
        label="E-mail"
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
      <GoogleCaptcha i18nFileName="register" />
      <FormItem>
        <Button
          size="large"
          block
          type="submit"
          loading={isPending}
          disabled={isPending}
        >
          Kayıt Ol
        </Button>
      </FormItem>
      {!!props.showMarketingEmailCheckbox && (
        <FormItem
          status={marketingEmailFormItemStatus}
          help={marketingEmailFormItemHelp}
        >
          <Checkbox
            status={marketingEmailFormItemStatus}
            checked={form.isMarketingAccepted}
            onChange={onMarketingEmailCheckboxChange}
          >
            {props.marketingEmailCheckboxText}
          </Checkbox>
        </FormItem>
      )}
    </Form>
  );
});

type FooterProps = {
  redirect?: string | null;
};

const Footer = ({ redirect }: FooterProps) => {
  const redirectHref = redirect ? "?redirect=" + redirect : "";
  return (
    <footer className="mt-10 py-7 border-t border-solid border-gray-three">
      <p className="font-normal text-base">Hesabın var mı?</p>
      <Link passHref href={`/account/login${redirectHref}`}>
        <a className="block w-full text-center py-3 mt-2 text-white text-sm bg-gray-four rounded-sm">
          Giriş Yap
        </a>
      </Link>
    </footer>
  );
};
