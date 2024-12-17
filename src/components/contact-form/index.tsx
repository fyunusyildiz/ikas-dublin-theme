import React from "react";
import Form from "../components/form";
import FormItem from "../components/form/form-item";
import Input from "../components/input";
import Textarea from "../components/textarea";
import Button from "../components/button";

export default function ContactForm() {
  return (
    <Form
      onSubmit={() => {}}
      className="w-full max-w-[760px] mx-auto grid px-5 grid-cols-2 gap-5"
    >
      <FormItem className="col-span-1 !mb-0">
        <Input placeholder="Ad" type="text" required />
      </FormItem>
      <FormItem className="col-span-1 !mb-0">
        <Input placeholder="Soyad" type="text" required />
      </FormItem>
      <FormItem className="col-span-2 !mb-0">
        <Input placeholder="E-posta" type="email" required />
      </FormItem>
      <FormItem className="col-span-2 !mb-0">
        <Textarea placeholder="Mesajınız" required />
      </FormItem>
      <FormItem className="col-span-2 !my-0">
        <Button type="submit" block size="large" className="!mt-0">
          Gönder
        </Button>
      </FormItem>
    </Form>
  );
}
