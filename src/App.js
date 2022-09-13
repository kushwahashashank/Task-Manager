import React, { useState, useEffect } from "react";
import "./App.css";
import { BsPlusLg, BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
function App() {
  function getdata() {
    const locallist = localStorage.getItem("todoList");
    if (locallist) {
      return JSON.parse(locallist);
    } else {
      return [];
    }
  }
  const [textinput, setTextinput] = useState();
  const [todolist, setTodolist] = useState(getdata());

  const [toggle, setToggle] = useState(false);
  const [editid, setEditid] = useState("");

  function setList() {
    console.log(toggle);
    if (textinput.length > 0 && toggle === false) {
      setTodolist([...todolist, textinput]);
    } else if (textinput.length > 0 && toggle === true) {
      for (var i = 0; i < todolist.length; i++) {
        if (editid === todolist[i]) {
          todolist[i] = textinput;
          localStorage.setItem("todoList", JSON.stringify(todolist));
        }
      }
    }
    setTextinput("");
    setToggle(false);
  }

  function deletetask(e) {
    const newlist = todolist.filter((item) => {
      console.log(typeof item);
      return item !== e;
    });
    setTodolist(newlist);
    console.log(typeof e);
  }
  // console.log(todolist);
  function edittask(e) {
    const temp = todolist.filter((item) => {
      return item === e;
    });
    setEditid(e);
    setToggle(true);
    setTextinput(temp);
  }

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todolist));
  }, [todolist]);

  return (
    <>
      <div className="canvas">
        <h2
          style={{
            paddingBottom: "2rem",
            fontSize: "2rem",
            color: "#F1A661",
          }}
        >
          Tasks To Do
        </h2>
        <div className="form">
          <div className="form_input">
            <input
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setList();
                }
              }}
              className="textInput"
              type="text"
              placeholder="Enter The Task"
              value={textinput}
              onChange={(e) => {
                setTextinput(e.target.value);
                console.log(textinput);
              }}
            />
            {toggle ? (
              <FiEdit onClick={setList} />
            ) : (
              <BsPlusLg onClick={setList} />
            )}
          </div>

          <div className="tasks">
            {todolist.map((item, index) => {
              return (
                <div key={index} className="form_input">
                  <p>{JSON.stringify(index + 1) + ".)  " + item}</p>
                  <div>
                    <FiEdit onClick={() => edittask(item)} />
                    <BsTrash
                      style={{ paddingLeft: "1rem" }}
                      onClick={() => deletetask(item)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
