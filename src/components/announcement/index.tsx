import { Link } from "@ikas/storefront";
import { observer } from "mobx-react-lite";
import { AnnouncementProps, TextPosition } from "../__generated__/types";
import * as React from "react";

const Announcement: React.FC<AnnouncementProps> = (props) => {
  const { text } = props;

  const getTextPosition = React.useCallback(() => {
    switch (props.textAlign) {
      case TextPosition.LEFT:
        return "text-left";
      case TextPosition.CENTER:
        return "text-center";
      case TextPosition.RIGHT:
        return "text-right";
      default:
        return "text-center";
    }
  }, [props.textAlign]);
  const getStyle = React.useMemo(() => {
    return {
      color: props.textColor ?? "white",
      backgroundColor: props.backgroundColor ?? "black",
    };
  }, [props.textColor, props.backgroundColor]);

  return (
    <Link href={props.link} passHref>
      <a
        className={`w-full block text-base px-3 py-2 sm:text-xs ${getTextPosition()}`}
        style={getStyle}
      >
        {text}
      </a>
    </Link>
  );
};

export default observer(Announcement);
