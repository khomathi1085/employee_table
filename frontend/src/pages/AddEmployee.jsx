import React from "react";
import axios from "axios";
import EmployeeForm from "../components/EmployeeForm";

const AddEmployee = () => {
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/add-employee`, values);
      alert(response.data);
    } catch (error) {
      alert(error.response.data || "An error occurred");
    }
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <EmployeeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEmployee;
