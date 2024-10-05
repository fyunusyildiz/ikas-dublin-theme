import { observer } from "mobx-react-lite";

import Button from "src/components/components/button";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import GoogleCaptcha from "src/components/components/google-captcha";
import Input from "src/components/components/input";
import Modal from "src/components/components/modal";
import useEmailSubscription from "./useEmailSubscription";

import { FooterProps } from "src/components/__generated__/types";

const EmailSubscription = ({
  newsletterTitle,
  newsletterText,
}: FooterProps) => {
  const {
    pending,
    responseStatus,
    onSubmit,
    isModalVisible,
    onModalClose,
    email,
    setEmail,
  } = useEmailSubscription();

  return (
    <div className="w-full">
      <h6 className="text-base font-semibold text-[#222]">{newsletterTitle}</h6>
      <p className="text-xs font-normal text-[#222] mb-5">{newsletterText}</p>
      <Form onSubmit={onSubmit}>
        <FormItem className="!mb-0">
          <Input
            required
            type="email"
            value={email}
            placeholder={"E-Posta"}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormItem>
        <Button block type="submit" size="middle" disabled={!email || pending}>
          {pending ? "Loading..." : "Subscribe"}
        </Button>
      </Form>
      <Modal visible={isModalVisible} onClose={onModalClose}>
        {responseStatus && (
          <p
            className={`${
              responseStatus === "success"
                ? "text-google-green"
                : "text-orange-two"
            }`}
          >
            {responseStatus === "success"
              ? "Aboneliğiniz oluşturuldu."
              : "Bir hata oluştu."}
          </p>
        )}
      </Modal>
    </div>
  );
};

export default observer(EmailSubscription);
