//the children for this wrapper needs to be the path inside the w3 svg

export function W3SvgWrapper({ containerClass, children }) {
  return (
    <div className={`${containerClass}`}>
      <svg
        xmlns="https://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
      >
        {children}
      </svg>
    </div>
  );
}
