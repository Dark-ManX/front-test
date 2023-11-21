import { useState, useEffect } from "react";
import { useCountStore } from "../../zustand/store";
import "./App.css";
import CurrenciesPage from "../../pages/CurrenciesPage";
import ErrorPage from "../../pages/ErrorPage";

const errorAfterLoads = 4;

function App(): JSX.Element {
  const store = useCountStore(
    (state: {
      count: number;
      increase: (arg: number) => void;
      reset: () => void;
    }) => state
  );

  const { count, increase, reset } = store;

  const [counter, setCounter] = useState(count);

  useEffect(() => {
    saveCountToStorage(1);
    function saveCountToStorage(arg: number) {
      if (counter >= errorAfterLoads) {
        reset();
        return;
      }
      increase(arg);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">Converter</header>
      <main>
        {counter !== errorAfterLoads ? (
          <CurrenciesPage data-testid="currenciesPage" />
        ) : (
          <ErrorPage data-testid="errorPage" />
        )}
      </main>
      <footer className="App-header">Footer</footer>
    </div>
  );
}

export default App;
