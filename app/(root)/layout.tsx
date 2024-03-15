import Sidebar from "@/components/Sidebar";
import React from "react";

const Layout = ({ children } : { children : React.ReactNode }) => {
    return (
        <main className="root flex">
            <Sidebar />
            <div className="m-5 w-full min-h-screen pe-2" style={{marginLeft: "20%"}}>
                {children}
            </div>
        </main>
    );
}

export default Layout;