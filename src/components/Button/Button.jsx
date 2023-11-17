import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadButton } from './Button.styled';
import api from 'api/imageService';

export const Button = ({ onClick, page, query }) => {
  const handleClick = async e => {
    try {
      const images = await api.loadMoreImages(query, page);
      onClick(images);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <LoadButton type="button" onClick={handleClick}>
      Load more
    </LoadButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
};

export default Button;
