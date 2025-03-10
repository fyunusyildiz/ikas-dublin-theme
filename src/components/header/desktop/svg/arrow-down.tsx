const svg = ({ fill }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    className="mt-[1px]"
  >
    <path
      fill={fill}
      className="transition-colors duration-300 ease-in-out"
      d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"
    />
  </svg>
);

export default svg;
