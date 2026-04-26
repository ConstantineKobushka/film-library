import { useEffect, useState } from 'react';

import { Outlet, useParams } from 'react-router-dom';

import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import SerialDetailsItem from '../../components/SerialDetailsItem/SerialDetailsItem';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';

import { getSerialById, getSerialTraler } from '../../api/moviesApi';

const SerialsDetailsPage = () => {
  const [serialDetails, setSerialDetails] = useState(null);
  const [trailerKey, setTreilerKey] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });
  const { serialId } = useParams();

  useEffect(() => {
    let isMounted = true;

    const fetchSerialsDetails = async () => {
      try {
        setIsLoading(true);
        setError({
          isError: false,
          errorMessage: '',
        });
        const [serialData, trailerData] = await Promise.all([
          getSerialById(serialId),
          getSerialTraler(serialId),
        ]);

        if (!isMounted) return;

        setSerialDetails(serialData);
        const key =
          trailerData?.results?.find(
            item => item.site === 'YouTube' && item.type === 'Trailer'
          )?.key ||
          trailerData?.results?.[0]?.key ||
          null;
        setTreilerKey(key);
      } catch (error) {
        if (!isMounted) return;

        setError({
          isError: true,
          errorMessage: error.message || 'Помилка завантаження',
        });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchSerialsDetails();

    return () => {
      isMounted = false;
    };
  }, [serialId]);

  return (
    <>
      <Section>
        <Container>
          {!isLoading && serialDetails && (
            <SerialDetailsItem
              serialDetails={serialDetails}
              trailerKey={trailerKey}
            />
          )}
          {isLoading && <Loader />}
          {error.isError && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
          <Outlet />
        </Container>
      </Section>
    </>
  );
};

export default SerialsDetailsPage;
