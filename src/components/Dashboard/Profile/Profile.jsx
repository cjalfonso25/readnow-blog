import React, { useState, useEffect, lazy, Suspense, useContext } from "react";
import { toast } from "react-toastify";
import Spinner from "../../common/Spinner";
import Input from "../../common/Input";
import Textarea from "../../common/Textarea";
import Button from "../../common/Button";
import useForm from "../../CustomHooks/useForm";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from "../../../services/userServices";
import UserContext from "../../context/UserContext";

const Avatar = lazy(() => import("../../common/Avatar"));

const Profile = () => {
  const { user, setUser: setProviderUser } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    title: "",
    about: "",
    facebook: "",
    twitter: "",
    instagram: "",
  });
  const [avatar, setAvatar] = useState("");
  const [fileInput, setFileInput] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    document.title = "Profile - Readnow";
  });

  useEffect(() => {
    if (user) {
      setCurrentUser({
        name: user.name,
        title: user.title,
        about: user.about,
        facebook: user.facebook,
        twitter: user.twitter,
        instagram: user.insta,
      });
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      const data = await updateProfile(currentUser);

      setProviderUser(data);
      toast.success("Profile has been updated!");
    } catch (e) {
      toast.error(`Something went wrong. Please try again. Error: ${e}`);
    }
  };

  const handleInputChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setAvatar(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (avatar) {
        const data = new FormData();
        data.append("avatar", avatar);

        const image = await uploadAvatar(data);
        user.avatar = image;
        setProviderUser((prev) => ({ ...prev, avatar: image }));
      }

      toast.success("Avatar has been uploaded!");
      setAvatar("");
      setPreview("");
    } catch (e) {
      toast.error(`Something went wrong. Please try again. Error: ${e}`);
    }
  };

  return (
    <div className="profile">
      <div className="row">
        <div className="col">
          <Suspense fallback={<Spinner />}>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="profile__image">
                      <div
                        className="img-holder"
                        onClick={() => fileInput.click()}
                      >
                        {user.avatar ? (
                          <Avatar preview={preview} image={user.avatar} />
                        ) : null}
                      </div>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          handleFileSelect(e);
                        }}
                        ref={(fileInput) => setFileInput(fileInput)}
                      />

                      <Button
                        label="Upload"
                        className="btn-primary btn-sm mb-3"
                        disabled={avatar ? false : "disabled"}
                        onClick={handleUpload}
                      />

                      <h4>{currentUser.name}</h4>
                      <p>{currentUser.title}</p>
                      <div className="social-holder">
                        <a href={user.facebook ? currentUser.facebook : "# "}>
                          <i className="fab fa-facebook fa-2x"></i>
                        </a>
                        <a href={user.twitter ? currentUser.twitter : "# "}>
                          <i className="fab fa-twitter fa-2x"></i>
                        </a>
                        <a href={user.instagram ? currentUser.instagram : "# "}>
                          <i className="fab fa-instagram fa-2x"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-8">
                    <div className="profile__info">
                      <h4>Info</h4>
                      <Input
                        label="Name"
                        name="name"
                        value={currentUser.name}
                        onChange={(e) => handleInputChange(e)}
                        required="required"
                      />

                      <Input
                        label="Title"
                        name="title"
                        value={currentUser.title || ""}
                        onChange={(e) => handleInputChange(e)}
                        required="required"
                      />

                      <Textarea
                        label="About me"
                        name="about"
                        rows={8}
                        value={currentUser.about || ""}
                        onChange={(e) => handleInputChange(e)}
                      />

                      <h4 className="mt-4">Social Accounts</h4>
                      <Input
                        label="Facebook"
                        name="facebook"
                        placeholder="https://facebook.com/username"
                        value={currentUser.facebook || ""}
                        onChange={(e) => handleInputChange(e)}
                      />

                      <Input
                        label="Twitter"
                        name="twitter"
                        placeholder="https://twitter.com/username"
                        value={currentUser.twitter || ""}
                        onChange={(e) => handleInputChange(e)}
                      />

                      <Input
                        label="Instagram"
                        name="instagram"
                        placeholder="https://instagram.com/username"
                        value={currentUser.instagram || ""}
                        onChange={(e) => handleInputChange(e)}
                      />

                      <Button
                        className="btn-primary mt-3"
                        label="Save changes"
                        onClick={handleUpdate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Profile;
