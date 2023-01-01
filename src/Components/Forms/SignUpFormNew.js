import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
// import "yup-phone";

const SignUpSchema = Yup.object().shape({
  employees: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string().required("This field is required"),
      lastName: Yup.string().required("This field is required"),
    })
  ),
  // .required("This field is required"),
});

const SignupFormNew = () => {
  return (
    <>
      <Formik
        initialValues={{
          employees: [{ firstName: "", lastName: "" }],
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <Form>
            <div className="form-group">
              <h4>Add multiple employyee</h4>
              <FieldArray
                name="employees"
                render={(arrayHelpers) => {
                  return (
                    <div>
                      {formik.values.employees.map((employee, i) => (
                        // <div>{`Employee ${i + 1}`}</div>
                        <>
                          <div className="mt-2" key={i}>
                            {i > 0 && (
                              <div className="float-end">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => arrayHelpers.remove(i)}
                                >
                                  X
                                </button>
                              </div>
                            )}
                            <div className="card" style={{ padding: 5 }}>
                              <div className="card-title">{`Employee ${
                                i + 1
                              }`}</div>
                              <div className="card-body">
                                <div className="form-group">
                                  <label htmlFor={`employees.${i}.firstName`}>
                                    First Name
                                  </label>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    name={`employees.${i}.firstName`}
                                    id={`employees.${i}.firstName`}
                                  />
                                  <ErrorMessage
                                    name={`employees.${i}.firstName`}
                                    component="span"
                                    className="field_error"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor={`employees.${i}.lastName`}>
                                    last Name
                                  </label>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    name={`employees.${i}.lastName`}
                                    id={`employees.${i}.lastName`}
                                  />
                                  <ErrorMessage
                                    name={`employees.${i}.lastName`}
                                    component="span"
                                    className="field_error"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                      <div className="form-group float-end mt-2">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() =>
                            arrayHelpers.insert(
                              formik.values.employees.length + 1,
                              { firstName: "", lastName: "" }
                            )
                          }
                        >
                          + Add
                        </button>
                      </div>
                      <br />
                      <br />
                    </div>
                  );
                }}
              />
            </div>
            <div className="form-group ">
              <button type="submit" className="btn btn-primary btn-block mt-2">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignupFormNew;
