"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag } from "@prisma/client";
import { MdDoNotDisturb } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { notFound, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";

import Loader from "../Loader";
import TabsBox from "../TabsBox";
import AuthModal from "../auth/AuthModal";
import PaginationBox from "../PaginationBox";
import { getTag } from "@/actions/tag/getTag";
import { TaggedData } from "@/types/question";
import { watchTag } from "@/actions/tag/watchTag";
import { ignoreTag } from "@/actions/tag/ignoreTag";
import { Button, buttonVariants } from "../ui/Button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { QUESTIONS_PER_PAGE, taggedQuestionsTabs } from "@/constants";
import { getTaggedQuestions } from "@/actions/question/getTaggedQuestions";
import { IgnoreType, IgnoreValues, WatchType, WatchValues } from "@/types/tag";
import Question from "./Question";

interface TaggedQuestionsProps {
    name: string;
}

const isValidTab = (value: string) => {
    const isValid = taggedQuestionsTabs.find((tab) => tab.value === value);
    if (!!isValid) return true;
    return false;
};

const TaggedQuestions = ({ name }: TaggedQuestionsProps) => {
    const user = useCurrentUser();
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const tab = searchParams.get("tab") || "newest";
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [watchedTagIds, setWatchedTagIds] = useState(user?.watchedTagIds || []);
    const [ignoredTagIds, setIgnoredTagIds] = useState(user?.ignoredTagIds || []);

    const handleWatchClick = () => {
        if (!!user) {
            watch(watchValues);
        } else {
            setShowAuthModal(true);
        }
    };

    const handleIgnoreClick = () => {
        if (!!user) {
            ignore(ignoreValues);
        } else {
            setShowAuthModal(true);
        }
    };

    const fetchTag = async () => {
        const payload = { name };
        const tag = await getTag(payload);
        return tag as Tag;
    };

    const {
        data: tag,
        isFetching: isFetchingTag
    } = useQuery({
        queryKey: ["tag", name],
        queryFn: fetchTag
    });

    const fetchQuestions = async () => {
        if (tag) {
            // @ts-ignore
            const payload = { tagId: tag.id, tab, page: Number(page), limit: QUESTIONS_PER_PAGE };
            const data = await getTaggedQuestions(payload);
            return data as TaggedData;
        }
    };

    const {
        data,
        isFetching: isFetchingQuestions
    } = useQuery({
        queryKey: ["questions", "tagged", name, { tab, page }],
        queryFn: fetchQuestions,
        enabled: !!tag
    });

    const {
        mutate: watch,
        isPending: isWatchLoading
    } = useMutation({
        mutationFn: async (values: WatchValues) => {
            const payload = { tagId: values.tagId };
            await watchTag(payload);
        },
        onSuccess: (_, values: WatchValues) => {
            if (!user) return;
            if (values.type === "watch") {
                // If the user is clicking the `Watch tag` button,
                // Remove the tag id from the ignoredTagIds (in case if they have ignored the tag) & add it to watchedTagIds
                const newIgnoredTagIds = ignoredTagIds.filter((id) => id !== values.tagId);
                const newWatchedTagIds = [...watchedTagIds, values.tagId];
                user.ignoredTagIds = newIgnoredTagIds;
                user.watchedTagIds = newWatchedTagIds;
                setIgnoredTagIds(newIgnoredTagIds);
                setWatchedTagIds(newWatchedTagIds);
            } else if (values.type === "unwatch") {
                // If the user is clicking the `Unwatch tag` button,
                // Simply remove the tag id from the watchedTagIds
                const newWatchedTagIds = watchedTagIds.filter((id) => id !== values.tagId);
                user.watchedTagIds = newWatchedTagIds;
                setWatchedTagIds(newWatchedTagIds);
            }
        },
        onError: (error) => {
            // TODO - Alert the user about the error
            console.log("Something went wrong", error);
        }
    });

    const {
        mutate: ignore,
        isPending: isIgnoreLoading
    } = useMutation({
        mutationFn: async (values: IgnoreValues) => {
            if (user && user.id) {
                const payload = { tagId: values.tagId };
                await ignoreTag(payload);
            } else {
                setShowAuthModal(true);
            }
        },
        onSuccess: (_, values: IgnoreValues) => {
            if (!user) return;
            if (values.type === "ignore") {
                // If the user is clicking the `Ignore tag` button,
                // Remove the tag id from the watchedTagIds (in case if they have watched the tag) & add it to ignoredTagIds
                const newWatchedTagIds = watchedTagIds.filter((id) => id !== values.tagId);
                const newIgnoredTagIds = [...ignoredTagIds, values.tagId];
                user.watchedTagIds = newWatchedTagIds;
                user.ignoredTagIds = newIgnoredTagIds;
                setWatchedTagIds(newWatchedTagIds);
                setIgnoredTagIds(newIgnoredTagIds);
            } else if (values.type === "unignore") {
                // If the user is clicking the `Unignore tag` button,
                // Simply remove the tag id from the ignoredTagIds
                const newIgnoredTagIds = ignoredTagIds.filter((id) => id !== values.tagId);
                user.ignoredTagIds = newIgnoredTagIds;
                setIgnoredTagIds(newIgnoredTagIds);
            }
        },
        onError: (error) => {
            // TODO - Alert the user about the error
            console.log("Something went wrong", error);
        }
    });

    if (!isValidTab(tab)) return notFound();
    if (isFetchingTag) return <Loader type="full" />
    if (!tag) return notFound();

    const isWatchedTag = watchedTagIds.find((id) => id === tag.id);
    const isIgnoredTag = ignoredTagIds.find((id) => id === tag.id);
    const watchType: WatchType = isWatchedTag ? "unwatch" : "watch";
    const ignoreType: IgnoreType = isIgnoredTag ? "unignore" : "ignore";
    const watchValues = { type: watchType, tagId: tag.id };
    const ignoreValues = { type: ignoreType, tagId: tag.id };

    return (
        <>
            {showAuthModal && (
                <AuthModal setShow={setShowAuthModal} />
            )}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 py-4 pr-4">
                <section className="flex-1">
                    <div className="pl-4">
                        <header>
                            <div className="flex items-enter justify-between">
                                <h1 className="text-xl sm:text-2xl font-medium text-zinc-800">Questions tagged [{tag.name}]</h1>
                                <Link href="/questions/ask" className={buttonVariants()}>Ask Question</Link>
                            </div>

                            <p className={`text-[13px] sm:text-sm ${tag.description ? "text-zinc-900" : "text-zinc-400"} mt-4`}>{tag.description
                                ? tag.description
                                : "No description provided for this tag"
                            }</p>

                            {!!user && (
                                <div className="flex gap-3 mt-3">
                                    <Button
                                        isLoading={isWatchLoading}
                                        onClick={handleWatchClick}
                                    >
                                        {isWatchedTag ? (
                                            <>{!isWatchLoading && <IoMdEyeOff className="h-5 w-5 mr-1" />} Unwatch tag</>
                                        ) : (
                                            <>{!isWatchLoading && <IoMdEye className="h-5 w-5 mr-1" />} Watch tag</>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        isLoading={isIgnoreLoading}
                                        onClick={handleIgnoreClick}
                                    >
                                        {isIgnoredTag ? (
                                            <>{!isIgnoreLoading && <MdDoNotDisturb className="h-5 w-5 mr-1" />} Unignore tag</>
                                        ) : (
                                            <>{!isIgnoreLoading && <MdDoNotDisturb className="h-5 w-5 mr-1" />} Ignore tag</>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </header>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between my-4">
                            <p className="text-base sm:text-lg text-zinc-900 mb-2 sm:mb-0">
                                {data?.questions
                                    ? `${data?.totalQuestions} ${data?.totalQuestions === 1 ? "question" : "questions"}`
                                    : ""
                                }
                            </p>
                            <TabsBox
                                route={`/questions/tagged/${tag.name}`}
                                tabs={taggedQuestionsTabs}
                                value={tab}
                            />
                        </div>
                    </div>

                    {isFetchingQuestions ? (
                        <Loader type="half" />
                    ) : (
                        <>
                            <div>
                                {(data?.questions && data.questions.length > 0) ? (
                                    data.questions.map((question, index) => (
                                        <Question
                                            key={index}
                                            user={user}
                                            id={question.id}
                                            title={question.title}
                                            details={question.details}
                                            tags={question.tags}
                                            asker={question.asker}
                                            votes={question.votes}
                                            answererIds={question.answers}
                                            views={question.views}
                                            askedAt={question.askedAt}
                                            updatedAt={question.updatedAt}
                                            watchedTagIds={watchedTagIds}
                                            ignoredTagIds={ignoredTagIds}
                                            setWatchedTagIds={setWatchedTagIds}
                                            setIgnoredTagIds={setIgnoredTagIds}
                                            setShowAuthModal={setShowAuthModal}
                                            showDetails
                                        />
                                    ))
                                ) : (
                                    <p className="text-center text-zinc-400 text-[15px]">No questions to show</p>
                                )}
                            </div>
                            <PaginationBox
                                location={`/tags?tab=${tab}&`}
                                currentPage={Number(page)}
                                lastPage={data?.lastPage}
                            />
                        </>
                    )}
                </section>

                <section className="w-full lg:w-[300px] ml-4 lg:ml-0 border border-zinc-300 rounded-sm">
                    Hello world
                </section>
            </div>
        </>
    )
};

export default TaggedQuestions;