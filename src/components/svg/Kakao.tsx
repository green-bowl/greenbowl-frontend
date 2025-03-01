import { FillIconProps } from "@/components/icons/types/icon";

const KakaoLoginSvg = ({
  width = 33,
  height = 32,
  ...props
}: FillIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.4947 3C8.76662 3 2.5 7.97177 2.5 14.1072C2.5 18.074 5.1181 21.5489 9.06102 23.5218L7.64157 28.6258C7.64157 28.6258 7.61528 28.8638 7.76774 28.9537C7.9202 29.0436 8.10421 28.9749 8.10421 28.9749C8.54581 28.9114 13.2037 25.6163 14.0186 25.045C14.8229 25.1614 15.6588 25.2196 16.5053 25.2196C24.2334 25.2196 30.5 20.2478 30.5 14.1124C30.5 7.97706 24.2229 3 16.4947 3Z"
        fill="black"
      />
      <path
        d="M8.75593 17.9787C8.30906 17.9787 7.94632 17.6296 7.94632 17.2012V12.3722H6.68458C6.24823 12.3722 5.896 12.0179 5.896 11.5789C5.896 11.1399 6.25349 10.7855 6.68458 10.7855H10.822C11.2584 10.7855 11.6106 11.1399 11.6106 11.5789C11.6106 12.0179 11.2531 12.3722 10.822 12.3722H9.56028V17.2012C9.56028 17.6243 9.19228 17.9787 8.75067 17.9787H8.75593ZM15.8374 17.9681C15.501 17.9681 15.2433 17.8306 15.1645 17.6085L14.7649 16.5506H12.3046L11.905 17.6085C11.8261 17.8306 11.5685 17.9681 11.2321 17.9681C11.0533 17.9681 10.8798 17.9311 10.7169 17.8623C10.4961 17.7566 10.2805 17.4762 10.5276 16.7093L12.457 11.5947C12.5937 11.2033 13.009 10.8014 13.5347 10.7908C14.0605 10.7802 14.481 11.2033 14.6125 11.5947L16.5419 16.7093C16.789 17.4762 16.5734 17.7671 16.3526 17.8623C16.1949 17.9364 16.0162 17.9681 15.8374 17.9681ZM14.3391 15.112L13.5347 12.8059L12.7304 15.112H14.3391ZM17.8404 17.8623C17.4198 17.8623 17.0676 17.5291 17.0676 17.1219V11.5947C17.0676 11.1452 17.4356 10.7802 17.893 10.7802C18.3504 10.7802 18.7184 11.1505 18.7184 11.5947V16.3655H20.4322C20.8528 16.3655 21.205 16.6987 21.205 17.106C21.205 17.5133 20.8581 17.8465 20.4322 17.8465L17.8404 17.8623ZM21.5152 17.1536V11.6C21.5152 11.1505 21.8832 10.7855 22.3248 10.7855C22.7664 10.7855 23.1344 11.1557 23.1344 11.6V13.3454L25.3951 11.0711C25.6439 10.8208 26.1143 10.8427 26.3992 11.1293C26.6668 11.3985 26.7363 11.8535 26.457 12.1395L24.6065 13.9907L26.5937 16.6353C26.8607 16.9791 26.7959 17.5147 26.436 17.7671C26.0811 18.0316 25.5598 17.9434 25.3057 17.6085L23.4131 15.0856L23.1344 15.3659V17.1377C23.1344 18.1931 21.5152 18.2338 21.5152 17.1536Z"
        fill="#FFE812"
      />
    </svg>
  );
};

export default KakaoLoginSvg;
