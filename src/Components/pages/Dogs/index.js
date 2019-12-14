import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { Actions } from 'Store';
import style from './dogs.module.scss';

/**
 * Just an index page that shows pictures of random dogs
 */
function Dogs(props) {
   const { fetching, getRandomDogs, randomDogs } = props;
   /**
    * Fetch some random dogs when component mounts for first time of app session
    */
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

Dogs.propTypes = {
   /** list of random dog images */
   randomDogs: PropTypes.array,
   /** fetch random dogs */
   getRandomDogs: PropTypes.func,
   /** are dogs being fetched? */
   fetching: PropTypes.bool
};
