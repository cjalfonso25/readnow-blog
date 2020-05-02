import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../common/Input";
import Button from "../../common/Button";
import Select from "../../common/Select";
import UserContext from "../../context/UserContext";
import { createUser } from "../../../services/userServices";

const AddUser = () => {
  const { userList, setUserList } = useContext(UserContext);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    isAdmin: false,
  });
  const history = useHistory();

  const handleAddUser = async () => {
    try {
      if (user.role === "Admin") {
        setUser({ ...user, isAdmin: true });
      }

      const { user: newUser } = await createUser(user);
      setUserList([...userList, newUser]);

      toast.success(`${user.username} has been added!`);
      history.push("/dashboard/user_list");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card post__add">
          <div className="card-header d-flex justify-content-between">
            <h6 className="m-0">Add New User</h6>
          </div>
          <div className="card-body">
            <Input
              label="Name"
              name="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <Input
              label="Username"
              name="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <Select
              label="Role"
              name="role"
              options={["Admin", "Moderator", "Writer"]}
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            />
            <Button
              className="btn-primary"
              label="Save"
              onClick={() => handleAddUser()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
