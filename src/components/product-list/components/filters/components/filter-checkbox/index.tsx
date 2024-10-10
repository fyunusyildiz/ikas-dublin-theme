import React from "react";

import Checkbox from "src/components/components/checkbox";
import * as S from "./style";

type FilterCheckboxProps = {
  checked: boolean;
  label: string;
  resultCount: number;
  onChange: () => void;
};

export const FilterCheckbox = ({
  checked,
  label,
  resultCount,
  onChange,
}: FilterCheckboxProps) => {
  return (
    <Checkbox checked={checked} onChange={onChange}>
      <div className={`${checked ? "font-normal" : "font-light"} text-2xs`}>
        {label} ({resultCount})
      </div>
    </Checkbox>
  );
};
