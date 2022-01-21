import { useEffect, useState } from 'react';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import RouterPage from './routes/Router';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const timeOutSplashScreen = 2000;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, timeOutSplashScreen);
  }, []);

  return <>{isLoading ? <SplashScreen /> : <RouterPage />}</>;
}

export default App;
