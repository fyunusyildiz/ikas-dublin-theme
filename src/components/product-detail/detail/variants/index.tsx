import {
  IkasDisplayedVariantType,
  IkasDisplayedVariantValue,
  IkasProduct,
} from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "src/components/__generated__/types";
import { SelectOnChangeParamType } from "src/components/components/select";
import { Swatch } from "src/components/components/swatch";

export const Variants = observer(({ product }: ProductDetailProps) => {
  return (
    <div className="w-full flex flex-col mt-3 sm:mt-0">
      {product.displayedVariantTypes.map((dVT) => (
        <VariantType key={dVT.variantType.id} product={product} dVT={dVT} />
      ))}
    </div>
  );
});

Variants.displayName = "Variants";

type VariantTypeProps = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
};

const VariantType = observer(({ dVT, product }: VariantTypeProps) => {
  return (
    <div className="mb-8 sm:mb-0 sm:py-3 sm:border-b sm:border-solid sm:border-[#828282] flex flex-col gap-3">
      {dVT.variantType.isColorSelection && (
        <div className="font-light text-xs leading-none text-[#222]">
          {dVT.variantType.name}: {product.selectedVariantValues[0]?.name}
        </div>
      )}
      <VariantValues dVT={dVT} product={product} />
    </div>
  );
});

type VariantValueType = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
};

const VariantValues = observer(({ dVT, product }: VariantValueType) => {
  const onVariantValueChange = (dVV: IkasDisplayedVariantValue) => {
    product.selectVariantValue(dVV.variantValue);
  };

  if (dVT.variantType.isColorSelection) {
    return (
      <div className="flex items-center gap-2">
        <SwatchVariantValue
          dVT={dVT}
          onVariantValueChange={onVariantValueChange}
        />
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <SelectVariantValue
        product={product}
        dVT={dVT}
        onVariantValueChange={onVariantValueChange}
      />
    </div>
  );
});

type SelectVariantValueProps = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
  onVariantValueChange: (dVV: IkasDisplayedVariantValue) => void;
};

const SelectVariantValue = observer(
  ({ dVT, product, onVariantValueChange }: SelectVariantValueProps) => {
    const selectOptions = dVT.displayedVariantValues.map((dVV) => ({
      value: dVV.variantValue.id,
      label: dVV.variantValue.name,
    }));

    const selectValue = product.selectedVariantValues.find(
      (sVV) => sVV.variantTypeId === dVT.variantType.id
    )?.name;

    const onChange = (value: SelectOnChangeParamType) => {
      const dVV = dVT.displayedVariantValues.find(
        (dVV) => dVV.variantValue.id === value
      );
      dVV && onVariantValueChange(dVV);
    };

    return (
      <div className="w-full flex items-center gap-2 flex-wrap">
        {selectOptions.map((option) => (
          <button
            onClick={() => onChange(option.value)}
            className={`px-10 md:px-6 py-3 md:py-2 xs:px-4 bg-[#D9D9D9] text-xs border border-solid text-[#222] ${
              selectValue === option.label
                ? "border-[#222]"
                : "border-transparent"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }
);

type SwatchVariantValueProps = {
  dVT: IkasDisplayedVariantType;
  onVariantValueChange: (dVV: IkasDisplayedVariantValue) => void;
};

const SwatchVariantValue = observer(
  ({ dVT, onVariantValueChange }: SwatchVariantValueProps) => {
    return (
      <>
        {dVT.displayedVariantValues.map((dVV) => (
          <Swatch
            key={dVV.variantValue.id}
            title={dVV.variantValue.name}
            selected={dVV.isSelected}
            image={dVV.variantValue.thumbnailImage}
            colorCode={dVV.variantValue.colorCode}
            onClick={() => onVariantValueChange(dVV)}
          />
        ))}
      </>
    );
  }
);
