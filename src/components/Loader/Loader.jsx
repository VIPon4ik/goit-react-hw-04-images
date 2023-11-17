import { InfinitySpin } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderContainer>
      <InfinitySpin />
    </LoaderContainer>
  );
};

export default Loader;
