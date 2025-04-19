"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import CategoryList from "./components/CategoryList";
import Guide from "./components/Guide";
import BookmarkList from "./components/BookmarkList";
import KakaoMessageBanner from "./components/KakaoMessageBanner";
import AnswerList from "./components/AnswerList";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 300,
    });
  }, []);

  return (
    <>
      <CategoryList />
      <Guide />
      <BookmarkList />
      <KakaoMessageBanner />
      <AnswerList />
    </>
  );
}
