import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAdminLoginStatus } from "../redux/states/AdminSlice/AdminActions";
import { getAdmin } from "../redux/states/AdminSlice/AdminActions";

export const useAdminGetStatus = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const bringStatusInfo = () => {
      dispatch(getAdminLoginStatus()).then((res) => {
        if (res.payload.data) {
          dispatch(getAdmin()).then((res) => {
            if (!res.payload.error) {
              if (path) {
                navigate(path);
              }
            }
          });
        } else {
          navigate("/admin/login");
        }
      });
    };
    bringStatusInfo();
  }, [dispatch]);
};
