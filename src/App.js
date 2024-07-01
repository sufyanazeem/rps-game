import { useEffect, useState } from "react";
import rock from "./img/rock.png";
import paper from "./img/paper.png";
import scissors from "./img/scissors.png";
import loading from "./img/loading.gif";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Home() {
  const [selected, setSelected] = useState("Pick");
  const [cpuSelected, setCpuSelected] = useState("Pick");
  const [randNum, setRandNum] = useState(0);
  const cpu = ["Rock", "Paper", "Scissors"];
  const [ready, setReady] = useState(false);
  const [showResult, setShowResult] = useState(0);
  const [load, setLoad] = useState(false);

  const MySwal = withReactContent(Swal);

  function MyButton(props) {
    return (
<button
  type="button"
  onClick={() => clicked(props.selected)}
  className={`mx-auto w-40 border border-gray-200 rounded-lg shadow focus:outline-none dark:border-gray-700 ${
    props.ready === false ? "" : "hover:bg-red-500 dark:hover:bg-red-700"
  }`}
  disabled={props.ready === false ? true : false}
  style={{
    backgroundColor: "transparent", // Make the background transparent
    padding: "0.5rem", // Reduce padding
  }}
>
  <img
    src={props.img}
    className="w-16 mx-auto transform -scale-x-100"
    alt="imgBtn"
  />
  <h5 className="mb-1 text-xl sm:text-sm font-bold tracking-tight text-white-900 dark:text-white">
    {props.name}
  </h5>
</button>



    );
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function clicked(name) {
    setLoad(true);

    setTimeout(function () {
      setLoad(false);
      setSelected(name);
      let rand = getRandomInt(3);
      if (rand != randNum) {
        setRandNum(rand);
        setCpuSelected(cpu[rand]);
      } else {
        setRandNum(getRandomInt(3));
        setCpuSelected(cpu[getRandomInt(3)]);
      }
    }, 3500);

    setTimeout(function () {
      setShowResult(showResult + 1);
    }, 3600);

  }

  function renderImg(selected, flip) {
    if (selected == "Rock")
      return (
        <img
          src={rock}
          className={`w-40 mx-auto ${flip ? "transform -scale-x-100" : ""}`}
          alt="rock"
        />
      );
    if (selected == "Paper")
      return (
        <img
          src={paper}
          className={`w-40 mx-auto ${flip ? "transform -scale-x-100" : ""}`}
          alt="paper"
        />
      );
    if (selected == "Scissors")
      return (
        <img
          src={scissors}
          className={`w-40 mx-auto ${flip ? "transform -scale-x-100" : ""}`}
          alt="scissors"
        />
      );
    else
      return (
        <img
          src={loading}
          className="w-40 mx-auto"
          priority
          alt="loader"
        />
      );
  }

  function ifReady(ready) {
    if (ready == false) {
      return (
        <div
        type="button"
        className="mx-auto w-60 py-2 pb-4 cursor-pointer border border-red-600 border-1 rounded-lg hover:bg-red-600 hover:border-red-700 hover:text-white"
        onClick={() => {
          setReady(true);
        }}
      >
        <h1 className="text-center lg:text-6xl font-bold tracking-tight text-white-900 dark:text-white">
          READY
        </h1>
      </div>
      
      
      
      
      );
    } else {
    }
  }

  function alert(title){
    MySwal.fire({
      title: title,
      showConfirmButton: false,
      timer: 1500
    });
  }

  useEffect(() => {
    if (showResult > 0) {
      if (selected != cpuSelected) {
        if (selected == "Rock") {
          if (cpuSelected == "Scissors") {
            alert('You Won!!')
          }
          if (cpuSelected == "Paper") {
            alert('You Lost!!')
          }
        }
        if (selected == "Paper") {
          if (cpuSelected == "Scissors") {
            alert('You Lost!!')
          }
          if (cpuSelected == "Rock") {
            alert('You Won!!')
          }
        }
        if (selected == "Scissors") {
          if (cpuSelected == "Paper") {
            alert('You Won!!')
          }
          if (cpuSelected == "Rock") {
            alert('You Lost!!')
          }
        }
      } else {
        alert('Draw!!')
      }
    }
  }, [showResult])


  function Arena(props) {
    if (load) {
      return (
        <div className="text-center flex justify-center basis-1/2 mx-auto animate-bounce">
          <div>
            <h1 className="text-center border border-green-400 text-green-400">
              You
            </h1>
            {renderImg("Rock", true)}
          </div>
          <h1 className="text-2xl font-bold flex items-center">VS</h1>
          <div>
            <h1 className="text-center border border-red-600 text-red-600">
              CPU
            </h1>
            {renderImg("Rock", false)}
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center flex justify-center basis-1/2 mx-auto">
          <div className="mx-auto">
            <h1 className="text-center border border-green-400 text-green-400">
              You
            </h1>
            {renderImg(props.selected, true)}
          </div>
          <h1 className="text-2xl font-bold flex items-center">VS</h1>
          <div className="mx-auto">
            <h1 className="text-center border border-red-600 text-red-600">
              CPU
            </h1>
            {renderImg(props.cpuSelected, false)}
          </div>
        </div>
      );
    }
  }

  return (
    <>
      {console.log(showResult)}
      <main
        className="bg-black text-white "
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
<div
  className="mx-auto py-2 pb-4 cursor-pointer border border-red-600 border-1 rounded hover:border-red-700 hover:text-white"
  onClick={() => {
    setReady(true);
  }}
>
  <h1 className="text-center lg:text-6xl font-bold tracking-tight text-white-900 dark:text-white">
    {ready == true ? "ROCK PAPER SCISSORS" : "CLICK READY TO PLAY"}
  </h1>
</div>




        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="flex row my-10">
          <Arena selected={selected} cpuSelected={cpuSelected} load={load} />
        </div>
<br></br>
<br></br>
<br></br>
        <div className="flex flex-row my-5">
          <MyButton selected={"Rock"} img={rock} name="ROCK" ready={ready} />

          <MyButton selected={"Paper"} img={paper} name="PAPER" ready={ready} />

          <MyButton
            selected={"Scissors"}
            img={scissors}
            name="SCISSORS"
            ready={ready}
          />
        </div>
<br></br>
<br></br>
<br></br>
        {ifReady(ready)}
      </main>
    </>
  );
}
