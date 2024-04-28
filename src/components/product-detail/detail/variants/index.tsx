import {
  IkasDisplayedVariantType,
  IkasDisplayedVariantValue,
  IkasProduct,
  useTranslation,
} from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "src/components/__generated__/types";
import Select, {
  SelectOnChangeParamType,
} from "src/components/components/select";
import { Swatch } from "src/components/components/swatch";
import { NS } from "src/components/product-detail";

export const Variants = observer(({ product }: ProductDetailProps) => {
  return (
    <div>
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
    <div className="mb-6">
      <div className="font-light text-xs leading-7 mb-1 text-blue-one">
        {dVT.variantType.name}
      </div>
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
      <SwatchVariantValue
        dVT={dVT}
        onVariantValueChange={onVariantValueChange}
      />
    );
  }
  return (
    <SelectVariantValue
      product={product}
      dVT={dVT}
      onVariantValueChange={onVariantValueChange}
    />
  );
});

type SelectVariantValueProps = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
  onVariantValueChange: (dVV: IkasDisplayedVariantValue) => void;
};

const SelectVariantValue = observer(
  ({ dVT, product, onVariantValueChange }: SelectVariantValueProps) => {
    const { t } = useTranslation();

    const selectOptions = dVT.displayedVariantValues.map((dVV) => ({
      value: dVV.variantValue.id,
      label: dVV.variantValue.name,
    }));

    const selectValue = product.selectedVariantValues.find(
      (sVV) => sVV.variantTypeId === dVT.variantType.id
    )?.id;

    const onChange = (value: SelectOnChangeParamType) => {
      const dVV = dVT.displayedVariantValues.find(
        (dVV) => dVV.variantValue.id === value
      );
      dVV && onVariantValueChange(dVV);
    };

    return (
      <Select
        placeholder={t(`${NS}:detail.variantType.selectPlaceholder`)}
        options={selectOptions}
        value={selectValue}
        onChange={onChange}
      />
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
