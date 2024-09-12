import React, { useState, useEffect } from "react";

// Use this form for both POST and PUT requests!
export default function DogForm({ values, setValues, isUpdating }) {
  const [breeds, setBreeds] = useState();

  const onSubmit = (event) => {
    event.preventDefault();
  };
  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    fetch("http://localhost:3003/api/dogs/breeds")
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
        setBreeds(data);
      })
      .catch((err) => console.error("Failed to GET dogs", err));
  }, []);
  breeds?.map((breed) => {});

  return (
    <div>
      <h2>Create Dog</h2>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          value={values.name}
          onChange={onChange}
          placeholder="Name"
          aria-label="Dog's name"
        />
        <select
          name="breed"
          value={values.breed}
          onChange={onChange}
          aria-label="Dog's breed"
        >
          <option value="">---Select Breed---</option>
          {breeds?.map((breed, idx) => {
            return (
              <option key={idx} value={breed}>
                {breed}
              </option>
            );
          })}
        </select>
        <label>
          Adopted:{" "}
          <input
            type="checkbox"
            name="adopted"
            checked={values.adopted}
            onChange={onChange}
            aria-label="Is the dog adopted?"
          />
        </label>
        <div>
          {isUpdating ? (
            <button type="submit">Update Dog</button>
          ) : (
            <button type="submit">Create Dog</button>
          )}
          <button aria-label="Reset form">Reset</button>
        </div>
      </form>
    </div>
  );
}
