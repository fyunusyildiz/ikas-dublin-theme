import React, { useState } from "react";

type CollapseProps = {
  className?: string;
  defaultActive?: boolean;
  header: string;
  children: React.ReactNode;
};

const Collapse = (props: CollapseProps) => {
  const [active, setActive] = useState(!!props.defaultActive);

  const handleButton = () => {
    setActive(!active);
  };

  return (
    <details
      className={`${props.className} border-b border-solid border-[#222] ${
        active ? "pb-4" : ""
      }`}
    >
      <summary
        aria-expanded={active}
        className="w-full flex items-center justify-between py-3 md:py-2 cursor-pointer text-sm xs:text-xs leading-8 text-[#222]"
        onClick={handleButton}
      >
        {props.header}
        <div className="w-3 h-3">{active ? <MinusSVG /> : <PlusSVG />}</div>
      </summary>
      <div>{active && props.children}</div>
    </details>
  );
};

export default Collapse;

const MinusSVG = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full"
  >
    <path d="M0 4H8" stroke="#22252A" />
  </svg>
);

const PlusSVG = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full"
  >
    <path d="M0 4H8" stroke="#22252A" />
    <path d="M4 8L4 2.38419e-07" stroke="#22252A" />
  </svg>
);
