import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const AddUser = () => {
    const [user,setUser]=useState({});
    const handleSubmit=(event)=>{
          event.preventDefault();
          const form=event.target;
          console.log("The user is :-",user);
          fetch('http://localhost:4000/users',{
              method:"POST",
              headers:{
                "content-type": "application/json",
              },
              body:JSON.stringify(user)
          })
          .then(res=>res.json())
          .then(data=>{
               if (data.acknowledged) {
                   toast.success("Data Insert Successfully");
                   form.reset();
               }
               console.log(data);
          })
    }
    const handleInputBlur =(event)=>{
          const value =event.target.value;
          const field =event.target.name;
          const newUsers ={...user};
          newUsers[field]=value;
          setUser(newUsers);
    }

    return (
        <div>
        <h1>User Information Form</h1>
        <hr />
        <form
        onSubmit={handleSubmit}
        className="border p-5"
        style={{ backgroundColor: "whit" }}
      >
        {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
        <div className="row mb-4">
          <div className="col">
            <div className="form-outline">
              <label className="form-label">Name:</label>
              <input
                onChange={handleInputBlur}
                type="text"
                name="Name"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <label className="form-label">Phone Number:-</label>
              <input
                onChange={handleInputBlur}
                type="number"
                name="PhoneNumber"
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <label className="form-label">Email address</label>
          <input
            onChange={handleInputBlur}
            type="email"
            name="Email"
            className="form-control"
            required
          />
        </div>
        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <label className="form-label">Password</label>
          <input
            onChange={handleInputBlur}
            type="password"
            name="Password"
            className="form-control"
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
        </div>
    );
};

export default AddUser;
