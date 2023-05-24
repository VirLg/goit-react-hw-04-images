import { ButtonCss } from './Button.styled';

const Button = function (props) {
  return (
    <>
      <ButtonCss type="button" onClick={props.page}>
        Load More
      </ButtonCss>
    </>
  );
};

export default Button;
