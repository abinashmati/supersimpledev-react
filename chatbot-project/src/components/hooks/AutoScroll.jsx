import { useEffect, useRef } from "react";

//custom hook will get the dependcies from outside .
// To use a function as a hook, the function name must start with "use".
function useAutoScroll(dependencies) {
  // It's highly recommend to rename this to something
  // more generic like containerRef. This will make the
  // code make more sense if we ever reuse this code in
  // other components.
  const containerRef = useRef(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [dependencies]);

  return containerRef; //as this ref will be used outside of this hook to store the html elelemnt
}
export default useAutoScroll;
