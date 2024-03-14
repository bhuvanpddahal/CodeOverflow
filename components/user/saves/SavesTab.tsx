import SavesNav from "./SavesNav";
import AllSaves from "./all/AllSaves";

interface SavesTabProps {
    user: {
        id: string;
        username: string;
        watchedTagIds: string[];
        ignoredTagIds: string[];
        savedItemIds: string[];
    } | undefined;
}

const SavesTab = ({
    user
}: SavesTabProps) => {
    return (
        <div className="flex gap-5">
            <SavesNav />

            <AllSaves
                user={user}
            />
        </div>
    )
};

export default SavesTab;