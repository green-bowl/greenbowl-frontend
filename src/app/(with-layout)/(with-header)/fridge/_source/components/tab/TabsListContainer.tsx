"use client";

import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { usePathname } from "next/navigation";
import SelectConfigTypeModal from "@/app/(with-layout)/(with-header)/fridge/my-ingredient/_source/components/Storage/modal/SelectConfigTypeModal";
import route from "@/constants/route";
import Link from "next/link";

const tabItems = [
  { key: "myIngredient", name: "내 재료", route: route.myFridge.myIngredient },
  { key: "tip", name: "냉장고 꿀팁", route: route.myFridge.tip },
];

const TabsListContainer = () => {
  const pathName = usePathname();

  const activeTab = tabItems.find((tab) => pathName === tab.route)?.key;

  return (
    <TabsList className="h-9 flex w-full justify-between heading-m">
      <div className="flex">
        {tabItems.map((item) => (
          <TabsTrigger key={item.key} className="h-full" value={item.key}>
            <Link href={item.route} scroll={false}>
              <div
                className={`relative flex items-center h-full p-2 justify-center`}
              >
                <p
                  className={
                    activeTab === item.key
                      ? "text-content-secondary"
                      : "text-content-quarternary"
                  }
                >
                  {item.name}
                </p>
                {activeTab === item.key && (
                  <div className="absolute bottom-0 w-full h-[2px] bg-foundation-primary" />
                )}
              </div>
            </Link>
          </TabsTrigger>
        ))}
      </div>

      {activeTab === "myIngredient" && <SelectConfigTypeModal />}
    </TabsList>
  );
};

export default TabsListContainer;
