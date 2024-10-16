export type Props = {
  className?: string;
  fillRed?: boolean;
};

const svg = ({className,fillRed}: Props) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10.5 31.5C9.675 31.5 8.96875 31.2063 8.38125 30.6188C7.79375 30.0312 7.5 29.325 7.5 28.5V9H6V6H13.5V4.5H22.5V6H30V9H28.5V28.5C28.5 29.325 28.2063 30.0312 27.6188 30.6188C27.0312 31.2063 26.325 31.5 25.5 31.5H10.5ZM25.5 9H10.5V28.5H25.5V9ZM13.5 25.5H16.5V12H13.5V25.5ZM19.5 25.5H22.5V12H19.5V25.5Z"
      fill={fillRed ? "#FF0000" : "#000000"}
    />
  </svg>
);

export default svg;
