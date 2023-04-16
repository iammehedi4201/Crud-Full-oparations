import { createBrowserRouter } from "react-router-dom";
import AddUser from "../../Pages/AddUser/AddUser";
import Users from "../../Pages/Home/Users";
import UpdateInfo from "../../Pages/UpdateInfo/UpdateInfo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Users></Users>,
    loader:()=> fetch("http://localhost:4000/users")
  },
  {
    path: "/addUser",
    element:<AddUser></AddUser>
  },
  {
    path:"/updateInfo/:id",
    element:<UpdateInfo></UpdateInfo>,
    loader:({params})=>{
        const id =params.id;
        return fetch(`http://localhost:4000/users/${id}`)
    }
  }
]);
