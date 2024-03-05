"use client";

import ActivityNav from "./ActivityNav";
import TagsContent from "./tags/TagsContent";
import SelectActivity from "./SelectActivity";
import VotesContent from "./votes/VotesContent";
import AnswersContent from "./answers/AnswersContent";
import SummaryContent from "./summary/SummaryContent";
import QuestionsContent from "./questions/QuestionsContent";

interface ActivitiesTabProps {
    userId: string;
    profileName: string;
    username: string;
    activeTab: string;
    isCurrentUser: boolean;
}

const ActivitiesTab = ({
    userId,
    profileName,
    username,
    activeTab,
    isCurrentUser
}: ActivitiesTabProps) => {
    return (
        <>
            <SelectActivity
                username={username}
                activeTab={activeTab}
            />
            <div className="flex gap-5">
                <ActivityNav
                    username={username}
                    activeTab={activeTab}
                />
                {(activeTab === "summary" || activeTab === "activity") && (
                    <SummaryContent
                        userId={userId}
                        profileName={profileName}
                        username={username}
                        isCurrentUser={isCurrentUser}
                    />
                )}
                {activeTab === "answers" && (
                    <AnswersContent
                        userId={userId}
                        profileName={profileName}
                        username={username}
                        isCurrentUser={isCurrentUser}
                    />
                )}
                {activeTab === "questions" && (
                    <QuestionsContent
                        userId={userId}
                        profileName={profileName}
                        username={username}
                        isCurrentUser={isCurrentUser}
                    />
                )}
                {activeTab === "tags" && (
                    <TagsContent
                        userId={userId}
                        profileName={profileName}
                        username={username}
                        isCurrentUser={isCurrentUser}
                    />
                )}
                {activeTab === "votes" && (
                    <VotesContent
                        userId={userId}
                        profileName={profileName}
                        username={username}
                        isCurrentUser={isCurrentUser}
                    />
                )}
            </div>
        </>
    )
};

export default ActivitiesTab;