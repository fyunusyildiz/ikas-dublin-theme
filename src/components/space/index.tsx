import { useCallback } from "react";
import { SpaceProps } from "src/components/__generated__/types";

const Space = ({ marginDesktop, marginMobile }: SpaceProps) => {
  const getMargin = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 768) {
        return `${marginDesktop.value}px 0 0 0`;
      } else {
        return `${marginMobile.value}px 0 0 0`;
      }
    }
  }, [marginDesktop, marginMobile]);

  return <div style={{ margin: getMargin() }} />;
};

export default Space;
