import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  SearchFormButton,
  SearchFormInput,
  Searchbar,
} from './SearchBar.styled';

//Hook
const SearchBar = props => {
  const { onSubmit } = props;

  const [value, setValue] = useState('');

  const heandleChange = ({ target }) => {
    const { value } = target;
    setValue(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (value.trim() === '') {
      return;
    }
    setValue(value);

    return onSubmit(value);
  };

  return (
    <Searchbar className="searchbar">
      <Form className="form" onSubmit={handleSubmit}>
        <SearchFormButton type="submit" className="button">
          <span className="button-label">Search</span>
        </SearchFormButton>

        <SearchFormInput
          className="input"
          type="text"
          placeholder="Search images and photos"
          value={value}
          onChange={heandleChange}
        />
      </Form>
    </Searchbar>
  );
};

//Class
// class SearchBar extends React.Component {
//   state = {
//     value: '',
//   };

//   heandleChange = ({ target }) => {
//     const { value } = target;
//     this.setState({ value: value });
//   };

//   handleSubmit = evt => {
//     evt.preventDefault();
//     const { value } = this.state;
//     if (value.trim() === '') {
//       return;
//     }
//     this.props.onSubmit(value);
//   };

//   render() {
//     return (
//       <Searchbar className="searchbar">
//         <Form className="form" onSubmit={this.handleSubmit}>
//           <SearchFormButton type="submit" className="button">
//             <span className="button-label">Search</span>
//           </SearchFormButton>

//           <SearchFormInput
//             className="input"
//             type="text"
//             placeholder="Search images and photos"
//             value={this.state.value}
//             onChange={this.heandleChange}
//           />
//         </Form>
//       </Searchbar>
//     );
//   }
// }

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
