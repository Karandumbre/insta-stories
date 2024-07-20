import Stories from "./components/stories";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./constants/query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUsers } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_USERS);

  useEffect(() => {
    if (data) {
      dispatch(setUsers(data.getAllUsers));
    }
  });
  return (
    <>
      <div className="app stories-wrapper">
        {loading && <div>Loading...</div>}
        {error && <div>Error! ${error.message}</div>}
        {data && <Stories />}
      </div>
      <div className="desktop-story-message-wrapper">
        Please note that stories are visible only on mobile devices.
      </div>
    </>
  );
}

export default App;
