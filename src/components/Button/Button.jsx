import { useState } from 'react';
import { ButtonCss } from './Button.styled';
// class Button extends Component{
// state={
//     page:2,
// }

// increment=()=>{
//     this.setState(()=>({
//         page:this.state.page +1,
//     }))
//     this.handleOnClick(this.state.page)
// }

// handleOnClick=()=>{

//     this.props.page(this.state.page)
// }

// render(){
//     return(
//         <>
//     <ButtonCss type="button" onClick={this.increment} >Load More</ButtonCss>
//     </>
//     )
// }
// }

const Button = function (props) {
  // const hadleLoadMore = () => {
  //   console.log();
  // };
  return (
    <>
      <ButtonCss type="button" onClick={props.page}>
        Load More
      </ButtonCss>
    </>
  );
};

export default Button;
