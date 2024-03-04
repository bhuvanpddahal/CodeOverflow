"use client";

import ActivityNav from "./ActivityNav";
import AnswersContent from "./AnswersContent";
import SelectActivity from "./SelectActivity";
import SummaryContent from "./SummaryContent";
import QuestionsContent from "./QuestionsContent";

interface ActivitiesTabProps {
    userId: string;
    username: string;
    activeTab: string;
}

const ActivitiesTab = ({
    userId,
    username,
    activeTab
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
                {activeTab === "summary" || activeTab === "activity" && (
                    <SummaryContent
                        userId={userId}
                        username={username}
                    />
                )}
                {activeTab === "answers" && (
                    <AnswersContent
                        userId={userId}
                        username={username}
                    />
                )}
                {activeTab === "questions" && (
                    <QuestionsContent
                        userId={userId}
                        username={username}
                    />
                )}
            </div>
        </>
    )
};

export default ActivitiesTab;