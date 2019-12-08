import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../../Store';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import style from './breedDetails.module.scss';

function BreedDetails({ breedDetailsDogs, getDogsByBreed, match, fetching }) {
   const { breed } = match.params;
   const dogs = breedDetailsDogs[breed];

   // fetch some random dogs when component mounts for first time of app session
   useEffect(function() {
      if (!dogs) {
         getDogsByBreed(breed, 20);
      }
   }, []);

   return (
      <div className={style.container}>
         <h1 className={style.h1}>Check out these {breed} dogs!</h1>
         {dogs && (
            <div className={style.imageContainer}>
               {dogs.map((dog, i) => {
                  return <img key={i} src={dog} alt="logo" className={style.img} />;
               })}
            </div>
         )}
         <Button className={style.Button} loading={fetching} onClick={() => getDogsByBreed(breed, 10)}>
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
      getDogsByBreed: (breed, count) => dispatch(Actions.getDogsByBreed.request(breed, count))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BreedDetails));
