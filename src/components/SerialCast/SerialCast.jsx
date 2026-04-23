import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import Title from '../Title/Title';
import SerialCastList from '../SerialCastList/SerialCastList';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { getSerialCast } from '../../api/moviesApi';

const SerialCast = () => {
  const [actors, setActors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });
  const { serialId } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        setError(prevState => ({
          ...prevState,
          isError: false,
          errorMessage: '',
        }));
        const data = await getSerialCast(serialId);
        setActors(data.cast);
      } catch (error) {
        setError(prevState => ({
          ...prevState,
          isError: true,
          errorMessage: error.message,
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [serialId]);

  return (
    <>
      <Title>Актори у головних ролях</Title>
      {!isLoading && Array.isArray(actors) && actors?.length > 0 && (
        <SerialCastList actors={actors} />
      )}
      {isLoading && <Loader />}
      {error.isError && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
      {actors?.length === 0 && <Title>Інформація не знайдена</Title>}
    </>
  );
};

export default SerialCast;
