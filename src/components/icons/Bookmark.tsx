import BaseIcon from "./BaseIcon";

import { FillIconProps } from "./types/icon";

const BookmarkIcon = ({ fill, ...props }: FillIconProps) => {
  return (
    <BaseIcon {...props}>
      <path
        d="M5 6.61309C5 4.43846 5 3.35114 5.7008 2.67557C6.4016 2 7.52952 2 9.78536 2H14.2146C16.4705 2 17.5984 2 18.2992 2.67557C19 3.35114 19 4.43846 19 6.61309V16.6051C19 19.1343 19 20.3988 18.1517 20.8559C17.3034 21.313 16.1861 20.6504 13.9513 19.3253L13.3018 18.9401C12.6683 18.5645 12.3515 18.3766 12 18.3766C11.6485 18.3766 11.3317 18.5645 10.6982 18.9401L10.0487 19.3253C7.81394 20.6504 6.69659 21.313 5.84829 20.8559C5 20.3988 5 19.1343 5 16.6051V6.61309Z"
        className={`fill-${fill}`}
      />
    </BaseIcon>
  );
};

export default BookmarkIcon;
