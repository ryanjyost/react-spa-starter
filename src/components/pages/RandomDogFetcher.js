import React from 'react';
import logo from '../../assets/images/logo.svg';
import { connect } from 'react-redux';
import { Actions } from '../../store';
import { Button } from 'antd';

function RandomDogFetcher({ fetching, dog, getRandomDogs }) {
   return (
      <div style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', display: 'flex' }}>
         <img src={dog || logo} alt="logo" style={{ width: 300 }} />
         <h3 style={{ marginTop: 20 }}>
            {dog ? `Click the button to get another dog image` : `Replace the React logo with a dog image!`}
         </h3>
         <Button loading={fetching} type="primary" size={'large'} onClick={() => getRandomDogs()}>
            Fetch random dog
         </Button>
      </div>
   );
}

const mapStateToProps = state => {
   return {
      ...state.dogs
   };
};

const mapDispatchToProps = dispatch => {
   return {
      getRandomDogs: () => dispatch(Actions.getRandomDogs.request())
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(RandomDogFetcher);
