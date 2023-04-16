import React, { useEffect, useState } from "react";
import "./Users.css";
import { Link, useLoaderData } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-hot-toast";

const Users = () => {
  //these are for Modal
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //data load form the loader
  const  storedusers= useLoaderData();
  const [users,setUsers] =useState(storedusers)

  const handleDelete = (user) => {
     setSelectedUser(user);
     handleShow();
  };
  
  const handleYes = () => {
    setAgree(true);
    handleClose();
  };
  
  const handleNo = () => {
    setAgree(false);
    handleClose();
  };
  
  useEffect(() => {
    if (agree) {
      console.log("Deleting user:", selectedUser._id);
      fetch(`http://localhost:4000/users/${selectedUser._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
           if (data.deletedCount > 0 ) {
            const remainingUsers = users.filter(usr=>usr._id !== selectedUser._id);
            setUsers(remainingUsers)
            toast.success("User Deleted Successfully")
            
           }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
    setAgree(false);
  }, [agree, selectedUser]);
  return (
    <div>
      <h2>{users.length}-Users Information </h2>
      <hr />
      <section
        className="users-Details-section"
        style={{ position: "relative" }}
      >
        {users.map((user) => (
          <div key={user._id}>
            <div className="well well-sm">
              <div className="row p-5 border">
                <h4>{user.Name}</h4>
                <p>
                  <i className="glyphicon glyphicon-envelope"></i>
                  {user.PhoneNumber}
                  <br />
                  <i className="glyphicon glyphicon-gift"></i>
                  {user.Email}
                </p>
                {/* <!-- Split button --> */}
                <div className="btn-group">
                  <button type="button" className="btn btn-success ">
                    Hire Me
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    type="button"
                    className="btn btn-danger mx-2"
                  >
                    Delete
                  </button>
                  <Link to={`/updateInfo/${user._id}`}>
                  <button type="button" className="btn btn-success ">
                     Update Info 
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
        ))}
      </section>
      {/* this is for show confimation toast  */}
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete{" "}
            <span style={{ fontWeight: "bolder" }}>{selectedUser.Name}</span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleNo}>
              No
            </Button>
            <Button variant="primary" onClick={handleYes}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Users;
