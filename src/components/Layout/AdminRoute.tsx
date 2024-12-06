import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store";





const AdminRoute = ({ children }: { children: ReactNode }) => {
    const token = useAppSelector((state: RootState) => state.user.token);
    const role = useAppSelector((state: RootState) => state.user.role);

    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }



    if (role !== "admin") {
        return <Navigate to="/login" replace={true} />;
    }

    return <>{children}</>;
};

export default AdminRoute;
