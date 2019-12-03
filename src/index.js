import { useCallback, useEffect, useRef, useMemo } from 'react';
import { createPortal, findDOMNode } from 'react-dom';

function Portal({ portalId, bindTo }) {
  // portalRef
  const portal = useRef(document.createElement('div'));

  // set id to the portal
  if (portalId) {
    portal.current.setAttribute('id', portalId);
  }

  // get the el that portal will be mounted to
  const elToMountTo = useMemo(() => {
    return (bindTo && findDOMNode(bindTo)) || document.body;
  }, [bindTo]);

  // append the portal to elToMountTo
  useEffect(() => {
    elToMountTo.appendChild(portal.current);
    return () => {
      elToMountTo.removeChild(portal.current);
    };
  }, [portal, elToMountTo]);

  const Portal = useCallback(
    ({ children }) => {
      if (portal.current != null) return createPortal(children, portal.current);
      return null;
    },
    [portal]
  );

  return Portal;
}

export default Portal;
