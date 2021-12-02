import { useEffect, useState } from 'react';
import LoadingScreen from './pages/LoadingScreen/LoadingScreen';
import RouterPage from './routes/Router';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);
  return <>{isLoading ? <LoadingScreen /> : <RouterPage />}</>;
}

export default App;
