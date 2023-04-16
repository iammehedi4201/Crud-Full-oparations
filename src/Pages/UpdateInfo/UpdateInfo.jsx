import React, { useState } from "react";
import "./UpdateInfo.css";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-hot-toast";

const UpdateInfo = () => {
  //data load from  database
  const storedUser  = useLoaderData();
  //state for update user info
  const [user,setUser]=useState(storedUser)
  //handle update
  const handleUpdate = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/users/${storedUser._id}`,{
              method:"PUT",
              headers:{
                'content-type':"application/json"
              },
              body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
             if (data.modifiedCount > 0 ) {
                 toast.success("User Info Updated Successfully")
             }
             console.log(data);
        })
        
  };
  const handleInputChange = (event) => {
       const value =event.target.value;
       const field =event.target.name;
       const newUser = {...user}
       newUser[field]=value;
       setUser(newUser);
      
  };

  return (
    <div>
      <h1 style={{ color: "skyblue" }}>{user.Name} Information</h1>
      <hr />
      <section className="userInfoForm">
        <form
          onSubmit={handleUpdate}
          className="border p-5"
          style={{ backgroundColor: "whit" }}
        >
          {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <label className="form-label">Name:</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="Name"
                  className="form-control"
                  defaultValue={user.Name}
                  required
                />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label">Phone Number:-</label>
                <input
                  onChange={handleInputChange}
                  type="number"
                  name="PhoneNumber"
                  className="form-control"
                  defaultValue={user.PhoneNumber}
                  required
                />
              </div>
            </div>
          </div>

          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <label className="form-label">Email address</label>
            <input
              onChange={handleInputChange}
              type="email"
              name="Email"
              className="form-control"
              defaultValue={user.Email}
              required
            />
          </div>
          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <label className="form-label">Password</label>
            <input
              onChange={handleInputChange}
              type="password"
              name="Password"
              className="form-control"
              defaultValue={user.Password}
              required
            />
          </div>

          {/* <!-- Checkbox --> */}
          <div className="form-check d-flex justify-content-center mb-4">
            <input className="form-check-input me-2" type="checkbox" />
            <label className="form-check-label">
              Subscribe to our newsletter
            </label>
          </div>

          {/* <!-- Submit button --> */}
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign up
          </button>
        </form>
      </section>
    </div>
  );
};

export default UpdateInfo;
