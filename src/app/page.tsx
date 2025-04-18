"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, ChevronDown } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 300,
    });
  }, []);

  // DB에 카테고리 추가 시 name, href 매핑 필요
  const category = [
    { id: 1, name: "HTML", src: "/assets/images/category/1.svg", href: "/questions?category=1" },
    { id: 2, name: "CSS", src: "/assets/images/category/2.svg", href: "/questions?category=2" },
    {
      id: 3,
      name: "JavaScript",
      src: "/assets/images/category/3.svg",
      href: "/questions?category=3",
    },
    {
      id: 4,
      name: "TypeScript",
      src: "/assets/images/category/4.svg",
      href: "/questions?category=4",
    },
    { id: 5, name: "React", src: "/assets/images/category/5.svg", href: "/questions?category=5" },
    { id: 6, name: "Next", src: "/assets/images/category/6.svg", href: "/questions?category=6" },
  ];

  return (
    <>
      <section className="flex justify-center gap-1.5 mt-[var(--space-40)] mb-[60px]">
        {category.map((item, index) => (
          <Link key={index} href={item.href} className="flex flex-col items-center gap-2 w-[135px]">
            <Image
              src={item.src}
              alt={item.name}
              width={36}
              height={36}
              className="max-w-[var(--text-48)] md:w-[var(--text-48)] md:h-[var(--text-48)]"
            />
            <p className="txt-sm">{item.name}</p>
          </Link>
        ))}
      </section>

      <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-gradient-to-t from-[var(--blue-03)] via-white to-white text-center py-[130px] mb-[100px]">
        <div className="max-w-2xl mx-auto px-4" data-aos="fade-down">
          <h2 className="txt-5xl-b mb-[var(--space-24)]">
            기술 면접
            <br />
            어떻게 준비해야할까?
          </h2>
          <p className="!text-gray-500 txt-2xl-b !font-normal mb-[var(--space-36)]">
            기술 면접은 정말 어렵습니다.
            <br />
            하지만, 저희와 함께라면 걱정하지 마세요!
          </p>
          <Link href="/questions">
            <Button
              variant="round"
              size="lg"
              className="hover:-translate-y-2 transition-transform duration-300"
            >
              시작하기
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-[var(--space-4)] left-1/2 -translate-x-1/2 animate-bounce text-[var(--gray-03)]">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      <section className="mb-[100px]" data-aos="fade-up">
        <h3 className="txt-3xl-b pb-[var(--space-36)]">많이 스크랩된 콘텐츠</h3>
        <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-4">
          {[...Array(4)].map((_, i) => (
            <Link href={`/questions/${i + 1}`} key={i}>
              <Card key={i} variant="default" className="flex flex-col gap-[var(--space-40)]">
                <p className="txt-2xl-b">HTTP 메소드에 대한 설명</p>
                <div className="flex justify-between">
                  <Badge variant="outline">JavaScript</Badge>
                  <div className="flex gap-[8px]">
                    <Bookmark className="fill-amber-300 stroke-none" />
                    <p>1000</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-[100px]">
        <Card
          variant="none"
          className="flex justify-between items-center bg-[var(--blue-03)] px-[58px] py-[42px]"
          data-aos="fade-right"
        >
          <p className="txt-3xl-b">매일매일 꾸준히 좋은 습관을 길러요</p>
          <Button variant={"round"}>Click</Button>
        </Card>
      </section>

      <section className="mb-[150px]" data-aos="fade-left">
        <h3 className="txt-3xl-b pb-[var(--space-36)]">많이 좋아요 받은 답변</h3>
        <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Link href={`/questions/${i + 1}/answer/${i + 1}`} key={i}>
              <Card
                key={i}
                variant="none"
                className="flex flex-col gap-[var(--space-40)] p-[var(--space-36)]"
              >
                <p className="txt-2xl-b line-clamp-3">
                  컴포넌트를 개발하다보면 무심코 하나의 컴포넌트에서 많은 역할을 담당하고 있는
                  경우가 있습니다. 하나의 클래스는 오직 하나의 이유로만 변경해야 한다는 어쩌구저쩌구
                  글씨 짤라보자
                </p>
                <div className="flex justify-between">
                  <p>리액트의 어쩌구 저쩌구에 대해 설명해주세요</p>
                  <p>사용자</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
