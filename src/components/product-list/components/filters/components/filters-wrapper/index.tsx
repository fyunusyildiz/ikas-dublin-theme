import { IkasProductFilterSettings } from "@ikas/storefront";
import React from "react";

type FiltersWrapperProps = {
  title: string;
  settings?: IkasProductFilterSettings | null | undefined;
  children: React.ReactNode;
};

export const FiltersWrapper = (props: FiltersWrapperProps) => {
  return (
    <div
      className={`flex col-span-1 h-full sm:col-span-4 flex-col h-fit gap-3 header-sm:gap-0 header-sm:mb-10 header-sm:last:mb-0 header-sm:last:border-b-0 border-b border-x border-solid border-[#222] header-sm:border-x-0`}
    >
      <p className="text-2xs px-6 header-sm:px-5 header-sm:py-2 py-3 border-b header-sm:border-y border-solid border-[#222] uppercase">
        {props.title}
      </p>
      <div className="w-full flex flex-1 overflow-y-auto flex-col px-6 py-3">
        {props.children}
      </div>
    </div>
  );
};
