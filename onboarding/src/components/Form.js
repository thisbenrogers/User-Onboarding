import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import Users from './Users';

const LoginForm = ({ status, values, errors, touched, isSubmitting }) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
      setUsers(users => [...users, status])
    }
  }, [status]);

  return (
    <div className="loginForm">
      <Form>
        <div>
          {touched.name && errors.name && <p>{errors.name}</p>}
          <Field type="text" name="name" placeholder="Name" />
        </div>
        <div>
          {touched.email && errors.email && <p>{errors.email}</p>}
          <Field type="email" name="email" placeholder="Email" />
        </div>
        <div>
          {touched.password && errors.password && <p>{errors.password}</p>}
          <Field type="password" name="password" placeholder="Password" />
        </div>
        <label >
          <Field type="checkbox" name="tos" />
          Acknowledge our <a href="https://en.wikipedia.org/wiki/Terms_of_service">terms of service</a>
        </label>
        <div>
          <button disabled={isSubmitting}>Submit</button>
        </div>
      </Form>
      <Users users={users} />
    </div>
  )
}

const FormikLoginForm = withFormik({

  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .trim("looks like there's a whitespace before or after your name.")
      .required("Please include your name"),
    email: Yup.string()
      .email("Email not valid")
      .required("Please include an email address"),
    password: Yup.string()
      .min(8, "Password must be 8 charaters or longer")
      .required("Please include your password"),
    tos: Yup.boolean()
      .required("Please review our Terms of Service and check the box to indicate that you have.")
      .default(false, "Please review our Terms of Service and check the box to indicate that you have.")
  }),


  handleSubmit(values, { setStatus, resetForm, setErrors, setSubmitting }) {
    if (values.email === "waffle@syrup.com") {
      setErrors({ email: "That email is already taken, probably by you." });
    } else {
      axios
        .post('https://reqres.in/api/users', values)
        .then(res => {
          resetForm();
          setStatus(res.data);
          console.log(res.data);
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        })
    }
  }

})(LoginForm);

export default FormikLoginForm;