import { CategoryIngredient } from "@/app/type/ingredients";

import Ingredient from "./Ingredient";

interface Props {
  initialIngredients: CategoryIngredient[];
}

const IngredientsList = ({ initialIngredients }: Props) => {
  const sortIngredients = initialIngredients.toSorted((a, b) => b.id - a.id);
  return (
    <>
      {sortIngredients.map((item) => {
        return <Ingredient key={item.id} ingredient={item} />;
      })}
    </>
  );
};

export default IngredientsList;
