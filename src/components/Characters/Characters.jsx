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

  return (
    <div>
      <Nav />

<div className="characters">
      <div className="bigbox">
        <div className="characterBox">
          <h2>Characters</h2>

          {characters.map((character) => {
            return (
              <div key={character.id}>
                <CharacterItem character={character} />
              </div>
            );
          })}
        </div>
   

      {/* <div className="starterOneHeader">
        <h2>Starter 1</h2>
      </div> */}

      {/* <div className="starterTwoHeader">
        <h2>{starter.length < 2 ? "" : "Starter 2"}</h2>
      </div> */}

      <div className="starterCharacterView">
        {starter.map((start) => {
          return (
            <div key={start.id}>
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
