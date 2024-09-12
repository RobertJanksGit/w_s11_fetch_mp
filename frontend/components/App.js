import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import DogForm from "./DogForm";
import DogsList from "./DogsList";
import { useNavigate } from "react-router-dom";

const initialForm = { id: "", name: "", breed: "", adopted: false };

export default function App() {
  const [dogs, setDogs] = useState();
  const [values, setValues] = useState(initialForm);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  const fetchDogs = () => {
    fetch("http://localhost:3003/api/dogs")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not OK");
        }
        const contentType = res.headers.get("Content-Type");
        if (contentType.includes("application/json")) {
          return res.json();
        }
      })
      .then((data) => {
        setDogs(data);
      })
      .catch((err) => console.error("Failed to GET dogs", err));
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <DogsList
              fetchDogs={fetchDogs}
              setIsUpdating={setIsUpdating}
              dogs={dogs}
              setDogs={setDogs}
              setValues={setValues}
              navigate={navigate}
            />
          }
        />
        <Route
          path="/form"
          element={
            <DogForm
              navigate={navigate}
              initialForm={initialForm}
              fetchDogs={fetchDogs}
              setIsUpdating={setIsUpdating}
              isUpdating={isUpdating}
              values={values}
              setValues={setValues}
              navigate={navigate}
            />
          }
        />
      </Routes>
    </div>
  );
}
