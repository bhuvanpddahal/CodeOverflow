import Sidebar from "@/components/Sidebar";

const Layout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="container px-0 sm:px-2 md:px-8 flex">
            <Sidebar />
            {children}
        </div>
    )
};

export default Layout;