import React from "react";
import {
  HomeFilledIcon,
  HomeIcon,
  SubscriptionsFilledIcon,
  SubscriptionsIcon,
  CollectionsFilledIcon,
  CollectionsIcon,
  HistoryFilledIcon,
  HistoryIcon,
  NotificationsFilledIcon,
  NotificationsIcon,
} from "./icons";

interface Category {
  name: string;
  iconType1: JSX.Element;
  iconType2: JSX.Element;
}

export const categories: Category[] = [
  {
    name: "首页",
    iconType1: <HomeFilledIcon fill="#000" width={24} height={24} />,
    iconType2: <HomeIcon fill="#000" width={24} height={24} />,
  },
  {
    name: "关注",
    iconType1: <SubscriptionsFilledIcon width={24} height={24} />,
    iconType2: <SubscriptionsIcon width={24} height={24} />,
  },
  {
    name: "收藏",
    iconType1: <CollectionsFilledIcon fill="#000" width={24} height={24} />,
    iconType2: <CollectionsIcon fill="#000" width={24} height={24} />,
  },
  {
    name: "历史",
    iconType1: <HistoryFilledIcon fill="#000" width={24} height={24} />,
    iconType2: <HistoryIcon fill="#000" width={24} height={24} />,
  },
  {
    name: "通知",
    iconType1: <NotificationsFilledIcon fill="#000" width={24} height={24} />,
    iconType2: <NotificationsIcon fill="#000" width={24} height={24} />,
  },
];
