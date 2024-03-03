"use client";

import ActivityNav from "./ActivityNav";
import SelectActivity from "./SelectActivity";
import SummaryContent from "./SummaryContent";

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

                <SummaryContent
                    userId={userId}
                    username={username}
                />
            </div>
        </>
    )
};

export default ActivitiesTab;