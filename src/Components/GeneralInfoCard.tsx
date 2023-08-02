import React, { useState } from "react";
import UserCard from "./UserCard";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";

type FormState = {
  userName: string;
  lastName: string;
  firstName: string;
  email: string;
  country: string;
  phoneNumber: string;
  birthDate: Date;
};

const initialFormState = {
  userName: "",
  lastName: "",
  firstName: "",
  email: "",
  country: "",
  phoneNumber: "",
  birthDate: new Date(),
};

type CountriesData = {
  [country: string]: string[];
};

const countriesData: CountriesData = {
  Afghanistan: [
    "Herat",
    "Kabul",
    "Kandahar",
    "Molah",
    "Rana",
    "Shar",
    "Sharif",
    "Wazir Akbar Khan",
  ],
  Albania: [
    "Elbasan",
    "Petran",
    "Pogradec",
    "Shkoder",
    "Tirana",
    "Ura Vajgurore",
  ],
  // Add more countries and cities as needed
};

const GeneralInfoCard = () => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setForm({ ...form, [id]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handlePhoneNumberChange = (value: string) => {
    setForm((prevState) => ({ ...prevState, phoneNumber: value }));
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleSelectCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setForm((prevState) => ({ ...prevState, country: value }));

    const countryCities = countriesData[value];
    if (countryCities) {
      setCities(countryCities);
      console.log(countryCities);
    } else {
      setCities([]);
    }

    setSelectedCountry(value);
  };

  const handleSelectCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setForm((prevState) => ({ ...prevState, country: value }));
    setSelectedCity(value);
  };

  const handleDateChange = (date: Date) => {
    setForm((prevState) => ({ ...prevState, birthDate: date }));
  };

  return (
    <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Account Settings
      </h1>
      <div className="flex flex-wrap -m-2">
        <div className="w-full sm:w-1/2 p-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 w-full"
            type="text"
            id="firstName"
            value={form.firstName}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 w-full"
            type="text"
            id="lastName"
            value={form.lastName}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="userName"
          >
            Username
          </label>
          <input
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 w-full"
            type="text"
            id="userName"
            value={form.userName}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 w-full"
            type="email"
            id="email"
            value={form.email}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 w-full"
            type="phoneNumber"
            id="phoneNumber"
            value={form.phoneNumber}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="birthdate"
          >
            Birthdate
          </label>
          <input
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 w-full"
            type="date"
            id="birthdate"
            value={""}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="country"
          >
            Country
          </label>
          <select
            id="country"
            value={selectedCountry}
            onChange={handleSelectCountry}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 w-full"
          >
            <option value="">Select a country</option>
            {Object.keys(countriesData).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="city"
          >
            City
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={handleSelectCity}
            disabled={!selectedCountry}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 w-full"
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full p-2">
          {isEditing ? (
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg w-full"
              onClick={handleSaveClick}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg w-full"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoCard;
