import React, { useState } from "react";
import UserCard from "./UserCard";
import GeneralInfoCard from "./GeneralInfoCard";

type FormState = {
  userName: string;
  lastName: string;
  firstName: string;
  email: string;
};

const initialFormState = {
  userName: "",
  lastName: "",
  firstName: "",
  email: "",
};

const AccountSettingsPage = () => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setForm({ ...form, [id]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-tr from-blue-800 to-purple-700">
      <UserCard />
      <GeneralInfoCard />
    </div>
  );
};

export default AccountSettingsPage;
