import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store';
import { Button } from 'antd';

function Dogs({ fetching, getRandomDogs, randomDogs }) {
   // fetch some random dogs when component mounts for first time of app session
   useEffect(function() {
      if (!randomDogs.length) {
         getRandomDogs(20);
      }
   }, []);

   return (
      <div
         style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            padding: '10px 20px'
         }}>
         <h1 style={{ margin: '20px' }}>Check out these random dogs!</h1>
         <div
            style={{
               justifyContent: 'center',
               display: 'flex',
               flexWrap: 'wrap',
               padding: '10px 20px'
            }}>
            {randomDogs.map((dog, i) => {
               return <img key={i} src={dog} alt="logo" className={'dogImage'} style={{ width: 200 }} />;
            })}
         </div>
         <Button style={{ marginTop: 20 }} loading={fetching} onClick={() => getRandomDogs(10)}>
            Load more dogs
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
      getRandomDogs: count => dispatch(Actions.getRandomDogs.request(count))
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Dogs);
