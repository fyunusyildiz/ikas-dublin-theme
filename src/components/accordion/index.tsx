import React, { useState, useCallback } from "react";
import { AccordionProps } from "src/components/__generated__/types";

const Accordion = (props: AccordionProps) => {
  const [active, setActive] = useState(props.defaultActive ? true : false);

  const handleButton = () => {
    setActive(!active);
  };

  const getWidth = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 1024) {
        if (props.width?.value !== 0) {
          return `${props.width?.value}px`;
        }
      } else {
        return "100%";
      }
    }
  }, [props.width]);

  return (
    <details
      className={`border-b border-solid mx-4 border-[#222] px-5 ${active ? "pb-4" : ""} ${
        props.isCentered ? "mx-auto" : ""
      }`}
      style={{ width: getWidth() }}
    >
      <summary
        aria-expanded={active}
        className="w-full flex items-center justify-between py-3 md:py-2 cursor-pointer text-sm xs:text-xs leading-8 text-[#222]"
        onClick={handleButton}
      >
        <div dangerouslySetInnerHTML={{ __html: props.header }} />
        <div className="w-3 h-3">{active ? <MinusSVG /> : <PlusSVG />}</div>
      </summary>
      <div dangerouslySetInnerHTML={{ __html: active ? props.children : "" }} />
    </details>
  );
};

export default Accordion;

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
