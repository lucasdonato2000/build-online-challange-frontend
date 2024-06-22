import React from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginValidationSchema } from "../schemas/loginValidationSchema";
import InputField from "./InputField";
import Button from "./Button";
import { login } from "../services/userService";
import { startLoading, stopLoading } from "../store/reducers/loadingReducer";
import { RootState } from "../store/store";
import axios from "axios";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loading);
  return (
    <div className="size-full flex items-center justify-center bg-black text-white m-60 mt-1">
      <div className="size-full p-8 space-y-6 bg-black rounded-lg shadow-lg m-60 mt-20">
        <h1 className="text-3xl font-black text-center font-red-hat">
          Welcome
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={async (values, actions) => {
            dispatch(startLoading());
            try {
              const response = await login(values.email, values.password);
              console.log(response);

              localStorage.setItem("token", response.token);

              window.location.href = "/contactDashboard";
            } catch (error) {
              console.error(error);
              const message =
                axios.isAxiosError(error) && error.response?.data?.message
                  ? error.response.data.message
                  : "Unexpected error";
              actions.setStatus(message);
            } finally {
              dispatch(stopLoading());
            }
          }}
        >
          {({ status }) => (
            <Form className="space-y-4">
              <InputField
                type="email"
                name="email"
                placeholder="john@doe.com"
              />
              <InputField
                type="password"
                name="password"
                placeholder="*********"
              />
              {status && (
                <div className="text-red-500 text-center">{status}</div>
              )}
              <div className="flex justify-center">
                <Button
                  className="w-48 py-2 px-8 rounded-full font-medium font-inter"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Login"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
