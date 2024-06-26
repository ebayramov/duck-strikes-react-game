import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../containers/GameContainer";
import gameRepo from "../repositories/gameRepo";
import createMap from "../static/createamap.png";
import homeLogo from "../static/home.png";

const GameMenuDiv = styled.div.attrs((props) => ({
  style: {
    top: window.innerHeight/3,
    left: window.innerWidth/2.6,
  },
}))`
  position: fixed;
  background-color: rgb(120, 110, 190);
  height: 300px;
  width: 420px;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 50px;
  z-index : 3;
`;

const ContentDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2vh;
  margin-left: 2vh;
`;

const GameMenu = ({ myRef, executeScroll }) => {
  const { state, dispatch } = useContext(AppContext);

  const maps = state.mapList.map((mapObj) => {
    return (
      <option key={mapObj._id} value={mapObj._id}>
        {mapObj.name}
      </option>
    );
  });

  const handleMapSelection = (e) => {
    e.preventDefault();
    const newMap = gameRepo.getMapById(state.nextMapId)
    dispatch({ type: "LoadMap", res : newMap })
    setTimeout(function () {
      executeScroll(myRef);
    }, 50);
    dispatch({ type: "ToggleGameMenu" });
  };

  return (
    <GameMenuDiv position={state.playerPosition}>
      <h1>Change Map</h1>
      <form>
        <select
          onChange={(e) =>
            dispatch({ type: "PreLoadNextMap", map: e.target.value })
          }
          name=""
          id=""
        >
          <option value=""></option>
          {maps.length ? maps : null}
        </select>
      </form>
      <p
        onClick={handleMapSelection}
        style={{
          backgroundColor: "rgb(100,0,255)",
          width: "25%",
          marginLeft: "37.5%",
          borderRadius: "10px",
        }}
      >
        Load Map
      </p>
      <hr />
      <ContentDiv>
        <div>

          <a href="https://ebayramov.github.io/duck-strikes-react-game/">
            <img
              src={homeLogo}
              height={120}
              width={120}
              style={{
                backgroundColor: "rgb(20, 20, 20)",
                borderRadius: "20px",
              }}
              />
              </a>
        </div>

        <div>
        <Link to="/levelmaker" onClick={()=>setTimeout(function () {window.location.reload()},50)}>
            <img
              src={createMap}
              height={120}
              style={{
                backgroundColor: "rgb(20, 20, 20)",
                borderRadius: "20px",
              }}
            />
          </Link>
        </div>
      </ContentDiv>
    </GameMenuDiv>
  );
};

export default GameMenu;
