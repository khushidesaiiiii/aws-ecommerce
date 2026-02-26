import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile, SaveUserProfle } from "../../redux/profileSlice";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Loader from "../../components/Loader/index";
import Button from "../../UI/Button";
import { toast } from "react-toastify";
import { uploadAvatar } from "../../services/profileService";

const placeholder = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function Profile() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "", 
    email: "",
    phone: "",
    birthdate: "",
    age: "",
    gender: "",
    bio: "",
    avatar: "",
    height: "",
    weight: "",
    address: {
      name: "",
      contact: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    },
  });

  useEffect(() => {
    dispatch(GetUserProfile());
  }, [dispatch]);

  const { loading, error } = useSelector((state) => state.profile);
  const profile = useSelector((state) => state.profile?.data);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        birthdate: profile.birthdate || "",
        age: profile.age || "",
        gender: profile.gender || "",
        bio: profile.bio || "",
        avatar: profile.avatar || "",
        height: profile.height || "",
        weight: profile.weight || "",
        address: profile.address || {
          name: "",
          contact: "",
          street: "",
          city: "",
          state: "",
          country: "",
          zip: "",
        },
      });
    }
  }, [profile]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddressChange = (e) =>
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [e.target.name]: e.target.value,
      },
    });

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleSaveProfile = async () => {
    console.log(formData);
    await dispatch(SaveUserProfle(formData))
      .unwrap()
      .then(() => toast.success("Profile Updated Successfully"))
      .catch(() => toast.error("Failed to Update Profile"));
    toggle();
  };

  if (loading) return <Loader />;   

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avtar">
          <img
            src={formData.avatar || placeholder}
            alt="Avatar"
            style={{ width: 100, height: 100, borderRadius: "50%" }}
          />
        </div>
        <div className="profile-main">
          <h2>{profile?.name || "--"}</h2>
          <p>{profile?.email || "--"}</p>
          {!profile && (
            <p className="profile-warning">
              Profile not completed. Please Complete your Profile
            </p>
          )}
          <Button onClick={toggle}>
            {profile ? "Edit Profile" : "Complete Profile"}
          </Button>
        </div>
      </div>
      <div className="profile-grid">
        <InfoCard title="Personal Info">
          <Field label="Contact Number" value={profile?.phone} />
          <Field label="Birthday" value={profile?.birthdate} />
          <Field label="Age" value={profile?.age} />
          <Field label="Gender" value={profile?.gender} />
          <Field label="Height" value={profile?.height} />
          <Field label="Weight" value={profile?.weight} />
        </InfoCard>

        <InfoCard title="Delivery Address">
          {profile?.address ? (
            <>
              <Field label="Street" value={profile?.address?.street} />
              <Field label="City" value={profile?.address?.city} />
              <Field label="State" value={profile?.address?.state} />
              <Field label="Country" value={profile?.address?.country} />
              <Field label="Zip Code" value={profile?.address?.zip} />
            </>
          ) : (
            <p className="profile-warning">Data not found</p>
          )}
        </InfoCard>

        <InfoCard title="about">
          <Field label="Bio" value={profile?.bio} />
        </InfoCard>
      </div>

      <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle}>Update Profile</ModalHeader>
        <ModalBody>
          <div className="profile-modal-body">
            <div className="form-group">
              <div className="avatar-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    if (!file.type.startsWith("image/")) {
                      toast.error("Only images allowed");
                      return;
                    }

                    if (file.size > 2 * 1024 * 1024) {
                      toast.error("Max size 2MB");
                      return;
                    }

                    try {
                      toast.info("Uploading image...");

                      const url = await uploadAvatar(file);

                      setFormData((prev) => ({
                        ...prev,
                        avatar: url,
                      }));

                      toast.success("Avatar uploaded!");
                    } catch (err) {
                      console.error("Avatar Upload Error: ", err);
                      toast.error("Upload failed");
                    }
                  }}
                />
              </div>
            </div>
            <input
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              name="phone"
              type="number"
              placeholder="Enter your contact number"
              value={formData.phone}
              onChange={handleChange}
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              name="birthdate"
              type="date"
              placeholder="Enter your birthday"
              value={formData.birthdate}
              onChange={handleChange}
            />
            <input
              name="age"
              type="number"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
            />
            <input
              name="height"
              type="number"
              placeholder="Enter your height (in cm)"
              value={formData.height}
              onChange={handleChange}
            />
            <input
              name="weight"
              type="number"
              placeholder="Enter your weight (in kg)"
              value={formData.weight}
              onChange={handleChange}
            />
            <input
              name="bio"
              type="textarea"
              placeholder="Enter your bio"
              value={formData.bio}
              onChange={handleChange}
            />
            <h5>Delivery Address</h5>
            {[
              "name",
              "contact",
              "street",
              "city",
              "state",
              "country",
              "zip",
            ].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={`Enter your ${field}`}
                value={formData.address?.[field] || ""}
                onChange={handleAddressChange}
              />
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Cancel</Button>
          <Button onClick={handleSaveProfile}>Save Profile</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="info-card">
      <h4>{title}</h4>
      {children}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <p>
      <strong>{label}:</strong> {value || "--"}
    </p>
  );
}
