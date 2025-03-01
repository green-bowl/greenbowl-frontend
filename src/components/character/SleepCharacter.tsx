"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const SleepCharacter = ({ isPlay }: { isPlay: boolean }) => {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8, paused: true });
      tl.fromTo(
        ".z",
        { y: -5, scale: 1.5 },
        { y: -30, duration: 1.5, scale: 0, rotation: 40, stagger: 0.4 }
      );
      if (!isPlay) {
        tl.pause(0);
      }
      if (isPlay) {
        tl.play();
      }
    },
    { scope: ref, dependencies: [isPlay], revertOnUpdate: true }
  );
  return (
    <svg
      width="168"
      height="168"
      viewBox="0 0 168 168"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
    >
      <path
        className="z"
        d="M63.5804 41.8474C62.3926 42.3205 61.3457 42.7937 60.4498 43.2567L59.3828 40.6697C60.2586 40.2368 61.2954 39.7838 62.4832 39.3007C63.8724 38.747 65.1407 38.294 66.3084 37.9316L67.2748 40.3576C67.0735 40.8911 66.7815 41.485 66.3688 42.1494C65.9561 42.8138 65.5132 43.4782 65.0099 44.1325C65.5836 43.911 66.1876 43.6594 66.8117 43.3775C67.4359 43.0957 67.9593 42.844 68.3821 42.6225L69.4491 45.1995C68.5331 45.6626 67.4661 46.1357 66.248 46.6189C64.718 47.2228 63.3691 47.706 62.2014 48.0483L61.2451 45.6424C61.6477 44.7163 62.4228 43.4379 63.5905 41.8374L63.5804 41.8474Z"
        fill="#70B56D"
      />
      <path
        className="z"
        d="M63.5804 41.8474C62.3926 42.3205 61.3457 42.7937 60.4498 43.2567L59.3828 40.6697C60.2586 40.2368 61.2954 39.7838 62.4832 39.3007C63.8724 38.747 65.1407 38.294 66.3084 37.9316L67.2748 40.3576C67.0735 40.8911 66.7815 41.485 66.3688 42.1494C65.9561 42.8138 65.5132 43.4782 65.0099 44.1325C65.5836 43.911 66.1876 43.6594 66.8117 43.3775C67.4359 43.0957 67.9593 42.844 68.3821 42.6225L69.4491 45.1995C68.5331 45.6626 67.4661 46.1357 66.248 46.6189C64.718 47.2228 63.3691 47.706 62.2014 48.0483L61.2451 45.6424C61.6477 44.7163 62.4228 43.4379 63.5905 41.8374L63.5804 41.8474Z"
        fill="#70B56D"
      />

      <path
        className="z"
        d="M63.5804 41.8474C62.3926 42.3205 61.3457 42.7937 60.4498 43.2567L59.3828 40.6697C60.2586 40.2368 61.2954 39.7838 62.4832 39.3007C63.8724 38.747 65.1407 38.294 66.3084 37.9316L67.2748 40.3576C67.0735 40.8911 66.7815 41.485 66.3688 42.1494C65.9561 42.8138 65.5132 43.4782 65.0099 44.1325C65.5836 43.911 66.1876 43.6594 66.8117 43.3775C67.4359 43.0957 67.9593 42.844 68.3821 42.6225L69.4491 45.1995C68.5331 45.6626 67.4661 46.1357 66.248 46.6189C64.718 47.2228 63.3691 47.706 62.2014 48.0483L61.2451 45.6424C61.6477 44.7163 62.4228 43.4379 63.5905 41.8374L63.5804 41.8474Z"
        fill="#70B56D"
      />
      <path
        d="M106.185 153.86C91.1361 153.86 76.087 153.86 61.0278 153.86C47.8107 156.014 37.1404 146.34 38.892 133.335V55.7034C37.1404 42.6877 47.8107 33.024 61.0278 35.1782H106.185C119.402 33.024 130.072 42.6877 128.321 55.7034V133.335C130.072 146.35 119.402 156.014 106.185 153.86Z"
        fill="#D5E0CB"
      />
      <path
        d="M103.949 100.119C103.949 111.172 94.9898 115.913 83.947 115.913C72.9043 115.913 63.9453 111.172 63.9453 100.119C63.9453 89.0661 72.9043 80.1172 83.947 80.1172C94.9898 80.1172 103.949 89.0762 103.949 100.119Z"
        fill="#C0D68B"
      />
      <path
        d="M95.3196 86.7089H71.1706C64.9194 87.1719 55.759 85.8029 51.3802 80.9208C46.4981 76.3406 46.3974 68.2473 46.5786 62.1169C46.3974 55.9765 46.4981 47.8932 51.3802 43.3131C55.759 38.4309 64.9194 37.0619 71.1706 37.525C79.2236 37.525 87.2666 37.525 95.3196 37.525C101.571 37.0518 110.731 38.4309 115.11 43.3131C119.992 47.8932 120.103 55.9866 119.922 62.1169C120.103 68.2574 120.002 76.3406 115.12 80.9308C110.741 85.813 101.581 87.182 95.3297 86.719L95.3196 86.7089Z"
        fill="#E4F0D9"
      />
      <path
        d="M53.4202 82.8336C53.0478 82.743 52.6653 82.6624 52.2827 82.6121C50.5211 82.3705 48.5884 82.6725 47.2697 83.8805C45.5383 85.481 45.3571 88.1083 45.3169 90.4638C45.025 107.295 46.0316 124.126 47.0281 140.926C47.2295 144.379 46.555 148.134 49.9977 149.885C53.1988 151.516 57.0642 151.224 60.527 150.922C76.7439 149.472 93.0009 148.093 109.278 148.426C112.993 148.506 116.717 148.667 120.401 148.214C121.73 148.053 123.099 147.781 124.166 146.976C125.535 145.929 126.159 144.127 126.179 142.406C126.2 140.685 125.726 138.993 125.263 137.332C121.378 123.371 118.589 108.674 121.227 94.4199C121.77 91.4604 122.415 88.0076 120.391 85.783C118.136 83.3268 114.18 84.0616 110.959 84.8871C93.3633 89.4068 74.2675 90.8564 57.3461 84.2328C56.0475 83.7295 54.7591 83.1657 53.4102 82.8336H53.4202Z"
        fill="#E4F0D9"
      />
      <path
        d="M120.22 104.849C120.28 101.356 120.602 97.8726 121.236 94.4199C121.78 91.4604 122.434 88.0076 120.401 85.783C118.146 83.3268 114.19 84.0616 110.969 84.8871C93.3727 89.4068 74.277 90.8564 57.3555 84.2328C56.057 83.7295 54.7685 83.1657 53.4196 82.8336C53.0471 82.743 52.6646 82.6624 52.2821 82.6121C50.5205 82.3705 48.5878 82.6725 47.2691 83.8805C45.5377 85.481 45.3565 88.1083 45.3162 90.4638C45.2558 93.9769 45.2659 97.5002 45.3061 101.013C57.0032 105.291 69.4854 105.392 81.4542 105.986C93.5942 106.389 107.355 107.023 120.23 104.849H120.22Z"
        fill="#FFFFEA"
      />
      <path
        d="M112.854 64.876C112.431 73.3317 108.777 79.593 103.019 83.5188C97.9152 87.0018 91.3319 88.5318 84.3157 88.3809C83.5406 88.3708 82.7654 88.3305 81.9803 88.2701C77.7021 87.9681 73.5951 87.0823 69.9108 85.6026C66.8003 84.3543 63.9717 82.6733 61.5558 80.5392C56.2307 75.8181 53.2108 69.0838 53.6235 60.618C53.8551 55.9372 55.0932 51.5583 57.1266 47.713C59.4318 43.3342 62.1698 39.1164 65.24 35.2207C69.9913 29.181 76.9471 25.4162 84.668 25.9698C91.6137 26.4631 97.5931 30.3486 101.73 35.9757C104.942 40.3445 107.7 45.0857 109.944 49.9578C112.038 54.4876 113.105 59.5711 112.844 64.8861L112.854 64.876Z"
        fill="#C0D68B"
      />
      <path
        d="M106.969 62.9546C107.644 75.0844 97.7786 83.4093 85.0548 84.0938C72.341 84.7783 61.6003 77.5608 60.9158 65.4409C60.2413 53.311 69.9956 42.9327 82.7194 42.2582C95.4432 41.5737 106.285 50.8448 106.969 62.9646V62.9546Z"
        fill="#F3F3DF"
      />
      <path
        d="M71.4766 63.0352C71.4766 63.0352 75.7246 63.2566 77.2446 61.2031"
        stroke="#44443F"
        strokeWidth="2.01326"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M94.1586 63.0352C94.1586 63.0352 89.9106 63.2566 88.3906 61.2031"
        stroke="#44443F"
        strokeWidth="2.01326"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M83.2364 72.9981C84.6096 72.9981 85.7228 71.885 85.7228 70.5118C85.7228 69.1386 84.6096 68.0254 83.2364 68.0254C81.8632 68.0254 80.75 69.1386 80.75 70.5118C80.75 71.885 81.8632 72.9981 83.2364 72.9981Z"
        fill="#44443F"
      />
      <path
        d="M74.362 87.5542C74.362 90.0003 71.9964 91.2586 69.0872 91.2586C66.1781 91.2586 63.8125 90.0003 63.8125 87.5542C63.8125 85.1081 66.1781 83.125 69.0872 83.125C71.9964 83.125 74.362 85.1081 74.362 87.5542Z"
        fill="#C0D68B"
      />
      <path
        d="M104.706 87.5542C104.706 90.0003 102.34 91.2586 99.431 91.2586C96.5219 91.2586 94.1562 90.0003 94.1562 87.5542C94.1562 85.1081 96.5219 83.125 99.431 83.125C102.34 83.125 104.706 85.1081 104.706 87.5542Z"
        fill="#C0D68B"
      />
    </svg>
  );
};

export default SleepCharacter;
