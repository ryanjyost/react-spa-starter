import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Actions } from 'Store';
import { RouteMap } from 'Routes';
import style from './breeds.module.scss';

/**
 * Show links to breed detail pages
 */
function Breeds(props) {
   const { breeds, getBreeds } = props;
   /**
    * Fetch breeds the first time visiting this page
    */
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

Breeds.propTypes = {
   /** list of breeds */
   breeds: PropTypes.array,
   /** get list of breeds */
   getBreeds: PropTypes.func
};
