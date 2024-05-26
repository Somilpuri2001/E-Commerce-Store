import { useLocation } from 'react-router-dom';

function ScrollToTop({ children }) {
  const location = useLocation();

  const handleScrollToTop = () => {
    window.scrollTo(0, 0); 
  };


  if (location.pathname !== '/') {
    handleScrollToTop();
  }

  return children;
}

export default ScrollToTop;
