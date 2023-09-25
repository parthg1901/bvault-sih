import React from "react";

const QrOverlay = (props) => {
    return (
        <svg className={props.className} width="294" height="294" viewBox="0 0 294 294" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_100_258)">
                <rect x="4" y="4" width="286" height="286" rx="22" fill="#0065C1" fillOpacity="0.09" />
                <rect x="6.5" y="6.5" width="281" height="281" rx="19.5" stroke="#0065C1" strokeOpacity="0.25" strokeWidth="5" />
            </g>
            <defs>
                <filter id="filter0_f_100_258" x="0" y="0" width="294" height="294" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_100_258" />
                </filter>
            </defs>
        </svg>
    );
}

export default QrOverlay;