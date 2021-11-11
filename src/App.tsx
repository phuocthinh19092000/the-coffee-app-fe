import logo from './logo.svg';
import './App.scss';
import Header from './pages/Header/Header';
import ListDrinkItem from './components/ListDrinkItem/list-drink-item';
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
    <Header/>
    <ListDrinkItem/>
    </>
  );
}

export default App;
