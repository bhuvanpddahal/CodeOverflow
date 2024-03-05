import moment from "moment";
import Link from "next/link";
import {
    RiQuestionnaireFill,
    RiChatCheckFill
} from "react-icons/ri";

import {
    Answer as AnswerType,
    Question as QuestionType
} from "@/types/user";

type Post = AnswerType | QuestionType;

interface PostsBoxProps {
    title: string;
    posts: Post[];
}

interface QuestionProps {
    id: string;
    title: string;
    askedAt: Date;
    isLast: boolean;
}

interface AnswerProps {
    questionId: string;
    questionTitle: string;
    answeredAt: Date;
    isLast: boolean;
}

const Question = ({ id, title, askedAt, isLast }: QuestionProps) => (
    <li className={`flex items-center gap-3 ${isLast ? "" : "border-b border-zinc-300"} p-3`}>
        <RiQuestionnaireFill title="question" className="h-5 w-5 text-emerald-800" />
        <Link href={`/questions/${id}`} className="flex-1 line-clamp-1 text-[15px] sm:text-base text-blue-700 hover:text-blue-800">
            {title}
        </Link>
        <span title={String(askedAt)} className="text-sm sm:text-[15px] text-zinc-600">{moment(askedAt).format('ll')}</span>
    </li>
);

const Answer = ({ questionId, questionTitle, answeredAt, isLast }: AnswerProps) => (
    <li className={`flex items-center gap-3 ${isLast ? "" : "border-b border-zinc-300"} p-3`}>
        <RiChatCheckFill title="answer" className="h-5 w-5 text-emerald-800" />
        <Link href={`/questions/${questionId}`} className="flex-1 line-clamp-1 text-[15px] sm:text-base text-blue-700 hover:text-blue-800">
            {questionTitle}
        </Link>
        <span title={String(answeredAt)} className="text-sm sm:text-[15px] text-zinc-600">{moment(answeredAt).format('ll')}</span>
    </li>
);

const PostsBox = ({
    title,
    posts
}: PostsBoxProps) => {
    return (
        <div>
            <div>
                <h3 className="text-lg sm:text-xl text-zinc-800 mb-2">{title}</h3>
            </div>
            {posts.length ? (
                <ul className="border border-zinc-300 rounded-md">
                    {posts.map((post, index) => (
                        'question' in post
                            ? <Answer
                                key={index}
                                questionId={post.question.id}
                                questionTitle={post.question.title}
                                answeredAt={post.answeredAt}
                                isLast={index === posts.length - 1}
                            />
                            : <Question
                                key={index}
                                id={post.id}
                                title={post.title}
                                askedAt={post.askedAt}
                                isLast={index === posts.length - 1}
                            />
                    ))}
                </ul>
            ) : (
                <p className="border border-zinc-300 text-[15px] p-4 rounded-md text-center">
                    You have not answered any questions
                </p>
            )}
        </div>
    )
};

export default PostsBox;