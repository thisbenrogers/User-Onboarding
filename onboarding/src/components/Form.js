import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginForm = ({ errors, touched, isSubmitting }) => {

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
      .required("Please type in your name here."),
    email: Yup.string()
      .email("Email not valid")
      .required("Please include an email address"),
    password: Yup.string()
      .min(8, "Password must be 8 charaters or longer")
      .required("Please include your password"),
    tos: Yup.boolean()
      .default(false, "Please review our Terms of Service and check the box to indicate that you have.")
      .required("Please review our Terms of Service and check the box to indicate that you have.")
  }),

  handleSubmit(values) {
    console.log(values);
  }

})(LoginForm);

export default FormikLoginForm;