import { observer } from "mobx-react-lite";
import { TitleProps } from "../__generated__/types";
import { useCallback } from "react";

const Title: React.FC<TitleProps> = (props) => {
  const {
    title,
    marginBottomDesktop,
    marginTopDesktop,
    marginBottomMobile,
    marginTopMobile,
  } = props;

  const getMargin = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 768) {
        return `${marginTopDesktop.value}px 0 ${marginBottomDesktop.value}px 0`;
      } else {
        return `${marginTopMobile.value}px 0 ${marginBottomMobile.value}px 0`;
      }
    }
  }, [
    marginTopDesktop,
    marginBottomDesktop,
    marginTopMobile,
    marginBottomMobile,
  ]);
  return (
    <h1
      className={`text-3xl font-semibold sm:text-2xl w-full text-center`}
      style={{ margin: getMargin() }}
    >
      {title}
    </h1>
  );
};

export default observer(Title);
