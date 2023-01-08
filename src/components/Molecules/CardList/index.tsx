import { type MutableRefObject, useRef } from "react";
import { Link } from "react-router-dom";

// icons
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

// paths
import { PATHS } from "../../../core/paths";

// constants
import { IMAGE_URL } from "../../../constants";

import { useDraggable } from "react-use-draggable-scroll";

// types
import type { TCardListProps } from "./types";

// components
import { Card, ProfilePicture } from "../..";

// ::
const CardList = ({ list }: TCardListProps) => {
  if (list.list.length === 0) return null;

  // refs
  const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  return (
    <Card className="flex w-full flex-col gap-2 p-4 lg:max-w-xl">
      <div className="flex items-start gap-2">
        <ProfilePicture fallback={list.create_by} url={list?.avatar?.url} />
        <p className="max-w-[180px] truncate whitespace-nowrap text-lg md:max-w-md">
          {list.create_by}
        </p>
      </div>
      <h2 className="max-w-[180px] truncate whitespace-nowrap text-lg font-bold md:max-w-md">
        {list?.title}
      </h2>
      <div className="flex items-center justify-between gap-5">
        <div
          {...events}
          ref={ref}
          className="inline-flex max-w-sm select-none gap-2 overflow-hidden"
        >
          {list.list.map((item) =>
            item.poster_path ? (
              <img
                className="h-16 w-16 shadow-sm"
                key={item.id}
                draggable={false}
                src={`${IMAGE_URL}${item.poster_path}`}
              />
            ) : (
              <div className="h-16 w-16 bg-primary shadow-sm" />
            )
          )}
        </div>
      </div>
      <div className="pt-3">
        <div className="flex">
          <Link
            className="flex items-center gap-2 text-primary transition-all hover:text-primary-dark-contrast"
            to={PATHS.home}
          >
            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            Ver lista
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CardList;
