import Empty from "./Empty";
import Storage from "./Storage";

import { getFridgeIngredients } from "../actions/fridgeIngredient";

const MyIngredientContainer = async () => {
  const ingredients = await getFridgeIngredients();
  return (
    <>
      {ingredients.length === 0 ? (
        <Empty />
      ) : (
        <Storage ingredients={ingredients} />
      )}
    </>
  );
};

export default MyIngredientContainer;
