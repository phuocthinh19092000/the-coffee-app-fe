import { useEffect, useState } from 'react';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import RouterPage from './routes/Router';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return <>{isLoading ? <SplashScreen /> : <RouterPage />}</>;
}

export default App;
