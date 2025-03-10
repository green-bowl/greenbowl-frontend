const route = {
  myFridge: {
    root: "/fridge",
    addIngredient: "/fridge/add-ingredient?categoryId=1",
    myIngredient: "/fridge/my-ingredient",
    tip: "/fridge/tip",
  },
  diet: {
    root: "/diet",
    test: "/diet/test",
  },
  recipe: {
    root: "/recipe",
    ai: "/recipe/ai",
  },
  save: "/save",
  login: {
    root: "/login",
  },
  myPage: {
    root: "/my-page",
    deleteAccount: "/my-page/delete-account",
  },
  config: {
    root: "/config",
  },
  terms: {
    root: "/terms",
  },
  privacy: {
    root: "/privacy",
  },
  onboarding: {
    root: "/onboarding",
    login: "/onboarding/login",
  },
};

export default route;
