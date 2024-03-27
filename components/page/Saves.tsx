import UserProfile from "../user/UserProfile";

interface SavesProps {
    username: string;
}

const Saves = ({ username }: SavesProps) => {
    return (
        <UserProfile
            activeTab="saves"
            username={decodeURIComponent(username)}
        />
    )
}

export default Saves;