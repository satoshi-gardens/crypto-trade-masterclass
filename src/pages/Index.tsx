
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Home from "./Home";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a language preference in URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');
    
    if (lang === 'de') {
      // Set German language preference if specified
      localStorage.setItem('preferredLanguage', 'de');
    }
    
    // You could redirect to language-specific routes here if implemented
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Krypto-Trading Kurse Schweiz & Deutschland | Dr. Michael Kiberu</title>
        <meta name="description" content="Premium Kryptowährungs-Handelskurse in der Schweiz und Deutschland. Lernen Sie fortgeschrittene Trading-Strategien von Dr. Michael Kiberu und werden Sie ein erfolgreicher Krypto-Trader." />
        <meta name="keywords" content="Krypto-Trading Kurs, Cryptocurrency Ausbildung, Bitcoin Trading lernen, Blockchain-Kurse Schweiz, Krypto-Coach Deutschland, Ethereum Handel, Dr. Michael Kiberu" />
        <link rel="canonical" href="https://cryptocourse.bit2big.com/" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Home />
    </>
  );
};

export default Index;
