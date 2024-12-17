import { RichTextProps } from "../__generated__/types";

export default function RichText({ richText }: RichTextProps) {
  return (
    <div
      className="px-5 w-full"
      dangerouslySetInnerHTML={{ __html: richText }}
    />
  );
}
