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
    titleDescription,
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
    <div style={{ margin: getMargin() }} className="w-full px-4">
      <h1
        className="xs:!text-xl sm:!text-2xl !text-3xl font-semibold"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {titleDescription && (
        <p
          className="my-4"
          dangerouslySetInnerHTML={{ __html: titleDescription }}
        />
      )}
    </div>
  );
};

export default observer(Title);
