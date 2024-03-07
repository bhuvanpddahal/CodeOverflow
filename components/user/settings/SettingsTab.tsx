import SelectSetting from "./SelectSetting";
import SettingsNav from "./SettingsNav";
import EditProfile from "./personal/EditProfile";

interface SettingsTabProps {
    userId: string;
    profileName: string;
    username: string;
    image: string | null;
    location: string | null;
    about: string | null;
    websiteLink: string | null;
    twitterLink: string | null;
    githubLink: string | null;
    isCurrentUser: boolean;
}

const SettingsTab = ({
    userId,
    profileName,
    username,
    image,
    location,
    about,
    websiteLink,
    twitterLink,
    githubLink,
    isCurrentUser
}: SettingsTabProps) => {
    return (
        <>
            {/* <SelectSetting /> */}
            <div className="flex gap-5">
                <SettingsNav
                    activeLocation="edit"
                    username={username}
                />
                <EditProfile
                    userId={userId}
                    profileName={profileName}
                    username={username}
                    image={image}
                    location={location}
                    about={about}
                    websiteLink={websiteLink}
                    twitterLink={twitterLink}
                    githubLink={githubLink}
                    isCurrentUser={isCurrentUser}
                />
            </div>
        </>
    )
};

export default SettingsTab;