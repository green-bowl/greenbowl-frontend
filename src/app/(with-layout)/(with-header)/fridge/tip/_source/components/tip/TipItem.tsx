import Image from "next/image";
import SwiperTags from "./SwiperTags";
import BookmarkStrokeIcon from "@/components/icons/BookmarkStroke";
import { PrevArticle } from "../TipsContainer";
import Link from "next/link";
import route from "@/constants/route";

interface Props {
  article: PrevArticle;
}

const TipItem = ({ article }: Props) => {
  return (
    <Link href={`${route.myFridge.tip}/${article.id}`} className="">
      <div className="flex flex-col gap-4 relative bg-foundation-secondary rounded-xl">
        <div className="px-3 py-5 flex flex-col gap-4">
          <div className=" absolute right-3 top-3">
            <BookmarkStrokeIcon stroke="content-tertiary" />
          </div>
          <div className="flex gap-4 ">
            <Image
              src={article.image}
              alt="팁이미지"
              height={86}
              width={86}
              className="rounded-[8px] shrink-0 h-[86px] w-[86px] object-cover overflow-hidden"
            />
            <div className="flex flex-col gap-1 w-full">
              <h2 className="  heading-s w-10/12">{article.title}</h2>
              <p className=" paragraph-xs text-content-tertiary">
                {article.description}
              </p>
            </div>
          </div>
          <div className=" relative paragraph-xs ">
            <SwiperTags tags={article.tags} />

            <div
              className=" z-[1] absolute top-0 w-10 h-full right-0"
              style={{
                background:
                  "linear-gradient(to left, #fff 0%, rgba(255,255,255,0) 100%)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TipItem;
