import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';

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
      <div
         style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            padding: '10px 20px'
         }}>
         <h1 style={{ margin: '20px' }}>Check out these {breed} dogs!</h1>
         {dogs && (
            <div
               style={{
                  justifyContent: 'center',
                  display: 'flex',
                  flexWrap: 'wrap',
                  padding: '10px 20px'
               }}>
               {dogs.map((dog, i) => {
                  return <img key={i} src={dog} alt="logo" style={{ width: 200 }} />;
               })}
            </div>
         )}
         <Button style={{ marginTop: 20 }} loading={fetching} onClick={() => getDogsByBreed(breed, 10)}>
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

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withRouter(BreedDetails));
