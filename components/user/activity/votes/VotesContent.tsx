interface VotesContentProps {
    userId: string;
    profileName: string;
    username: string;
    isCurrentUser: boolean;
}

const VotesContent = ({
    userId,
    profileName,
    username,
    isCurrentUser
}: VotesContentProps) => {
    return (
        <div>VotesContent</div>
    )
};

export default VotesContent;