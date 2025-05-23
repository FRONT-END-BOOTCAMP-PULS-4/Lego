"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AnswerView } from "@/domain/entities/AnswerView";
import { formatDate } from "@/utils/handleFormatDate";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import Loader from "@/components/common/Loader";

export default function AnswerContent() {
  const { user, token } = useAuthStore();
  const params = useParams();
  const router = useRouter();
  const questionId = Number(params.questionid);
  const answerId = params.answerid;
  const [answerData, setAnswerDate] = useState<AnswerView | null>(null);
  const [isLike, setIsLike] = useState<boolean | undefined>(answerData?.isLike); // likeState 서버에서 받아온 값

  const currentUserId = user?.email; //현재 로그인한 유저 아이디

  const handleGetAnswerDetail = useCallback(async () => {
    const response = await fetch(
      `/api/questions/${questionId}/answers/${answerId}?currentUser=${currentUserId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("서버 응답 실패");
    }
    const { data } = await response.json();
    setAnswerDate(data);
  }, [questionId, answerId, currentUserId, token]);
  useEffect(() => {
    handleGetAnswerDetail();
  }, [handleGetAnswerDetail]);

  useEffect(() => {
    if (answerData?.isLike !== undefined) {
      setIsLike(answerData.isLike);
    }
  }, [answerData]);

  const handleToggleLike = async () => {
    if (!user?.email) {
      return router.push("/login");
    }
    const newState = !isLike;
    const method = newState ? "POST" : "DELETE";
    const formData = {
      questionId,
      answerEmail: answerId,
      userId: currentUserId,
    };
    try {
      const response = await fetch("/api/likes", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(newState ? "좋아요 실패" : "좋아요 해제 실패");
      }
      setIsLike(newState);
      toast.success(newState ? "좋아요 등록." : "좋아요 해제되었습니다.");
    } catch (error) {
      setIsLike(!newState);
      toast.error(`${(error as Error).message}`);
    }
  };
  if (!answerData) {
    return <Loader />;
  }
  return (
    <>
      <header className="flex justify-between w-full items-start sm:items-center">
        <div className="gap-3 items-end sm:items-center sm:flex">
          <Badge className="mb-2 sm:mb-0">{answerData?.category}</Badge>
          <p className="txt-3xl-b">{answerData?.question}</p>
        </div>
        <div
          className="flex items-center justify-center w-[32px] h-[32px]"
          onClick={handleToggleLike}
        >
          <Heart
            fill={isLike ? "var(--red)" : "none"}
            stroke={isLike ? "var(--red)" : "var(--black)"}
            size={32}
            className="cursor-pointer"
          />
        </div>
      </header>
      <div className="flex items-center gap-4 mt-4">
        <span
          className="w-[36px] h-[36px] inline-block bg-[var(--gray-01)] rounded-full shrink-0 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(${answerData?.avatarUrl})` }}
        ></span>
        <div>
          <div className="text-sm mb-1 font-bold text-[var(--gray-02)]">{answerData?.username}</div>
          <div className="text-xs text-[var(--gray-02)]">{formatDate(answerData?.createdAt)}</div>
        </div>
      </div>
      <p className="mt-[30px] txt-base leading-[2] break-words">{answerData?.content}</p>
    </>
  );
}
