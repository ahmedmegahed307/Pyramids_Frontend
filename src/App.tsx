import "./App.css";
import { useEffect, useState } from "react";
import useAuthStore from "./hooks/Authentication/store";
import DashboardMain from "./Pages/Dashboard/DashboardMain";
import Login from "./Pages/Authentication/components/Login";
import { getCurrentUser } from "./services/UserService/userService";
import IsLoading from "./Pages/GeneralComponents/IsLoading";

function App() {
  const userStore = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      if (!userStore.user) {
        const user = await getCurrentUser();
        if (user) {
          userStore.setUser(user);
        }
      }
      setIsLoading(false);
    })();
  }, [userStore]);

  if (isLoading) {
    return <IsLoading />
  }

  return (
    <>
      {userStore.user ? <DashboardMain /> : <Login />}
    </>
  );
}

export default App;
