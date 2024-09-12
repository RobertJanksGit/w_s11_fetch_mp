import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import DogForm from "./DogForm";
import DogsList from "./DogsList";
import { useNavigate } from "react-router-dom";

const initialForm = { name: "", breed: "", adopted: false };

export default function App() {
  const [dogs, setDogs] = useState();
  const [values, setValues] = useState(initialForm);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

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
