 export const getSVGIcon = (tempValue = "$2000", type) => {
    const svgStringBlue = `
     <svg width="50" height="35" viewBox="0 0 50 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2001_4093)">
<mask id="path-1-outside-1_2001_4093" maskUnits="userSpaceOnUse" x="2" y="1" width="46" height="31" fill="black">
<rect fill="white" x="2" y="1" width="46" height="31"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 3C7.13401 3 4 6.13401 4 10V16C4 19.866 7.13401 23 11 23H21.8688L24.8003 27.8858L27.7318 23H39C42.866 23 46 19.866 46 16V10C46 6.13401 42.866 3 39 3H11Z"/>
</mask>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 3C7.13401 3 4 6.13401 4 10V16C4 19.866 7.13401 23 11 23H21.8688L24.8003 27.8858L27.7318 23H39C42.866 23 46 19.866 46 16V10C46 6.13401 42.866 3 39 3H11Z" fill="#C1BB20"/>
<path d="M21.8688 23L23.5838 21.971L23.0012 21H21.8688V23ZM24.8003 27.8858L23.0854 28.9148L24.8003 31.7731L26.5153 28.9148L24.8003 27.8858ZM27.7318 23V21H26.5994L26.0168 21.971L27.7318 23ZM6 10C6 7.23858 8.23858 5 11 5V1C6.02944 1 2 5.02944 2 10H6ZM6 16V10H2V16H6ZM11 21C8.23858 21 6 18.7614 6 16H2C2 20.9706 6.02944 25 11 25V21ZM21.8688 21H11V25H21.8688V21ZM26.5153 26.8568L23.5838 21.971L20.1539 24.029L23.0854 28.9148L26.5153 26.8568ZM26.0168 21.971L23.0854 26.8568L26.5153 28.9148L29.4468 24.029L26.0168 21.971ZM39 21H27.7318V25H39V21ZM44 16C44 18.7614 41.7614 21 39 21V25C43.9706 25 48 20.9706 48 16H44ZM44 10V16H48V10H44ZM39 5C41.7614 5 44 7.23858 44 10H48C48 5.02944 43.9706 1 39 1V5ZM11 5H39V1H11V5Z" fill="white" mask="url(#path-1-outside-1_2001_4093)"/>
</g>
<defs>
<filter id="filter0_d_2001_4093" x="0" y="0" width="50" height="34.7729" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2001_4093"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2001_4093" result="shape"/>
</filter>
</defs>
 <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="11" font-weight="600"  font-family="sans-serif" fill="#fff">$${  tempValue || `------`}</text>
</svg>
`;

    const svgStringGreen = `
<svg width="50" height="35" viewBox="0 0 50 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_274_4505)">
<mask id="path-1-outside-1_274_4505" maskUnits="userSpaceOnUse" x="2" y="1" width="46" height="31" fill="black">
<rect fill="white" x="2" y="1" width="46" height="31"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 3C7.13401 3 4 6.13401 4 10V16C4 19.866 7.13401 23 11 23H21.8688L24.8003 27.8858L27.7318 23H39C42.866 23 46 19.866 46 16V10C46 6.13401 42.866 3 39 3H11Z"/>
</mask>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 3C7.13401 3 4 6.13401 4 10V16C4 19.866 7.13401 23 11 23H21.8688L24.8003 27.8858L27.7318 23H39C42.866 23 46 19.866 46 16V10C46 6.13401 42.866 3 39 3H11Z" fill="#15BA4D"/>
<path d="M21.8688 23L23.5838 21.971L23.0012 21H21.8688V23ZM24.8003 27.8858L23.0854 28.9148L24.8003 31.7731L26.5153 28.9148L24.8003 27.8858ZM27.7318 23V21H26.5994L26.0168 21.971L27.7318 23ZM6 10C6 7.23858 8.23858 5 11 5V1C6.02944 1 2 5.02944 2 10H6ZM6 16V10H2V16H6ZM11 21C8.23858 21 6 18.7614 6 16H2C2 20.9706 6.02944 25 11 25V21ZM21.8688 21H11V25H21.8688V21ZM26.5153 26.8568L23.5838 21.971L20.1539 24.029L23.0854 28.9148L26.5153 26.8568ZM26.0168 21.971L23.0854 26.8568L26.5153 28.9148L29.4468 24.029L26.0168 21.971ZM39 21H27.7318V25H39V21ZM44 16C44 18.7614 41.7614 21 39 21V25C43.9706 25 48 20.9706 48 16H44ZM44 10V16H48V10H44ZM39 5C41.7614 5 44 7.23858 44 10H48C48 5.02944 43.9706 1 39 1V5ZM11 5H39V1H11V5Z" fill="white" mask="url(#path-1-outside-1_274_4505)"/>
</g>
<defs>
<filter id="filter0_d_274_4505" x="0" y="0" width="50" height="34.7729" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_274_4505"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_274_4505" result="shape"/>
</filter>
</defs>
 <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="11" font-family="sans-serif" font-weight="600" fill="#fff">$${
   tempValue || `------`
 }</text>

</svg>

`;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      type === "occupied_cargo" ? svgStringBlue : svgStringGreen
    )}`;
  };