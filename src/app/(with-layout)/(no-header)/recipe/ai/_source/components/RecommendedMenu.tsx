import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaFire } from "react-icons/fa6";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAiRecipe } from "@/store/aiRecipeStore";
import { MenuApiResponse } from "@/app/(with-layout)/(no-header)/recipe/ai/_source//config";
import { AddBookmarkRequestPayload } from "@/app/(with-layout)/(no-header)/recipe/ai/_source/config";
import {
  DELETE as deleteBookmark,
  POST as postBookmark,
} from "@/app/(with-layout)/(no-header)/recipe/ai/_source/actions/bookmark";
import { useRef } from "react";
import Image from "next/image";

interface Props {
  index: number;
  recipe: MenuApiResponse;
}

const RecommendedMenu = ({ index, recipe }: Props) => {
  const router = useRouter();
  const { setSelectedRecipe } = useAiRecipe();

  const name: string = recipe.name;
  const representativeImageUrl =
    recipe.imageUrls && recipe.imageUrls.length > 0
      ? recipe.imageUrls[0]
      : process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL;
  const cookingTime = recipe.cookingTime;
  const calories = recipe.calories;

  const handleClick = () => {
    setSelectedRecipe(recipe);
    router.push(`/recipe/ai/${encodeURIComponent(name)}`);
  };

  const bookmarkRef = useRef<SVGSVGElement | null>(null);
  let isBookmarked = false;

  const handleClickBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    isBookmarked = !isBookmarked;

    if (bookmarkRef.current) {
      bookmarkRef.current.classList.toggle("text-yellow-500", isBookmarked);
      bookmarkRef.current.classList.toggle("text-gray-500", !isBookmarked);
    }

    const payload: AddBookmarkRequestPayload = {
      name: name,
      imageUrl: representativeImageUrl,
      cookingTime: cookingTime,
      calories: calories,
    };

    if (isBookmarked) {
      await postBookmark(payload);
      return;
    }

    await deleteBookmark(name);
  };

  return (
    <div
      key={index}
      className="flex items-start gap-5 p-3 bg-foundation-secondary rounded-lg shadow-md h-32 mb-8"
      onClick={handleClick}
    >
      <Image
        src={representativeImageUrl as string}
        alt="레시피 이미지"
        width={127}
        height={87}
        className="w-[127px] h-[87px] object-cover rounded-lg"
      />

      <div className="flex flex-col flex-1 justify-center gap-1 ">
        <p className=" heading-s text-content-secondary">{name}</p>

        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
          <MdOutlineAccessTimeFilled className="text-content-quarternary" />
          <span className="text-foundation-primary">{cookingTime}</span>
          <span className="text-content-quarternary">min</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
          <FaFire className="text-content-quarternary" />
          <span className="text-green-600">{calories}</span>{" "}
          <span className="text-content-quarternary">kcal</span>
        </div>

        {/*
                - 인분 삭제 -
                <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                    <IoPerson/>
                    <span className="text-green-600">{recipe.servings}</span> 인분
                </div>
                */}
      </div>

      <Bookmark
        className="w-6 h-6 text-content-tertiary cursor-pointer"
        onClick={(e) => handleClickBookmark(e)}
        ref={bookmarkRef}
      />
    </div>
  );
};

export default RecommendedMenu;
