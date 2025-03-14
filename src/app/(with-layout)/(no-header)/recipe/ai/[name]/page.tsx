/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {IoIosArrowBack} from "react-icons/io";
import {useAiRecipe} from "@/store/aiRecipeStore";
import {useEffect, useRef, useState} from "react";
import {
    AddBookmarkRequestPayload,
    AddDetailedBookmarkRequestPayload,
    AiDetailedMenusRequestPayload,
    DetailedMenuOptions,
    ModifyDetailedBookmarkRequestPayload,
    Nutrition,
    UsedIngredient,
} from "@/app/(with-layout)/(no-header)/recipe/ai/_source/config";
import {
    DELETE as deleteBookmark,
    GET as getBookmarkedData,
    PATCH as patchBookmark,
    POST as postBookmark,
} from "@/app/(with-layout)/(no-header)/recipe/ai/_source/actions/bookmark";
import {Bookmark} from "lucide-react";
import RecipeStreaming from "@/app/(with-layout)/(no-header)/recipe/ai/[name]/_source/components/RecipeStreaming";
import {GET} from "@/app/(with-layout)/(no-header)/recipe/ai/_source/actions/detailedMenu";
import {MenuApiResponse} from "@/app/api/test/recipe/ai/gpt/menus";
import {useAlertStore} from "@/store/alertStore";
import ClockSvg from "@/components/svg/Clock";
import FireSvg from "@/components/svg/Fire";
import {usePathname} from "next/navigation";

const Page = () => {
    const pathname = usePathname();
    const parts = pathname.split("/");
    const [id, setId] = useState(parts[parts.length - 1]);
    const {selectedRecipe, availableIngredients} = useAiRecipe();
    const storedSelectedRecipe: MenuApiResponse =
        selectedRecipe ||
        JSON.parse(localStorage.getItem("selectedRecipe") as string);
    const storedIngredients = JSON.parse(
        localStorage.getItem("availableIngredients") as string
    );
    const recipeName = storedSelectedRecipe?.name;
    const cookingTime = storedSelectedRecipe?.cookingTime;
    const calories = storedSelectedRecipe?.calories;
    const imageUrls = storedSelectedRecipe.imageUrls;
    const representativeImageUrl =
        imageUrls && imageUrls.length > 0 && imageUrls[0]?.startsWith("https://")
            ? storedSelectedRecipe.imageUrls[0]
            : process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL;

    useEffect(() => {
        const storedRecipe = localStorage.getItem("selectedRecipe");
        const storedName = JSON.parse(storedRecipe as string)?.name;

        if (!storedRecipe || (recipeName !== storedName && selectedRecipe)) {
            localStorage.setItem("selectedRecipe", JSON.stringify(selectedRecipe));
        }

        if (
            !storedIngredients ||
            storedIngredients === "[]" ||
            (recipeName !== storedName && availableIngredients)
        ) {
            localStorage.setItem(
                "availableIngredients",
                JSON.stringify(availableIngredients)
            );
        }
    }, []);

    const isBookmarkedRecipe = !Number.isNaN(Number(id));
    const [oneLineIntroduction, setOneLineIntroduction] = useState<string>();
    const [usedIngredients, setUsedIngredients] = useState<UsedIngredient[]>([]);
    const [nutrition, setNutrition] = useState<Nutrition>({
        calories: calories,
        carbohydrate: undefined,
        protein: undefined,
        fat: undefined,
        sodium: undefined,
        sugar: undefined,
    });

    const [recipeIntroduction, setRecipeIntroduction] = useState<string>("");

    const handleClickArrowBack = () => {
        window.history.back();
    };

    const bookmarkRef = useRef<SVGSVGElement | null>(null);

    const [isBookmarked, setIsBookmarked] = useState(
        sessionStorage.getItem(`isBookmarked_${recipeName}`) === "true"
    );
    const {setMessage, setIsOpen} = useAlertStore();
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [isBookmarkedRequest, setIsBookmarkedRequest] =
        useState<boolean>(false);

    const handleClickBookmark = async () => {
        setIsBookmarked(!isBookmarked);

        if (bookmarkRef.current) {
            bookmarkRef.current.classList.toggle(
                "text-foundation-accent",
                !isBookmarked
            );
            bookmarkRef.current.classList.toggle("text-gray-500", isBookmarked);
        }

        if (!isBookmarked) {
            if (!isBookmarkedRecipe) {
                setMessage("북마크에 추가되었습니다.");
                setIsOpen(true);
            }

            if (!oneLineIntroduction || isStreaming) {
                const payload: AddBookmarkRequestPayload = {
                    name: recipeName,
                    imageUrl: representativeImageUrl,
                    cookingTime: cookingTime,
                    calories: calories,
                };

                sessionStorage.setItem(`isBookmarked_${recipeName}`, "true");
                await postBookmark(payload, setId);

                return;
            }

            const payload: AddDetailedBookmarkRequestPayload = {
                name: recipeName,
                imageUrl: representativeImageUrl,
                cookingTime: cookingTime,
                calories: calories,
                oneLineIntroduction: oneLineIntroduction,
                ingredients: usedIngredients,
                introduction: recipeIntroduction,
                nutrition: nutrition,
            };
            sessionStorage.setItem(`isBookmarked_${recipeName}`, "true");
            await postBookmark(payload, setId);

            return;
        }

        if (!isBookmarkedRecipe) {
            setMessage("북마크에서 삭제되었습니다.");
            setIsOpen(true);
        }
        sessionStorage.setItem(`isBookmarked_${recipeName}`, "false");

        await deleteBookmark(recipeName!);
    };

    const detailedMenuOptions: DetailedMenuOptions = {
        name: [recipeName],
        availableIngredients: storedIngredients?.length
            ? storedIngredients
            : availableIngredients?.length
                ? availableIngredients
                : ["all"],
        cookingTime: [`${cookingTime}분`],
        calories: [`${calories}kcal`],
    };

    const fetchAdditionalInfo = async () => {
        const payload: AiDetailedMenusRequestPayload = {
            options: detailedMenuOptions,
        };

        console.log("레시피 추가 정보 요청 전송");
        console.log("payload: ", payload);
        const data = await GET(payload);

        setOneLineIntroduction(data.oneLineIntroduction);
        setUsedIngredients(data.usedIngredients);
        setNutrition((prev) => ({
            ...prev,
            carbohydrate: data.carbohydrate,
            protein: data.protein,
            fat: data.fat,
            sodium: data.sodium,
            sugar: data.sugar,
        }));
    };

    useEffect(() => {
        if (isBookmarkedRecipe) {
            return;
        }

        if (!recipeName) {
            return;
        }

        const cachedData = sessionStorage.getItem(`recipe_${recipeName}`);

        const isRefreshed = sessionStorage.getItem("isRefreshed") === "true";
        console.log("새로고침 여부: ", isRefreshed);
        sessionStorage.setItem("isRefreshed", "true");

        if (cachedData && !isRefreshed) {
            const parsedData = JSON.parse(cachedData);
            console.log("사용된 재료: " + parsedData.usedIngredients);
            setOneLineIntroduction(parsedData.oneLineIntroduction);
            setUsedIngredients(parsedData.usedIngredients);
            setNutrition(parsedData.nutrition);
            setRecipeIntroduction(parsedData.recipeIntroduction);

            return;
        }

        fetchAdditionalInfo();
        if (isBookmarkedRequest) {
            handleClickBookmark();
        }
    }, [selectedRecipe, availableIngredients, isBookmarkedRecipe]);

    useEffect(() => {
        if (recipeIntroduction && usedIngredients.length > 0) {
            sessionStorage.setItem(
                `recipe_${recipeName}`,
                JSON.stringify({
                    oneLineIntroduction,
                    usedIngredients,
                    nutrition,
                    recipeIntroduction,
                })
            );
        }
    }, [recipeIntroduction]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (!isBookmarkedRecipe) {
            return;
        }

        (async () => {
            try {
                const bookmarkedData = await getBookmarkedData(id);
                console.log("북마크 데이터: ", bookmarkedData);

                if (!bookmarkedData.detailed) {
                    await fetchAdditionalInfo();
                    setIsBookmarkedRequest(true);
                    return;
                }

                setOneLineIntroduction(bookmarkedData.oneLineIntroduction);
                setUsedIngredients(bookmarkedData.recipeIngredients);
                setNutrition(bookmarkedData.nutrition);
                setRecipeIntroduction(bookmarkedData.introduction);
                console.log("recipeIntroduction: ", bookmarkedData.recipeIntroduction);
            } catch (error) {
                console.error("북마크 데이터를 가져오는 중 오류 발생:", error);
            }
        })();
    }, []);

    useEffect(() => {
        const modifyBookmark = async () => {
            if (isStreaming || (!isBookmarked && !isBookmarkedRequest)) {
                return;
            }

            const payload: ModifyDetailedBookmarkRequestPayload = {
                id: id,
                oneLineIntroduction: oneLineIntroduction,
                ingredients: usedIngredients,
                introduction: recipeIntroduction,
                nutrition: nutrition,
            };

            console.log("북마크 상세 레시피 추가 요청: ", payload);

            if (isStreaming) {
                return;
            }

            await patchBookmark(payload);
        };

        (async () => {
            await modifyBookmark();
        })();
    }, [isStreaming]);

    return (
        <div className="bg-foundation-tertiary ">
            <div className="">
                <div className="">
                    <div className="px-4 bg-foundation-secondary">
                        <header className=" top-0 z-20 sticky ">
                            <div className="flex h-14 items-center justify-center relative">
                                <IoIosArrowBack
                                    className=" cursor-pointer size-6 absolute left-0"
                                    onClick={handleClickArrowBack}
                                />
                                <h2 className="heading-m text-content-secondary">
                                    추천 레시피
                                </h2>
                                <div className=" absolute right-0 flex gap-10">
                                    {!isBookmarkedRequest && (
                                        <Bookmark
                                            className={`w-6 h-6 text-content-tertiary cursor-pointer ${isBookmarked ? "text-foundation-accent" : ""}`}
                                            onClick={handleClickBookmark}
                                            ref={bookmarkRef}
                                        />
                                    )}
                                </div>
                            </div>
                        </header>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="">
                            <div>
                                <div className=" relative  bg-foundation-secondary w-full">
                                    <img
                                        src={representativeImageUrl}
                                        alt="메뉴 이미지"
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className=" relative ">
                                        <img
                                            src="/svg/aibanner.svg"
                                            alt="배너"
                                            className="inline-block w-full h-auto "
                                        />
                                        <p className=" absolute heading-s h-full top-0 w-full flex justify-center items-center md:heading-xl">
                                            그린볼
                                            <span className="text-foundation-primary ml-1.5">AI</span>
                                            가 제안하는 레시피예요!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 py-5 bg-foundation-secondary">
                                <h1 className="text-content-secondary heading-m">
                                    {recipeName}
                                </h1>

                                <div className=" paragraph-xs text-content-tertiary mt-3">
                                    {oneLineIntroduction}
                                </div>

                                <div className="flex justify-start gap-4 text-gray-600 mt-4">
                                    <div className="flex items-center  gap-1 heading-xs text-gray-600">
                                        <div className="h-full flex items-start mt-1">
                                            <ClockSvg/>
                                        </div>
                                        <span className="text-foundation-primary">
                      {cookingTime}
                    </span>
                                        <span className=" text-content-quarternary">min</span>
                                    </div>
                                    <div className="flex items-center gap-1 heading-xs text-gray-600">
                                        <div className="h-full flex items-start">
                                            <FireSvg/>
                                        </div>
                                        <span className="text-foundation-primary">{calories}</span>
                                        <span className="text-content-quarternary leading-none">
                      kcal
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TODO: 로딩 페이지 완성 후 대체 */}
                        {!usedIngredients || usedIngredients.length === 0 ? (
                            <p className="px-4 bg-foundation-secondary text-center text-gray-500">
                                로딩 중...
                            </p>
                        ) : (
                            <>
                                <div className="bg-foundation-secondary px-4">
                                    <h2 className="heading-s text-content-secondary mt-3">
                                        재료
                                    </h2>
                                    <ul className="mt-1 flex flex-col ">
                                        {usedIngredients.length > 0 ? (
                                            usedIngredients.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="flex label-s text-content-tertiary justify-between h-11 py-3 border-b-border-default"
                                                >
                          <span className="flex">
                            <img
                                src="/image/meat.png"
                                alt={item.name}
                                className="w-5 h-5 mr-2"
                            />
                              {item.name}
                          </span>
                                                    <span>{item.weight}g</span>
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-gray-500"></p>
                                        )}
                                    </ul>
                                </div>

                                <RecipeStreaming
                                    usedIngredients={usedIngredients}
                                    recipeName={recipeName}
                                    cookingTime={cookingTime}
                                    calories={calories}
                                    recipeIntroduction={recipeIntroduction}
                                    setRecipeIntroduction={setRecipeIntroduction}
                                    isStreaming={isStreaming}
                                    setIsStreaming={setIsStreaming}
                                    isBookmarkedRecipe={isBookmarkedRecipe}
                                    setIsBookmarkedRequest={setIsBookmarkedRequest}
                                />
                            </>
                        )}

                        <div className="px-4 pt-3 bg-foundation-secondary">
                            <h2 className="heading-s pb-2">영양 정보</h2>
                            <div className="bg-foundation-tertiary rounded-lg grid grid-cols-3 gap-4 mb-20">
                                <div className="p-3 text-sm text-content-secondary text-center">
                                    <p className="paragraph-xs">열량</p>
                                    <p className="text-content-secondary label-s">
                                        {nutrition.calories}
                                    </p>
                                </div>
                                <div className="p-3 text-sm text-content-secondary text-center">
                                    <p className="paragraph-xs">탄수화물</p>
                                    <p className="text-content-secondary label-s">
                                        {nutrition.carbohydrate}
                                    </p>
                                </div>
                                <div className="p-3 text-sm text-content-secondary text-center">
                                    <p className="paragraph-xs">단백질</p>
                                    <p className="text-content-secondary label-s">
                                        {nutrition.protein}
                                    </p>
                                </div>
                                <div className="p-3 text-sm text-content-secondary text-center">
                                    <p className="paragraph-xs">지방</p>
                                    <p className="text-content-secondary label-s">
                                        {nutrition.fat}
                                    </p>
                                </div>
                                <div className="p-3 text-sm text-content-secondary text-center">
                                    <p className="paragraph-xs">나트륨</p>
                                    <p className="text-content-secondary label-s">
                                        {nutrition.sodium}
                                    </p>
                                </div>
                                <div className="p-3 text-sm text-content-secondary text-center">
                                    <p className="paragraph-xs">당류</p>
                                    <p className="text-content-secondary label-s">
                                        {nutrition.sugar}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
