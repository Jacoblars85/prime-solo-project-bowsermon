import React, { useEffect } from "react";
import BackButton from "../BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import CharacterItem from "../CharacterItem/CharacterItem";
import "./Characters.css";
import Nav from "../Nav/Nav";
import StarterItem from "../StarterItem/StarterItem";

function Characters() {
  const dispatch = useDispatch();

  const characters = useSelector((store) => store.character.characters);
  const starter = useSelector((store) => store.character.starter);
  const user = useSelector((store) => store.user.userReducer);

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_CHARACTERS" });
  }, []);

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_IVENTORY" });
  }, []);

  return (
    <div>
      <Nav />

      <div className="characters">
        <h2>Characters</h2>
        <div className="bigCharacterBox">
          <div className="characterBox">
            {characters.map((character) => {
              return (
                <div key={character.id}>
                  <CharacterItem character={character} />
                </div>
              );
            })}
          </div>

          <div className="starterBox">
            {starter.map((start) => {
              return (
                <div key={start.id}>
                  <h2>Starter </h2>
                  <StarterItem start={start} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="backButton">
        <BackButton />
      </div>
    </div>
  );
}

export default Characters;
