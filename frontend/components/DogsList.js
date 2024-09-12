import React, { useState, useEffect } from "react";

export default function DogsList({
  dogs,
  setDogs,
  setValues,
  navigate,
  setIsUpdating,
}) {
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

  const handleDelete = (evt) => {
    const id = evt.target.id;
    fetch(`http://localhost:3003/api/dogs/${id}`, { method: "DELETE" })
      .then(() => fetchDogs())
      .catch((err) => console.error("Failed to delet dog"));
  };

  const handleEdit = (evt) => {
    console.log(evt.target.id);
    const filteredDog = dogs.find(
      (dog) => dog.id === parseInt(evt.target.id, 10)
    );
    setValues({
      name: `${filteredDog.name}`,
      breed: `${filteredDog.breed}`,
      adopted: filteredDog.adopted,
    });
    setIsUpdating(true);
    navigate("/form");
  };

  return (
    <div>
      <h2>Dogs Shelter</h2>
      <ul>
        {dogs?.map((dog) => {
          return (
            <li key={dog.id}>
              {`${dog.name}, ${dog.breed}, ${dog.adopted ? "" : "NOT"} adopted`}
              <div>
                <button onClick={handleEdit} id={dog.id}>
                  Edit
                </button>
                <button onClick={handleDelete} id={dog.id}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
