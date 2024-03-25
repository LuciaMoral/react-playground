import { useState, useEffect } from "react";
import userService, { User } from "../services/user-service";
import { CanceledError } from "../services/api-client";

const useUsers = () => {
  // fetching data with json placeholder
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  // showing a loading indicator exercise
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // 2. with .then .catch() methods it is shorter and cleaner.
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    // our clean up function
    return () => cancel();
  }, []);
  // return our state variables with an object
  return { users, error, isLoading, setUsers, setError, setLoading };
};

export default useUsers;
