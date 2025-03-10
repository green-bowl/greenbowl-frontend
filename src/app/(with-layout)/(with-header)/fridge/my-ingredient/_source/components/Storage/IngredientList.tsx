import { categories } from "@/constants/categories";
import Card from "./Card";
import { useMemo } from "react";
import { categorized } from "../../utils/categorized";
import { FridgeIngredient } from "@/app/type/ingredients";

interface Props {
  ingredients: FridgeIngredient[];
  selectedIngredients: Map<number, FridgeIngredient>;
  handleCardClick: (ingredient: FridgeIngredient) => void;
}

const IngredientList = ({
  ingredients,
  selectedIngredients,
  handleCardClick,
}: Props) => {
  const categorizedMap = useMemo(() => categorized(ingredients), [ingredients]);

  return (
    <div className="pb-28">
      {categories.map((category) => {
        const isEmpty = categorizedMap[category.id].ingredients.length <= 0;
        if (isEmpty) return;
        return (
          <div
            key={category.id}
            className="mb-5 bg-foundation-secondary rounded-[12px] p-3"
          >
            <div className="flex items-center label-m h-10 mb-5">
              <category.icon />
              <p className=" label-m">{`${category.name} (${
                categorizedMap[category.id].ingredients.length
              })`}</p>
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
              {categorizedMap[category.id].ingredients.map(
                (ingredient, idx) => (
                  <Card
                    key={idx}
                    ingredient={ingredient}
                    isSelected={selectedIngredients.has(+ingredient.id)}
                    onClick={handleCardClick}
                  />
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IngredientList;
