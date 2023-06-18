import {fetchApiData} from '../../features/fakeAPI';
import {useAppDispatch, useAppSelector} from '../storeHook';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// eslint-disable-next-line react-hooks/rules-of-hooks
const useFakeAPI = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data, loading, error} = useAppSelector(state => state.myAPI);
  const dispatch = useAppDispatch();
  console.log({data});
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    dispatch(fetchApiData());
  }, [dispatch]);

  return {
    data,
    loading,
    error,
  };
};
export default useFakeAPI;
