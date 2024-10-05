import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import { notification } from 'antd';
import { getCharacters } from './utils.js';


function App() {
  const [notificationApi, notificationContextHolder] = notification.useNotification();
  const [characters, setCharacters] = useState([]);

  const fetchCharacters = useCallback(async () => {
    try {
      const characters = await getCharacters();
      console.log("characters", characters);
      setCharacters(characters);
    } catch (err) {
      console.log(err);
      notificationApi.error({
        message: "Something went wrong while fetching characters",
        type: "error"
      });
    }
  }, [notificationApi]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">

      </section>
      {notificationContextHolder}
    </div>
  );
}

export default App;
