import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import './EmployeeForm.css'; // Assuming you create a CSS file for styling

const EmployeeForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      employeeId: "",
      email: "",
      phone: "",
      department: "",
      dateOfJoining: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      employeeId: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Employee ID is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Must be a valid 10-digit number")
        .required("Phone number is required"),
      department: Yup.string().required("Department is required"),
      dateOfJoining: Yup.date()
        .max(new Date(), "Cannot select a future date")
        .required("Date of joining is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: onSubmit,
  });

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Employee Management Form</h2>
        <form onSubmit={formik.handleSubmit} className="employee-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
          </div>

          <div className="form-group">
            <label>Employee ID:</label>
            <input
              type="text"
              name="employeeId"
              className="form-control"
              {...formik.getFieldProps("employeeId")}
            />
            {formik.touched.employeeId && formik.errors.employeeId && (
              <div className="error">{formik.errors.employeeId}</div>
            )}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="error">{formik.errors.phone}</div>
            )}
          </div>

          <div className="form-group">
            <label>Department:</label>
            <select
              name="department"
              className="form-control"
              {...formik.getFieldProps("department")}
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
            </select>
            {formik.touched.department && formik.errors.department && (
              <div className="error">{formik.errors.department}</div>
            )}
          </div>

          <div className="form-group">
            <label>Date of Joining:</label>
            <input
              type="date"
              name="dateOfJoining"
              className="form-control"
              {...formik.getFieldProps("dateOfJoining")}
            />
            {formik.touched.dateOfJoining && formik.errors.dateOfJoining && (
              <div className="error">{formik.errors.dateOfJoining}</div>
            )}
          </div>

          <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              name="role"
              className="form-control"
              {...formik.getFieldProps("role")}
            />
            {formik.touched.role && formik.errors.role && (
              <div className="error">{formik.errors.role}</div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="reset" onClick={formik.handleReset} className="reset-btn">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
