import { CSSProperties } from "react";

export const EYE = ({ style }: { style?: CSSProperties }) => {
  return (
    <svg
      className="h-full w-full"
      style={style}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_131_28)">
        <path
          d="M8.99497 3.375C4.75011 3.375 1.00992 6.31722 0.0176718 10.1726C-0.0194301 10.3171 0.00239893 10.4705 0.0783567 10.5989C0.154314 10.7273 0.278179 10.8203 0.422701 10.8574C0.567223 10.8945 0.720565 10.8727 0.848993 10.7967C0.97742 10.7208 1.07041 10.5969 1.10752 10.4524C1.96252 7.13028 5.27483 4.5 8.99497 4.5C12.7151 4.5 16.0379 7.13121 16.8927 10.4524C16.9298 10.5969 17.0228 10.7208 17.1512 10.7967C17.2796 10.8727 17.433 10.8945 17.5775 10.8574C17.722 10.8203 17.8459 10.7273 17.9218 10.5989C17.9978 10.4705 18.0196 10.3171 17.9825 10.1726C16.99 6.31629 13.2398 3.375 8.99497 3.375ZM9.00083 6.375C7.0058 6.375 5.3768 8.004 5.3768 9.99902C5.3768 11.994 7.0058 13.6238 9.00083 13.6238C10.9959 13.6238 12.6256 11.994 12.6256 9.99902C12.6256 8.004 10.9959 6.375 9.00083 6.375Z"
          fill="#998973"
        />
      </g>
      <defs>
        <clipPath id="clip0_131_28">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const CHEVRON_RIGHT = ({
  style,
  className,
}: {
  style?: CSSProperties;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-full h-full ${className || ""}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
};
export const CHEVRON_LEFT = ({
  style,
  className,
}: {
  style?: CSSProperties;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-full h-full rotate-180 ${className || ""}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
};
export const PLAY = ({ style }: { style?: CSSProperties }) => {
  return (
    <svg
      className="h-full w-full"
      style={style}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.27368 1.54176C3.41408 1.57576 2.625 2.27707 2.625 3.22193V14.7781C2.625 16.0379 4.02853 16.8645 5.13061 16.2539L15.5588 10.4758C16.6926 9.8476 16.6926 8.15241 15.5588 7.52418L5.13061 1.7461C4.85509 1.59346 4.56022 1.53042 4.27368 1.54176Z"
        fill="#998973"
      />
    </svg>
  );
};
