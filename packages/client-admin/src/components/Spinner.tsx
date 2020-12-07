export default function Spinner() {
  return (
    <div className="flex-1 align-middle justify-items-center">
      <svg style={{ width: 100, height: 80 }} className="m-auto">
        <path
          fill="none"
          stroke="#3f51b5"
          strokeWidth="8"
          strokeDasharray="42.76482137044271 42.76482137044271"
          d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
          strokeLinecap="round">
          <animate
            attributeName="stroke-dashoffset"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;1"
            values="0;256.58892822265625"
          />
        </path>
      </svg>
    </div>
  );
}
