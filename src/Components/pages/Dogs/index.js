import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../../Store';
import { Button } from 'antd';
import style from './dogs.module.scss';

function Dogs({ fetching, getRandomDogs, randomDogs }) {
   // fetch some random dogs when component mounts for first time of app session
   useEffect(function() {
      if (!randomDogs.length) {
         getRandomDogs(20);
      }
   }, []);

   return (
      <div className={style.container}>
         <h1 className={style.h1}>Check out these random dogs!</h1>
         <div className={style.imagesContainer}>
            {randomDogs.map((dog, i) => {
               return <img key={i} src={dog} alt="logo" className={'dogImage'} style={{ width: 200 }} />;
            })}
         </div>
         <Button className={style.Button} loading={fetching} onClick={() => getRandomDogs(10)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dogs);
