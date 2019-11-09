import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store';
import { Link } from 'react-router-dom';
import { RouteMap } from '../../routes';

function Breeds({ breeds, getBreeds }) {
   // fetch some random dogs when component mounts for first time of app session
   useEffect(function() {
      if (!breeds.length) {
         getBreeds();
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
         <h1 style={{ margin: '20px' }}>Select a breed to see dogs</h1>
         <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 500 }}>
            {breeds.map((breed, i) => {
               return (
                  <Link style={{ margin: '5px 10px' }} key={i} to={`${RouteMap.DOGS_BREEDS}/${breed}`}>
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

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Breeds);
