import { observer } from "mobx-react-lite";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ProductSliderProps } from "../__generated__/types";
import Product from "../product-list/right/product";

const ProductSlider = (props: ProductSliderProps) => {
  var settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 4,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section className="w-full my-24 flex flex-col gap-6 xs:gap-3 sm:my-16 xs:mt-0">
      <h2 className="px-6 text-lg xs:text-base xs:px-5">{props.sliderTitle}</h2>
      <Slider {...settings}>
        {props.sliderProducts.data
          .filter((product) => product.selectedVariant.hasStock)
          .map((product) => (
            <Product
              key={product.selectedVariant.id}
              product={product}
              className="!w-full list-none"
            />
          ))}
      </Slider>
    </section>
  );
};

export default observer(ProductSlider);
