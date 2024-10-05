import { Link } from "@ikas/storefront";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <p className="text-[36px] xs:text-lg text-[#222] text-center mb-5">
        Sepetiniz şu anda boş!
      </p>
      <Link href="/" passHref>
        <a className="underline">Alışverişe Başla</a>
      </Link>
    </div>
  );
};

export default EmptyCart;
