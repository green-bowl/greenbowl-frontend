import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  quantity: number;
  onChange: (quantity: number) => void;
}

const Quantity = ({ quantity, onChange }: Props) => {
  const [inputValue, setInputValue] = useState(String(quantity));

  useEffect(() => {
    setInputValue(String(quantity));
  }, [quantity]);

  const handleClickPlusBtn = () => {
    onChange(quantity + 1);
  };

  const handleClickMinusBtn = () => {
    if (quantity <= 1) return;
    onChange(quantity - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    const parsed = Number(inputValue);
    if (!isNaN(parsed) && parsed >= 1) {
      onChange(parsed);
    } else {
      setInputValue(String(quantity));
    }
  };

  return (
    <div className="h-10 flex items-center">
      <p className="w-1/2">수량</p>
      <div className="flex w-1/2 justify-center border border-border-default rounded-[8px] h-full items-center">
        <Button
          onClick={handleClickMinusBtn}
          variant="ghost"
          className="w-3/12 flex items-center justify-center"
        >
          -
        </Button>
        <input
          type="number"
          min={1}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="label-m grow text-center outline-none"
        />
        <Button
          onClick={handleClickPlusBtn}
          variant="ghost"
          className="w-3/12 flex items-center justify-center"
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default Quantity;
