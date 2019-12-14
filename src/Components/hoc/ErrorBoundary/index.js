import React from 'react';
import PropTypes from 'prop-types';

/**
 * Render an error instead of the component when exception caught
 */
export default class ErrorBoundary extends React.Component {
   constructor(props) {
      super(props);
      this.state = { hasError: false };
   }

   componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true });

      // log helpful debugging info
      console.info('Error Component Stack', info.componentStack);
   }

   render() {
      if (this.state.hasError) {
         // render any custom fallback UI
         if (this.props.renderError) {
            return this.props.renderError();
         }

         // if nothing given to renderError prop, just don't show anything, fail gracefully
         return null;
      }

      // no error, render wrapped Components
      return this.props.children;
   }
}

ErrorBoundary.propTypes = {
   /** Component to wrap with ErrorBoundary */
   children: PropTypes.node.isRequired,
   /** Custom thing to render when an error */
   renderError: PropTypes.func
};

/**
 * An HOC that provides an error boundary
 * https://reactjs.org/docs/error-boundaries.html
 * @param {ReactComponent} Component - Component getting wrapped
 * @param {ReactComponent} ErrorComponent - Component or render function to show
 * @return {ReactComponent}
 */
export function withErrorBoundary(Component, ErrorComponent) {
   return class extends React.Component {
      render() {
         return (
            <ErrorBoundary renderError={() => <ErrorComponent />}>
               <Component {...this.props} />
            </ErrorBoundary>
         );
      }
   };
}
