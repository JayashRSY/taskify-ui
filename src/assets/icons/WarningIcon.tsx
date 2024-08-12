const WarningIcon = () => {
  return (
    <>
      <svg
        width="46"
        height="46"
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="46" height="46" rx="23" fill="#F42D20" />
        <rect
          x="12"
          y="12"
          width="22"
          height="22"
          fill="url(#pattern0_1_1543)"
        />
        <defs>
          <pattern
            id="pattern0_1_1543"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_1_1543" transform="scale(0.01)" />
          </pattern>
          <image
            id="image0_1_1543"
            width="100"
            height="100"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    </>
  );
};
export default WarningIcon;
