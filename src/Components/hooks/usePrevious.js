import { useEffect, useRef } from 'react';

/**
 * Provide previous value of a state variable for comparison purposes
 * @param value
 * @returns prevValue
 */
export default function usePrevious(value) {
   // The ref object is a generic container whose current property is mutable ...
   // ... and can hold any value, similar to an instance property on a class
   const ref = useRef();

   // Store current value in ref
   useEffect(() => {
      ref.current = value;
   }, [value]); // Only re-run if value changes

   // Return previous value (happens before update in useEffect above)
   return ref.current;
}
