import * as React from "react"
const SvgComponent = (props) => (
  <svg width={43} height={43} fill="none" {...props}>
    <g filter="url(#a)">
      <path fill="url(#b)" d="M0 0h35v35H0z" shapeRendering="crispEdges" />
    </g>
    <defs>
      <pattern
        id="b"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use href="#c" transform="scale(.02083)" />
      </pattern>
      <filter
        id="a"
        width={43}
        height={43}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={4} dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_100_214" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_100_214"
          result="shape"
        />
      </filter>
      <image
        id="c"
        width={48}
        height={48}
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAx9JREFUaEPtmTuLFEEUhe/txunq9jmKmbKBAyIGamSoKGgq+ELxH/gAEdTIwEgDUVTwF6yBu2BqoGgmRm4kChr4yHytC07XzDJ1pJYZaWa7e6q6q2d6YScbpqb7fLeq7r2nimmFf3iF66dVgEnPYCUzEMfxFBHdZuYDRLSWiF4Q0XUhxAfXwM4B2u32dt/33wLYkhQL4DeAPVEUfXUJ4RwgjuPHzHwmTSSAmTAMT9UWAMCGTqfzkYi2ZohcEEJsrB2AFt7tdi8ppS4z8+YcgX+EEJtqA2AhfEkzgCdhGJ6eOICtcC2YmX/2er29URR9mxiAiXAAv4joARHt8jzvMIA1AJ4BuOJa/FJg0qKhU6HneXeJ6AiAxX4ef0dEF7PWuBau/9NoNO4z80KZKNvUkWUAWjwzz43YjP/1uRSuH2pbR5YBSClniej4qAi6Fj54n20dSQPQ078+C6Aq4f0sZV1HagFgkhz6AV1WR9IAnhLRsXEsIQvhmXUkDWAngNfM3BwF0Z926+xjKzyvjmSmUWa+w8xHmXlRKfWciHQrfKFMGjURbltHrLpRGwHMvBvAIc/zoJTSfuB92QCkrQgrgMEDAKzrdrvnlVJXTetFznJcAPBISnmr2WzOmyzb5JhCAI5ASgkfaCgFUBDEiXCnAAkQXYg+E1FWzz8fBMFU2V7J2RJKW69SyhkiOpH2W238QN5Gk1K2ALwZ3tzaDwDYL4T4ZLtR88Y72QPDL5BS7iAi7Y2Tn5Zr8UsFLo0u6QeI6C+AVwCuRVH0xTR6UkokxwohjINViR+wtYRFASr1AwCmwzA8ZzILRQGq9gPfgyBomaTBIgBFzpUq8wM2ACY91tj9gAmAhfDx+4E8AFvhE/EDaQAmwuviBx4y841ktgJwc9UPpORv4+qY0ZwVNjaDpSKlvFfEyDhtp20cmivhTgGG/EDuBUcQBProstTZaaV+II7jaWY+m9FuzAohTpq0IqZjSu2BjE52m+/7c8OXfET0Qym1z/URu3MADdU/4dbXrAf1dwAv++2408uNTD9gOn11GFfJDIwTbBVgnNFOe9c/UYn6T+7cPMMAAAAASUVORK5CYII="
      />
    </defs>
  </svg>
)
export default SvgComponent