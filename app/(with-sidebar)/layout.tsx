import Sidebar from "@/components/Sidebar";

const Layout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <div className="flex">
                <Sidebar />
                {children}
            </div>
        </>
    )
};

export default Layout;