import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../../Store';
import { Link } from 'react-router-dom';
import { RouteMap } from '../../../Routes';
import style from './breeds.module.scss';

function Breeds({ breeds, getBreeds }) {
   // fetch some random dogs when component mounts for first time of app session
   useEffect(function() {
      if (!breeds.length) {
         getBreeds();
      }
   }, []);

   return (
      <div className={style.container}>
         <h1 className={style.h1}>Select a breed to see dogs</h1>
         <div className={style.linkContainer}>
            {breeds.map((breed, i) => {
               return (
                  <Link className={style.Link} key={i} to={`${RouteMap.DOGS_BREEDS}/${breed}`}>
                     {breed}
                  </Link>
               );
            })}
         </div>
      </div>
   );
}

const mapStateToProps = state => {
   return {
      ...state.dogs
   };
};

const mapDispatchToProps = dispatch => {
   return { getBreeds: () => dispatch(Actions.getBreeds.request()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
