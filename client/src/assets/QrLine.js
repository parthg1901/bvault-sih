import React from "react";

const QrLine = (props) => {
    return (
        <svg className={props.className} viewBox="0 0 302 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_100_259)">
                <path d="M10 20H151H292" stroke="#003F7A" strokeWidth="5" />
            </g>
            <defs>
                <filter id="filter0_d_100_259" x="0" y="0.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-7" />
                    <feGaussianBlur stdDeviation="5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.490196 0 0 0 0 0.945098 0 0 0 1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_100_259" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_100_259" result="shape" />
                </filter>
            </defs>
        </svg>
    );
}
/* Rectangle 7 */


export default QrLine;