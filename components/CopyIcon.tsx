import { useMemo, useRef, useState } from "react";

export default function CopyIcon({
  color,
  hover,
  onClick,
  message,
}: {
  color: string;
  hover: string;
  onClick: Function;
  message: string;
}) {
  // const { color, hover, onClick, message } = useMemo(() => {
  //   var {
  //     color,
  //     hover,
  //     onClick,
  //     message,
  //   }: { color: string; hover: string; onClick: Function; message: string } =
  //     props;

  //   if (!color) color = "var(--font-color)";
  //   if (!hover) hover = "black";
  //   if (!message) message = "Elemento copiado!";

  //   return { color, hover, onClick, message };
  // }, []);

  const floatRef = useRef<HTMLSpanElement>(null);

  const [stroke, setStroke] = useState(color),
    [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <>
      <svg
        stroke={stroke || "var(--font-color)"}
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="20px"
        width="20px"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setStroke(hover)}
        onMouseLeave={() => setStroke(color)}
        onClick={handleClick}
        style={{ cursor: "pointer", transition: "200ms" }}
      >
        <rect
          width="336"
          height="336"
          x="128"
          y="128"
          fill="none"
          strokeLinejoin="round"
          strokeWidth="32"
          rx="57"
          ry="57"
        ></rect>
        <path
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
          d="M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24"
        ></path>
      </svg>
      {copied ? <span ref={floatRef}>{message}</span> : null}
    </>
  );
}
