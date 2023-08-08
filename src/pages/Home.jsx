import React from 'react';
import Banner from '../components/Banner';
import Event from '../components/Event';
import Promo from '../components/Promo';
import Information from '../components/Infirmation';
import Vinotheque from '../components/Vinotheque';

function Home() {
  const [isMobile, setIsMobile] = React.useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Banner />
      {isMobile ? (
        <>
          <Promo />
          <Event />
        </>
      ) : (
        <>
          <Event />
          <Promo />
        </>
      )}
      <Information />
      <Vinotheque />
    </>
  );
}

export default Home;
