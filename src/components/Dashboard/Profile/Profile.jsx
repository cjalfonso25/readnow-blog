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
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [insta, setInsta] = useState("");
  const [avatar, setAvatar] = useState("");
  const [fileInput, setFileInput] = useState("");
  const [preview, setPreview] = useState("");
  const [loaded, setLoaded] = useState(0);

  const { user, setUser: setProviderUser } = useContext(UserContext);

  useEffect(() => {
    document.title = "Profile - Readnow";
  });

  useEffect(() => {
    if (user) {
      setName(user.name);
      setTitle(user.title);
      setAbout(user.about);
      setFacebook(user.facebook);
      setTwitter(user.twitter);
      setInsta(user.insta);
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      const updates = {
        name: inputs.name,
        title: inputs.title,
        about: inputs.about,
        facebook: inputs.facebook,
        twitter: inputs.twitter,
        instagram: inputs.instagram,
      };

      const data = await updateProfile(updates);

      setProviderUser(data);
      toast.success("Profile has been updated!");
    } catch (e) {
      toast.error(`Something went wrong. Please try again. Error: ${e}`);
    }
  };

  const handleFileSelect = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setAvatar(e.target.files[0]);
    setLoaded(0);
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

  const { inputs, handleInputChange, handleSubmit } = useForm(handleUpdate);

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

                      <h4>{name}</h4>
                      <p>{title}</p>
                      <div className="social-holder">
                        <a href={user.facebook ? facebook : "# "}>
                          <i className="fab fa-facebook fa-2x"></i>
                        </a>
                        <a href={user.twitter ? twitter : "# "}>
                          <i className="fab fa-twitter fa-2x"></i>
                        </a>
                        <a href={user.instagram ? insta : "# "}>
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
                        type="text"
                        value={inputs.name || name}
                        onChange={handleInputChange}
                        required="required"
                      />

                      <Input
                        label="Title"
                        name="title"
                        type="text"
                        value={inputs.title || title || ""}
                        onChange={handleInputChange}
                        required="required"
                      />

                      <Textarea
                        label="About me"
                        name="about"
                        rows={8}
                        value={inputs.about || about || ""}
                        onChange={handleInputChange}
                      />

                      <h4 className="mt-4">Social Accounts</h4>
                      <Input
                        label="Facebook"
                        name="facebook"
                        type="text"
                        placeholder="https://facebook.com/username"
                        value={inputs.facebook || facebook || ""}
                        onChange={handleInputChange}
                      />

                      <Input
                        label="Twitter"
                        name="twitter"
                        type="text"
                        placeholder="Twitter url"
                        value={inputs.twitter || twitter || ""}
                        onChange={handleInputChange}
                      />

                      <Input
                        label="Instagram"
                        name="instagram"
                        type="text"
                        placeholder="Instagram url"
                        value={inputs.instagram || insta || ""}
                        onChange={handleInputChange}
                      />

                      <Button
                        className="btn-primary mt-3"
                        label="Save changes"
                        onClick={handleSubmit}
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
