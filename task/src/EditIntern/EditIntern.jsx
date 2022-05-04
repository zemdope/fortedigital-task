import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import * as Yup from 'yup';
import ArrowIcon from '../assets/arrow.svg';
import Button from '../Button';
import Container from '../Container';
import './EditIntern.css';

const REQUIRED_ERROR_MESSAGE = 'This field is required';
const EMAIL_ERROR_MESSAGE = 'This email is not valid';
const DATE_ERROR_MESSAGE = 'This date is not correct';
const REVERSED_TIME_ERROR_MESSAGE = 'Enter a date after internship start';

const textInputs = [
  {
    label: 'Full name *',
    name: 'name',
    type: 'text',
  },
  {
    label: 'Email address *',
    name: 'email',
    type: 'email',
  },
];

const dateInputs = [
  {
    label: 'Internship start *',
    name: 'internshipStart',
  },
  {
    label: 'Internship end *',
    name: 'internshipEnd',
  },
];

const initialValues = {
  name: '',
  email: '',
  internshipStart: '',
  internshipEnd: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED_ERROR_MESSAGE),
  email: Yup.string()
    .email(EMAIL_ERROR_MESSAGE)
    .required(REQUIRED_ERROR_MESSAGE),
  internshipStart: Yup.date(DATE_ERROR_MESSAGE).required(
    REQUIRED_ERROR_MESSAGE
  ),
  internshipEnd: Yup.date(DATE_ERROR_MESSAGE)
    .required(REQUIRED_ERROR_MESSAGE)
    .min(Yup.ref('internshipStart'), REVERSED_TIME_ERROR_MESSAGE),
});

const EditIntern = () => {
  const { id } = useParams();
  const history = useHistory();
  const [formValues, setFormValues] = useState(null);

  useEffect(() => {
    const formatDate = (date) => date.split('T')[0];

    const transformData = (data) => {
      return {
        ...data,
        internshipStart: formatDate(data.internshipStart),
        internshipEnd: formatDate(data.internshipEnd),
      };
    };

    const fetchInterns = async () => {
      const response = await axios(`http://localhost:3001/interns/${id}`).catch(
        (e) => alert(e)
      );
      const intern = response.data;
      if (intern?.name) {
        setFormValues(transformData(intern));
      }
    };
    fetchInterns();
  }, [id]);

  const onSubmit = async (data) => {
    const TIME = 'T00:00+00Z';

    await axios
      .put(`http://localhost:3001/interns/${data.id}`, {
        ...data,
        internshipStart: data.internshipStart + TIME,
        internshipEnd: data.internshipEnd + TIME,
      })
      .then(() => {
        alert('ok');
        history.push('/');
      })
      .catch((error) => alert(error));
  };

  return (
    <Container
      title="Edit"
      backTo="/"
      backToText="Back to list"
      backToIcon={ArrowIcon}
    >
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form>
            {textInputs.map((item, index) => (
              <React.Fragment key={index}>
                <label>{item.label}</label>
                <fieldset>
                  <Field
                    type={item.type}
                    id={item.name}
                    name={item.name}
                    className={
                      errors[item.name] && touched[item.name] ? 'error' : ''
                    }
                  />
                  {errors[item.name] && touched[item.name] && (
                    <span className="error-icon"></span>
                  )}
                </fieldset>
                <p className="error-message">
                  <ErrorMessage name={item.name} />
                </p>
              </React.Fragment>
            ))}

            <div className="date-container">
              {dateInputs.map((item, index) => (
                <div key={index}>
                  <label>{item.label}</label>
                  <Field
                    type="date"
                    id={item.name}
                    name={item.name}
                    className={
                      errors[item.name] && touched[item.name] ? 'error' : ''
                    }
                  />
                  <p className="error-message">
                    <ErrorMessage name={item.name} />
                  </p>
                </div>
              ))}
            </div>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditIntern;
