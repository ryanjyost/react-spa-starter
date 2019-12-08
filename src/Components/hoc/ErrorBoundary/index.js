import React from 'react';

// wrap this around some React and it will render an error rather than crash the app
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

// pass a component as an argument to this function before exporting to wrap it with an ErrorBoundary
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
