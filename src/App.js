import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { GetImages, generateRandom } from "./Fetch";
import { saveAs } from "file-saver";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CodeIcon from "@mui/icons-material/Code";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";

function App() {
  const [output, setOutput] = useState([]);
  const [show, setShow] = useState({ value: "none", image: "" });
  const [update, setUpdate] = useState(0);

  async function onClickImage(event, MID) {
    event.stopPropagation();
    output.forEach((data, index) => {
      if (data.id == MID) {
        saveAs(data.value, "image.jpg");
      }
    });
  }

  useEffect(() => {
    console.log("i'm running this in the begining");
    // if (output.length >= 30) return
    for (let b = 0; b < 15; b++) {
      GetImages()
        .then((res) => {
          // var binaryData = [];
          // binaryData.push(res);
          // const img = URL.createObjectURL(new Blob(binaryData));

          // const ImObj = { value: img, id: crypto.randomUUID(), omg: "anime"}
          const ImObj = {
            value: res,
            id: crypto.randomUUID(),
            omg: "anime",
            row: generateRandom(20, 40),
            col: generateRandom(10, 50),
          };
          setOutput((res) => {
            return [...res, ImObj];
          });
          // setOutput([...output, ImObj])
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(output.length)
    }
    console.log("i'm running this");
  }, [update]);
  useEffect(() => {
    const handleScroll = (event) => {
      console.log(document.documentElement.scrollHeight - 5);
      console.log(
        Math.floor(window.scrollY) + Math.floor(window.innerHeight) + 1
      );
      console.log(
        document.documentElement.scrollHeight - 5 <
          Math.floor(window.scrollY) + Math.floor(window.innerHeight) + 1
      );
      if (
        document.documentElement.scrollHeight - 30 <
        Math.floor(window.scrollY) + Math.floor(window.innerHeight) + 1
      ) {
        console.log("HEYEHYEHEYYEH NICEN IENCIEN KLSJDSAAKSJDLASHEHEHHHEHE");
        setUpdate(crypto.randomUUID());
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  function getImageFromID(imageID) {
    // output.forEach((data, index)=>{
    //   if (data.id == imageID) {
    //     console.log("I found the image!")
    //     return data.value;
    //   }
    // })
    output.map((data, index) => {
      if (data.id == imageID) {
        console.log("I found the image!");
        return data.value;
      }
    });
  }
  return (
    <>
      <Header>
        <AccountBalanceIcon />
        <ButtonFrame>Home</ButtonFrame>
        <ButtonFrame>Link</ButtonFrame>
        <ButtonFrame>About</ButtonFrame>
        <SearchFrame>
          {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
          <label>
            <svg data-testid="CodeIcon"></svg>
          </label>
          <input type="text" placeholder="search something dude" />
        </SearchFrame>
        <ButtonFrame>API</ButtonFrame>
        {/* <Slider
      defaultValue={30}
      sx={{
        width: 300,
        color: 'success.main',
      }}
    /> */}
        {/* <Fab variant="extended" size="small" color="primary">
  <NavigationIcon sx={{ mr: 1 }} />
  Twitter
</Fab> */}
      </Header>{" "}
      <br />
      <Info>
        {(() => {
          if (output.length <= 0) {
            console.log("I can't find any data");
            return (
              <Info>
                <h2>There is not any data yet.</h2>
                <CircularProgress />
              </Info>
            );
          } else {
            console.log(
              "the outout array has the: " + output.length + " items"
            );
            console.log("the item is: " + output[0]);
          }
        })()}
      </Info>
      <ShowImage
        status={show}
        onClick={(e) => setShow({ value: "none", image: "" })}
      >
        <img src={show.image} />
      </ShowImage>
      <MainFrame>
        {output.map((data, index) => {
          return (
            <Pin
              onClick={(e) => setShow({ value: "block", image: data.value })}
              key={data.id}
              row={data.row}
              col="3"
            >
              <caption>
                <button
                  onClick={(e) =>
                    onClickImage(e, data.id).then((data) => {
                      return data;
                    })
                  }
                >
                  Download
                </button>
              </caption>
              <img src={data.value} />
            </Pin>
          );
        })}
        {/* <Pin row="30" col="3">
        <img src="a.png" />

      </Pin>
      <Pin row="30" col="3">
        <img src="b.jpg" />
      </Pin>
      <Pin row="30" col="3">
      <img src="c.jpg" />
      </Pin>
      <Pin row="10" col="3">
      <img src="e.jpg" />
      </Pin>
      <Pin row="20" col="3">
      <img src="a.webp" />
      </Pin>
      <Pin row="20" col="3">
      <img src="a.gif" />
      </Pin> */}
      </MainFrame>
    </>
  );
}

export default App;

const ShowImage = styled.div.attrs((props) => ({ type: "text" }))`
  display: ${(props) => props.status.value}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
  img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 70%;
  }
`;

const MainFrame = styled.div`
  margin: 0;
  padding: 0;
  width: 98vw;
  // background-color: gray;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px); // 250 should be variable
  // grid-template-rows: repeat(auto-fill, 10%); // 250 should be variable // I commented this line, because it will adds some space on auto loading images
  grid-auto-rows: 10px;
  justify-content: center;
  // overflow-y: auto;
  // scrollbar-gutter: unset;
`;

const Pin = styled.div.attrs((props) => ({ type: "text" }))`
  margin: 10px;
  padding: 0;
  border-radius: 16px;
  // height: "200px"
  // width: 500px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
  background-color: rgba(255, 255, 255, 0.01);
  grid-row-end: span ${(props) => props.row}; // large should be variable
  grid-column-end: span ${(props) => props.col};
  // background-image: url("sample.png");
  // background-repeat: no-repeat;
  // background-size: cover;
  animation: BackMageAnim 3s linear;
  transition: all 0.3s;
  img {
    object-fit: cover;
    border-radius: 15px;
    width: 100%;
    height: 100%;
  }
  caption {
    position: absolute;
    // transform: translate(10%, 5%);
    // transform: translate(240%);
    color: white;
    font-size: 20px;
    display: none;
  }
  & button {
    position: relative;
    left: 270%;
    outline: 0;
    border-radius: 15px;
    padding: 7px;
    border: 1px solid black;
    background: inherit;
  }
  button:hover {
    background: black;
    color: white;
    transition: all 0.3s;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  &:hover {
    opacity: 50%;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
    transition: all 0.3s;
  }

  &:hover caption {
    display: block;
  }
`;

const caption = styled.div``;

const Info = styled.div`
  text-align: center;
  color: whitesmoke;
  font-family: monospace;
`;

const ButtonFrame = styled.div`
  align-items: center;
  background: inherit;
  background-size: 400%;
  // border: 1px solid pink;
  border-radius: 10px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: monospace;
  font-size: 17px;
  justify-content: center;
  line-height: 1.5em;
  max-width: 100%;
  min-width: 105px;
  padding: 3px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
  padding: 5px;
  // animation: test 10s linear infinite;
  transition: all 1s;

  &:active {
    border: 0;
    outline: 0;
  }
  &:hover {
    outline: 0;
    border: 0;
    outline: 0;
    transition: all 1s;
    background: linear-gradient(144deg, #af40ff, #1012f2 50%, #00ddeb);
  }
`;

const ColorFrame = styled.div`
  position: absolute;
  display: none;
  width: 10%;
  background: inherit;
  border: 1px solid pink;
  padding: 8px;
`;

const Header = styled.div`
  margin: 5px 10px 5px 15px;
  padding: 0;
  // text-align: center;
  color: whitesmoke;
  font-family: monospace;
  font-size: 15px;
  display: flex;
  // justify-content:center;
  align-items: center;
  gap: 30px;
`;
const SearchFrame = styled.div`
  input {
    outline: 0;
    padding: 10px;
    background: inherit;
    width: 300px;
    color: whitesmoke;
    border: 1px solid purple;
    border-radius: 10px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  }
  label {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translate(0, -50%);
  }
`;
