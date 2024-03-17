import Sidebar from "@/components/Sidebar";

const Layout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <div className="container flex">
                <Sidebar />
                {children}
            </div>
        </>
    )
};

export default Layout;