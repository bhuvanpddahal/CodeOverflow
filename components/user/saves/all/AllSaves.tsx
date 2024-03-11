"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound, useSearchParams } from "next/navigation";

import Loader from "@/components/Loader";
import AnswerContent from "./AnswerContent";
import QuestionContent from "./QuestionContent";
import PostTabsLink from "../../activity/PostTabsLink";
import { Button } from "@/components/ui/Button";
import {
    SAVED_ITEMS_PER_PAGE,
    userAllSavesTabs
} from "@/constants";
import { AllSavesData } from "@/types/user";
import { getUserSavedItems } from "@/actions/user/getUserSavedItems";
import PaginationBox from "@/components/PaginationBox";

type Sort = "score" | "views" | "newest";

interface AllSavesProps {
    username: string;
}

const isValidTab = (value: string) => {
    const isValid = userAllSavesTabs.find((tab) => tab.value === value);
    if (!!isValid) return true;
    return false;
};

const AllSaves = ({
    username
}: AllSavesProps) => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const sort = searchParams.get("sort") || "score";

    const fetchSavedItems = async () => {
        const payload = { sort: "score" as Sort, page: 1, limit: SAVED_ITEMS_PER_PAGE };
        const data = await getUserSavedItems(payload);
        return data as AllSavesData;
    };

    const {
        data,
        isFetching
    } = useQuery({
        queryKey: ["users", username, "saves", { sort }],
        queryFn: fetchSavedItems
    });

    if (!isValidTab(sort)) return notFound();
    if (!data) return <div>Something went wrong</div>
    console.log("Data: ", data);

    return (
        <div className="flex-1">
            <div className="flex justify-between mb-3">
                <div>
                    <h3 className="text-lg sm:text-xl text-zinc-800 mb-2">All saves</h3>
                    <div className="text-zinc-500 text-xs sm:text-[15px]">{data.totalItems} saved {data.totalItems === 1 ? "item" : "items"}</div>
                </div>
                <div>
                    <Button className="block mb-4 ml-auto">Create a new list</Button>
                    <PostTabsLink
                        tabs={userAllSavesTabs}
                        value={sort}
                        route={`/users/${username}/saves`}
                    />
                </div>
            </div>

            {isFetching ? (
                <Loader type="half" />
            ) : (
                data.items.length ? (
                    <ul className="border border-zinc-300 rounded-md mb-4">
                        {data.items.map((item, index) => (
                            <li className={`relative p-4 ${index === data.items.length - 1 ? "" : "border-b border-zinc-300"}`}>
                                {item.itemType === "QUESTION" ? (
                                    <QuestionContent
                                        questionId={item.itemId}
                                        votes={item.question.votes}
                                        answersCount={item.question.answers.length}
                                        viewsCount={item.question.views.length}
                                        title={item.question.title}
                                        tags={item.question.tags}
                                        askerImage={item.question.asker.image}
                                        askerName={item.question.asker.name}
                                        askerUsername={item.question.asker.username}
                                        askedAt={item.question.askedAt}
                                        updatedAt={item.question.updatedAt}
                                    />
                                ) : (
                                    <>
                                        <QuestionContent
                                            questionId={item.answer.question.id}
                                            votes={item.answer.question.votes}
                                            answersCount={item.answer.question.answers.length}
                                            viewsCount={item.answer.question.views.length}
                                            title={item.answer.question.title}
                                            tags={item.answer.question.tags}
                                            askerImage={item.answer.question.asker.image}
                                            askerName={item.answer.question.asker.name}
                                            askerUsername={item.answer.question.asker.username}
                                            askedAt={item.answer.question.askedAt}
                                            updatedAt={item.answer.question.updatedAt}
                                        />
                                        <AnswerContent
                                            votes={item.answer.votes}
                                            content={item.answer.content}
                                            answererImage={item.answer.answerer.image}
                                            answererName={item.answer.answerer.name}
                                            answererUsername={item.answer.answerer.username}
                                            answeredAt={item.answer.answeredAt}
                                            updatedAt={item.answer.updatedAt}
                                        />
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>Add items to display</div>
                )
            )}

            {(data.items.length > 0) && (
                <PaginationBox
                    location={`/users/${username}/saves?sort=${sort}&`}
                    currentPage={Number(page)}
                    lastPage={data?.lastPage}
                />
            )}
        </div>
    )
};

export default AllSaves;