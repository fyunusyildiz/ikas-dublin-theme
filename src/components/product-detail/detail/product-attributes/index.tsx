import {
  IkasProduct,
  IkasProductAttributeType,
  IkasProductAttributeValue,
  Image,
} from "@ikas/storefront";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

import { ProductDetailProps } from "src/components/__generated__/types";
import Checkbox from "src/components/components/checkbox";
import Collapse from "src/components/components/collapse";
import Loading from "src/components/svg/loading";
import breakpoints, { point } from "src/styles/breakpoints";

export const ProductAttributes = observer(({ product }: ProductDetailProps) => {
  if (!product.selectedVariant.attributes) return null;
  const filteredAttributes = product.attributes.filter(
    (attribute) => attribute.productAttribute?.name !== "Storybox"
  );

  return (
    <div className="w-full font-light mt-4">
      {filteredAttributes.map((attribute, index) => (
        <AttributeValue key={index} attribute={attribute} />
      ))}
    </div>
  );
});

type AttributeValueProps = { attribute: IkasProductAttributeValue };

const AttributeValue = (props: AttributeValueProps) => {
  switch (props.attribute.productAttribute?.type) {
    case IkasProductAttributeType.BOOLEAN:
      return <BooleanAttributeValue {...props} />;
    case IkasProductAttributeType.CHOICE:
      return <ChoiceAttributeValue {...props} />;
    case IkasProductAttributeType.DATETIME:
      return <DateTimeAttributeValue {...props} />;
    case IkasProductAttributeType.HTML:
      return <HTMLAttributeValue {...props} />;
    case IkasProductAttributeType.IMAGE:
      return <ImageAttributeValue {...props} />;
    case IkasProductAttributeType.MULTIPLE_CHOICE:
      return <MultipleChoiceAttributeValue {...props} />;
    case IkasProductAttributeType.NUMERIC:
      return <NumericAttributeValue {...props} />;
    case IkasProductAttributeType.PRODUCT:
      return <ProductAttributeValue {...props} />;
    case IkasProductAttributeType.TABLE:
      return <TableAttributeValue {...props} />;
    case IkasProductAttributeType.TEXT:
      return <TextAttributeValue {...props} />;
    default:
      return null;
  }
};

const AttributeValueWrapper = (props: {
  header?: string;
  children: React.ReactNode;
}) => {
  return <Collapse header={props.header || ""}>{props.children}</Collapse>;
};

const BooleanAttributeValue = ({ attribute }: AttributeValueProps) => {
  return (
    <AttributeValueWrapper header={attribute.productAttribute?.name}>
      <Checkbox checked={!!attribute.value} />
    </AttributeValueWrapper>
  );
};

const ChoiceAttributeValue = ({ attribute }: AttributeValueProps) => {
  return (
    <AttributeValueWrapper header={attribute.productAttribute?.name}>
      <div>{attribute.productAttributeOption?.name}</div>
    </AttributeValueWrapper>
  );
};

const DateTimeAttributeValue = ({ attribute }: AttributeValueProps) => {
  const dateText = attribute.value
    ? new Date(+attribute.value).toDateString()
    : null;
  return (
    <AttributeValueWrapper header={attribute.productAttribute?.name}>
      {dateText}
    </AttributeValueWrapper>
  );
};

const HTMLAttributeValue = ({ attribute }: AttributeValueProps) => {
  if (!attribute.value) return null;
  return (
    <AttributeValueWrapper header={attribute.productAttribute?.name}>
      <div
        className="wysiwyg"
        dangerouslySetInnerHTML={{ __html: attribute.value }}
      />
    </AttributeValueWrapper>
  );
};

const ImageAttributeValue = ({ attribute }: AttributeValueProps) => {
  return (
    <AttributeValueWrapper header={attribute.productAttribute?.name}>
      {attribute.images?.map((image, index) => (
        <Image
          key={index}
          image={image}
          width={1}
          height={1}
          layout="responsive"
          objectFit="contain"
          sizes={`(max-width: ${breakpoints.lg}) 100vw, ${point.xxl / 2}px`}
        />
      ))}
    </AttributeValueWrapper>
  );
};

const MultipleChoiceAttributeValue = ({ attribute }: AttributeValueProps) => {
  return (
    <AttributeValueWrapper header={attribute.productAttribute?.name}>
      {attribute.productAttributeOption?.name}
    </AttributeValueWrapper>
  );
};

const NumericAttributeValue = ({ attribute }: AttributeValueProps) => {
  return (
    <AttributeValueWrapper header={attribute.productAttribute?.name}>
      {attribute.value}
    </AttributeValueWrapper>
  );
};

const ProductAttributeValue = ({ attribute }: AttributeValueProps) => {
  const [pending, setPending] = useState(true);
  const [products, setProducts] = useState<IkasProduct[] | null>(null);
  useEffect(() => {
    const set = async () => {
      setPending(true);
      const _products = await attribute.products;
      setPending(false);
      _products && setProducts(_products);
    };
    set();
  }, [attribute.value]);

  return (
    <AttributeValueWrapper header={attribute.productAttribute?.name}>
      {pending && <Loading />}
      {!pending &&
        products?.map((product, index) => (
          <div key={index}>{product.name}</div>
        ))}
    </AttributeValueWrapper>
  );
};

const TableAttributeValue = ({ attribute }: AttributeValueProps) => {
  return (
    <AttributeValueWrapper header={attribute.productAttribute?.name}>
      <table>
        <thead>
          <tr>
            <td>{attribute.productAttribute?.name}</td>
            {attribute.productAttribute?.tableTemplate?.columns?.map(
              (value, index) => (
                <td key={index}>{value.name}</td>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {attribute.productAttribute?.tableTemplate?.rows?.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              {attribute.productAttribute?.tableTemplate?.columns?.map(
                (column) => {
                  const cellValue = attribute.tableValue?.find(
                    (tV) => tV.colId === column.id && row.id === tV.rowId
                  );
                  if (cellValue) {
                    return (
                      <td key={cellValue.colId + cellValue.rowId}>
                        {cellValue.value}
                      </td>
                    );
                  }
                }
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </AttributeValueWrapper>
  );
};

const TextAttributeValue = ({ attribute }: AttributeValueProps) => {
  return (
    <AttributeValueWrapper header={attribute.productAttribute?.name}>
      {attribute.value}
    </AttributeValueWrapper>
  );
};
