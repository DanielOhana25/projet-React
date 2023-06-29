import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../context/auth.context";

const SignIn = ({ redirect = "/" }) => {
  const [error, setError] = useState("");

  const { login, user } = useAuth();

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: formikValidateUsingJoi({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } })
        .label("Email"),
      password: Joi.string()
        .min(8)
        .max(1024)
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_])(?=(.*\d){4,})[a-zA-Z!@%$#^&*\-_\d]{8,}$/
        )
        .required()
        .label("Password")
        .messages({
          "string.pattern.base":
            'The "Password" must contain at least 8 Characters, and include 1 Upper-Case letter, 1 Lower-Case letter, 1 Special Symbol(!@%$#^&*-_) and 4 digits(0-9).',
        }),
    }),

    async onSubmit(values) {
      try {
        await login(values);
        navigate("/");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageHeader
        title="Sign In with Real App"
        description="Sign In to your account"
      />
      <form onSubmit={form.handleSubmit} noValidate>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          {...form.getFieldProps("email")}
          type="email"
          label="Email"
          error={form.touched.email && form.errors.email}
          required
        />
        <Input
          {...form.getFieldProps("password")}
          type="password"
          label="Password"
          error={form.touched.password && form.errors.password}
          required
        />

        <div className="my-2">
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};
export default SignIn;
