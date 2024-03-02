import SummaryBox from "./SummaryBox";

const ProfileTab = () => {
    return (
        <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-[240px] h-fit">
                <h3 className="text-lg sm:text-xl text-zinc-800 mb-2">Stats</h3>
                <ul className="grid grid-cols-2 gap-3 border border-zinc-300 rounded-md p-3">
                    <li>
                        <span className="block text-zinc-800 font-medium">1</span>
                        <span className="block text-zinc-600 text-[13px] sm:text-sm">reputation</span>
                    </li>
                    <li>
                        <span className="block text-zinc-800 font-medium">1</span>
                        <span className="block text-zinc-600 text-[13px] sm:text-sm">reached</span>
                    </li>
                    <li>
                        <span className="block text-zinc-800 font-medium">1</span>
                        <span className="block text-zinc-600 text-[13px] sm:text-sm">answers</span>
                    </li>
                    <li>
                        <span className="block text-zinc-800 font-medium">1</span>
                        <span className="block text-zinc-600 text-[13px] sm:text-sm">questions</span>
                    </li>
                </ul>
            </div>

            <div className="flex-1 space-y-4">
                <div>
                    <h3 className="text-lg sm:text-xl text-zinc-800 mb-2">About</h3>
                    <div className="text-zinc-800 text-[15px]">
                        Author of C# in Depth

                        Currently a software engineer at Google, working remotely but near London.
                        Usually a Microsoft MVP (C#, 2003-2010, 2011-)

                        Sites / social:

                        Mastodon: @jonskeet@hachyderm.io
                        C# in Depth
                        Coding blog
                        C# articles
                        Twitter @jonskeet
                        Email: skeet@pobox.com (but please read my blog post on Stack Overflow-related emails first)
                    </div>
                </div>

                <SummaryBox
                    title="Top posts"
                />
            </div>
        </div>
    )
};

export default ProfileTab;