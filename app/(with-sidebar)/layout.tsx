import Footer from "@/components/Footer";
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
            <Footer />
        </>
    )
};

export default Layout;