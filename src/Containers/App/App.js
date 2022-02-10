import React, { useState, useRef, useEffect } from "react";
import classes from "./App.module.css";
import Task from "../../Components/Task/Task";
import axios from "../../axios-firebase";

function App() {
  // States
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // useEffect
  useEffect(() => {
    taskInput.current.focus();
    fetTask();
    return () => {
      console.log("(didUnmount)");
    };
  }, []);

  // Fonctions

  //delete
  const removeClickedHandler = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    axios
      .delete("/aufgaben/" + tasks[index].id + ".json")
      .then((response) => {
        console.log(response);
        // fetTask();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const doneClickedHandler = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !tasks[index].done;
    setTasks(newTasks);

    axios
      .put("/aufgaben/" + tasks[index].id + ".json", tasks[index])
      .then((response) => {
        console.log(response);
        // fetTask();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submittedTaskHandler = (event) => {
    event.preventDefault();

    const newTask = {
      content: input,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");

    axios
      .post("/aufgaben.json", newTask)
      .then((response) => {
        console.log(response);
        fetTask();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changedFormHandler = (event) => {
    setInput(event.target.value);

    // const doto = {
    //   aufgabe: "html und css lernen",
    // };

    //   axios
    //     .post("/aufgaben.json", doto)
    //     .then((response) => {
    //       console.log(response);
    //       fetTask();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
  };
  //daten holen
  const fetTask = () => {
    axios
      .get("/aufgaben.json")
      .then((response) => {
        const taskArray = [];
        for (const key in response.data) {
          taskArray.push({
            ...response.data[key],
            id: key,
          });
        }
        setTasks(taskArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Variables
  let tasksDisplayed = tasks.map((task, index) => (
    <Task
      done={task.done}
      content={task.content}
      key={index}
      removeClicked={() => removeClickedHandler(index)}
      doneClicked={() => doneClickedHandler(index)}
    />
  ));
  // let donedTasks = tasks.filter(task => task.done)
  //   .map((filteredTask, index) => (
  //     <Task
  //       done={filteredTask.done}
  //       content={filteredTask.content}
  //       key={index}
  //       removeClicked={() => removeClickedHandler(index)}
  //       doneClicked={() => doneClickedHandler(index)}
  //     />
  // ));

  //Ref
  const taskInput = useRef("");
  console.log(taskInput);

  return (
    <div className={classes.App}>
      <header>
        <span>TO-DO</span>
      </header>

      <div className={classes.add}>
        <form onSubmit={(e) => submittedTaskHandler(e)}>
          <input
            ref={taskInput}
            type="text"
            value={input}
            onChange={(e) => changedFormHandler(e)}
            placeholder="was wollen Sie hinfügen ?"
          />
          <button type="submit">Hinzufügen</button>
        </form>
      </div>

      {tasksDisplayed}
    </div>
  );
}

export default App;
