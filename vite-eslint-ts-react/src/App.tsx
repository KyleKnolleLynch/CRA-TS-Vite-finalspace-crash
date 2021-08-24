import React, { useState, useEffect, useRef } from 'react';
// Api
import { fetchCharacter } from './api';
// Components
import Card from './components/Card';
import Item from './components/Item';
// Types
import { Character } from './api';
// Context hook
import { useCharacterId } from './context';
// Styles
import { Wrapper } from './App.styles';

const App: React.FC = () => {
  const [character, setCharacter] = useState<Character>({} as Character);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { characterId, setCharacterId } = useCharacterId();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchFromApi = async () => {
      setIsLoading(true);
      const result = await fetchCharacter(characterId);
      setIsLoading(false);
      setCharacter(result);
    };

    fetchFromApi();
  }, [characterId]);

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log(e.currentTarget);
    setCharacterId(Number(inputRef.current?.value));
  };

  return (
    <Wrapper characterId={characterId}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Card
            name={character.name}
            imgUrl={character.img_url}
            gender={character.gender}
          />
          <Item<typeof character> item={character} onClick={(item) => console.log(item.origin)} />
          <input type="text" ref={inputRef} />
          <button onClick={handleBtnClick}>Get Character</button>
        </>
      )}
    </Wrapper>
  );
};

export default App;
