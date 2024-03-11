import SavesNav from "./SavesNav";
import AllSaves from "./all/AllSaves";

interface SavesTabProps {
    username: string;
}

const SavesTab = ({
    username
}: SavesTabProps) => {
    return (
        <div className="flex gap-5">
            <SavesNav />

            <AllSaves
                username={username}
            />
        </div>
    )
};

export default SavesTab;