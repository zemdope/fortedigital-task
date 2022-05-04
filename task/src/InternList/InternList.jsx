import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditIcon from '../assets/edit.svg';
import ButtonLink from '../ButtonLink';
import Container from '../Container';
import './InternList.css';

const InternList = () => {
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    const fetchInterns = async () => {
      const response = await axios('http://localhost:3001/interns').catch((e) =>
        alert(e)
      );
      const interns = response.data;
      setInterns(interns);
    };
    fetchInterns();
  }, []);

  return (
    <Container title="Participants">
      <div className="list">
        {interns &&
          interns.map((u) => (
            <div className="list-item" key={u.id}>
              {u.name}{' '}
              <ButtonLink icon={EditIcon} to={`/interns/${u.id}`} space={10}>
                Edit
              </ButtonLink>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default InternList;
