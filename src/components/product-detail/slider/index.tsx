import { Image } from "@ikas/storefront";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ProductDetailProps } from "src/components/__generated__/types";
import { point } from "src/styles/breakpoints";
import formatImageAspectRatio from "src/utils/formatImageAspectRatio";
import { useScreen } from "src/utils/hooks/useScreen";

import * as S from "./style";

type ActiveImageIdType = string | null;
type ActiveImage = ReturnType<typeof useActiveImage>;

function useActiveImage() {
  const [id, set] = useState<ActiveImageIdType>(null);
  return { id, set };
}

const SliderArea = (props: ProductDetailProps) => {
  const activeImage = useActiveImage();

  useEffect(() => {
    const mainImageId = props.product.selectedVariant.mainImage?.image?.id;
    mainImageId && activeImage.set(mainImageId);
  }, [props.product.selectedVariant]);

  return (
    <div className="flex col-span-4 overflow-x-hidden flex-col relative mb-auto">
      {/* <Thumbnails activeImage={activeImage} {...props} /> */}
      <MainImage activeImage={activeImage} {...props} />
    </div>
  );
};

export default observer(SliderArea);

type ThumbnailsProps = {
  activeImage: ActiveImage;
} & ProductDetailProps;

const Thumbnails = observer((props: ThumbnailsProps) => {
  const { activeImage, product } = props;
  const { width, height } = formatImageAspectRatio(props.imageAspectRatio);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.id;
    id && activeImage.set(id);
  };

  return (
    <div className="order-1 lg:flex flex-nowrap lg:overflow-auto lg:w-full gap-[10px] absolute block w-[100px] h-full overflow-y-auto overflow-x-hidden">
      {product.selectedVariant.images?.map((image, index) => (
        <S.Thumbnail
          key={index}
          data-id={image.image?.id}
          $selected={activeImage.id === image.image?.id}
          onClick={onClick}
        >
          <Image
            useBlur
            image={image.image!}
            layout="responsive"
            width={width}
            height={height}
            objectFit="contain"
            sizes="100px"
          />
        </S.Thumbnail>
      ))}
    </div>
  );
});

type MainImageProps = {
  activeImage: ActiveImage;
} & ProductDetailProps;

const MainImage = observer((props: MainImageProps) => {
  const { product, activeImage } = props;
  const { width, height } = formatImageAspectRatio(props.imageAspectRatio);
  const { isMobile } = useScreen();

  const image = product.selectedVariant.images?.find(
    (image) => image.imageId === activeImage.id
  )?.image;

  if (!image) return null;

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
  };
  return (
    <>
      {!isMobile ? (
        <div className="flex flex-wrap h-full border-r border-solid border-[#222]">
          {product.selectedVariant.images?.map((image, index) =>
            !image.isVideo ? (
              <figure
                key={index}
                className="w-full xl:h-[700px] h-[1000px] relative border-b border-solid border-[#222]"
              >
                <Image
                  useBlur
                  image={image.image!}
                  layout="fill"
                  width={width}
                  height={height}
                  objectFit="cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 75vw"
                />
              </figure>
            ) : (
              <video
                key={index}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
              >
                <source src={image.image?.src} type="video/mp4" />
              </video>
            )
          )}
        </div>
      ) : product.selectedVariant.images?.length === 1 ? (
        <div className="w-full h-[80vh] block border-b border-solid border-[#222] relative">
          <Image
            useBlur
            image={image}
            layout="fill"
            width={width}
            height={height}
            objectFit="cover"
            sizes="100%"
          />
        </div>
      ) : (
        <Slider {...settings} className="w-full !hidden sm:!block">
          {product.selectedVariant.images?.map((image, index) =>
            !image.isVideo ? (
              <figure key={index} className="w-full h-[65vh] relative">
                <Image
                  key={index}
                  useBlur
                  image={image.image!}
                  layout="fill"
                  width={width}
                  height={height}
                  objectFit="cover"
                  className="h-full"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 30vw"
                />
              </figure>
            ) : (
              <video
                key={index}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
              >
                <source src={image.image?.src} type="video/mp4" />
              </video>
            )
          )}
        </Slider>
      )}
    </>
  );
});

export function NextArrow(props: any) {
  const { onClick, className } = props;
  return (
    <div
      className={
        "!w-10 !h-10 !flex items-center justify-center opacity-90 before:hidden cart " +
        className
      }
      onClick={onClick}
    >
      <svg
        width="16"
        height="28"
        viewBox="0 0 16 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 26L14 14L2 2"
          stroke="#1E1E1E"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function PrevArrow(props: any) {
  const { onClick, className } = props;
  return (
    <div
      className={
        "!w-10 !h-10 !flex items-center justify-center opacity-90 before:hidden cart " +
        className
      }
      onClick={onClick}
    >
      <svg
        width="16"
        height="28"
        viewBox="0 0 16 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 26L2 14L14 2"
          stroke="#1E1E1E"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
