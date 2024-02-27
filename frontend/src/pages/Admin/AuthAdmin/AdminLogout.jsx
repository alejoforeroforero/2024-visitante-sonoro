import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logAdminOut } from "../../../redux/states/AdminSlice/AdminActions";

const AdminLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const logoutFx = () => {
            dispatch(logAdminOut()).then((res) => {
                if (res.payload.data) {
                    navigate("/admin/login");
                } else {
                    console.log("algo pasó");
                }
            });
        }

        logoutFx();
    })
}

export default AdminLogout;