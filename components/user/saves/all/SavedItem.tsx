"use client";

import { useMutation } from "@tanstack/react-query";
import { IoEllipsisVertical } from "react-icons/io5";

import AnswerContent from "./AnswerContent";
import QuestionContent from "./QuestionContent";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { saveItem } from "@/actions/user/saveItem";
import { SavedItem as SavedItemType } from "@/types/user";

interface SavedItemProps {
    user: {
        id: string;
        username: string;
        watchedTagIds: string[];
        ignoredTagIds: string[];
        savedItemIds: string[];
    } | undefined;
    item: SavedItemType;
    isLast: boolean;
}

const SavedItem = ({
    user,
    item,
    isLast
}: SavedItemProps) => {
    const isSaved = user?.savedItemIds.find((id) => id === item.itemId);
    console.log("user saved item ids: ", user?.savedItemIds, "isSaved: ", isSaved);

    const {
        mutate: save,
        isPending: isSaveLoading
    } = useMutation({
        mutationFn: async () => {
            const payload = { itemId: item.itemId, itemType: item.itemType };
            await saveItem(payload);
        },
        onSuccess: () => {
            if (!user) return;
            const newSavedItemIds = user.savedItemIds.filter((id) => id !== item.itemId);
            user.savedItemIds = newSavedItemIds;
        },
        onError: () => {
            // TODO - Show the error message
        }
    });

    if(!isSaved) return null;

    return (
        <li className={`relative p-4 ${isLast ? "" : "border-b border-zinc-300"} ${isSaveLoading ? "opacity-80 pointer-events-none" : ""}`}>
            <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-2 right-2">
                    <div className="p-2 rounded-sm cursor-pointer border border-transparent hover:border-zinc-300 hover:bg-zinc-100">
                        <IoEllipsisVertical className="text-zinc-700" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-white' align='end'>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => save()}>Unsave</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Move to...</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

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
    )
};

export default SavedItem;