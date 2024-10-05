import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import { Button, notification } from 'antd';
import { getCharacters } from './utils.js';
import Character from './components/Character.jsx';


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

  const addCharacter = useCallback(() => {
    setCharacters(prevCharacters => {
      return [...prevCharacters, {
        title: `Character ${prevCharacters.length + 1}`,
        id: prevCharacters.length + 1,
        attributes: {
          Strength: {
            points: 10
          },
          Dexterity: {
            points: 10
          },
          Constitution: {
            points: 10
          },
          Intelligence: {
            points: 10
          },
          Wisdom: {
            points: 10
          },
          Charisma: {
            points: 10
          }
        },
        skillPoints: {
          Acrobatics: 0,
          "Animal Handling": 0,
          Arcana: 0,
          Athletics: 0,
          Deception: 0,
          History: 0,
          Insight: 0,
          Intimidation: 0,
          Investigation: 0,
          Medicine: 0,
          Nature: 0,
          Perception: 0,
          Performance: 0,
          Persuasion: 0,
          Religion: 0,
          "Sleight of Hand": 0,
          Stealth: 0,
          Survival: 0
        }
      }]
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header py-5">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className='flex gap-3 justify-center py-5'>
          <Button onClick={addCharacter}>Add New Character</Button>
          <Button>Reset All Characters</Button>
          <Button>Save All Characters</Button>
        </div>

        <div className='flex flex-col gap-4 mt-5'>
          {characters.map((character, index) => (
            <Character key={index} character={character} />
          ))}
        </div>
      </section>
      {notificationContextHolder}
    </div>
  );
}

export default App;
