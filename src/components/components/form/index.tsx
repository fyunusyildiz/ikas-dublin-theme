import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Form = (props: Props) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(event);
  };

  return (
    <form className={props.className} onSubmit={onSubmit}>
      {props.children}
    </form>
  );
};

export default Form;
