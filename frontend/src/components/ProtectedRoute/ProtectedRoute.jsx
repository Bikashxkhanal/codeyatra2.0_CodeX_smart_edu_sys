import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { verifyAuth } from "../../api/auth.api";
import useFetch from "../../hooks/useFetch";
import { setCredintials } from "../../Stores/authSlice";

function Protected({ allowedRoles = [] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. Get user from Redux (for subsequent navigations)
  const { user: reduxUser } = useSelector((state) => state.auth);

  // 2. Database Check (enabled only if Redux is empty)
  const { data, isLoading, isError } = useFetch('verifyMe', verifyAuth, {
    enabled: !reduxUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // 3. Determine the "Active User" 
  // If redux has it, use it. Otherwise, use the fresh data from the API.
  const activeUser = useMemo(() => reduxUser || data?.data, [reduxUser, data]);

  // 4. Sync Database response to Redux in background
  useEffect(() => {
    if (data?.data && !reduxUser) {
      dispatch(setCredintials(data.data));
    }
  }, [data, reduxUser, dispatch]);

  // 5. Navigation Guard
  useEffect(() => {
    if (isLoading) return;

    // If no user found anywhere
    if (!activeUser && !isLoading) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }

    // Role Guard
    if (activeUser && allowedRoles.length > 0 && !allowedRoles.includes(activeUser?.role)) {
      navigate("/404", { replace: true });
    }
  }, [activeUser, isLoading, allowedRoles, navigate, location]);

  // 6. Loading State (Matching CollabEd theme)
  if (isLoading && !activeUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute font-black text-indigo-600 text-[10px]">CE</div>
        </div>
        <p className="mt-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest animate-pulse">
          Syncing Session...
        </p>
      </div>
    );
  }

  // 7. Render Logic
  const hasAccess = activeUser && (allowedRoles.length === 0 || allowedRoles.includes(activeUser?.role));

  if (hasAccess) {
    return <Outlet />;
  }

  return null;
}

export default Protected;