const { useState } = React;

function TodoApp() {

  // Store all tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn React Hooks",
      completed: false
    },
    {
      id: 2,
      title: "Build a Todo App",
      completed: true
    }
  ]);

  // Input value
  const [input, setInput] = useState("");

  // Editing task ID
  const [editingId, setEditingId] = useState(null);

  // Editing text
  const [editingText, setEditingText] = useState("");


  // ==========================
  // ADD TASK
  // ==========================

  const addTask = (event) => {

    event.preventDefault();

    const title = input.trim();

    if (!title) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title,
      completed: false
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask
    ]);

    setInput("");
  };


  // ==========================
  // COMPLETE / UNCOMPLETE
  // ==========================

  const toggleTask = (id) => {

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed
            }
          : task
      )
    );
  };


  // ==========================
  // START EDITING
  // ==========================

  const startEditing = (task) => {

    setEditingId(task.id);

    setEditingText(task.title);
  };


  // ==========================
  // SAVE EDIT
  // ==========================

  const saveEdit = (id) => {

    const title = editingText.trim();

    if (!title) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: title
            }
          : task
      )
    );

    setEditingId(null);

    setEditingText("");
  };


  // ==========================
  // DELETE TASK
  // ==========================

  const deleteTask = (id) => {

    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== id
      )
    );

    if (editingId === id) {

      setEditingId(null);

      setEditingText("");
    }
  };


  // ==========================
  // COUNTS
  // ==========================

  const completedCount =
    tasks.filter(
      (task) => task.completed
    ).length;

  const remainingCount =
    tasks.length - completedCount;


  // ==========================
  // UI
  // ==========================

  return (

    <div className="app-shell">

      <main className="todo-card">


        {/* HEADER */}

        <header className="todo-header">

          <div>

            <p className="eyebrow">
              React.js Project
            </p>

            <h1>
              My Todo List
            </h1>

            <p className="subtitle">
              A simple task manager built with React Hooks.
            </p>

          </div>


          <div className="stats">

            <strong>
              {completedCount}
            </strong>

            <span>
              Completed
            </span>

          </div>

        </header>



        {/* ADD TASK */}

        <form
          className="add-form"
          onSubmit={addTask}
        >

          <input
            type="text"
            placeholder="What do you need to do?"
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
          />

          <button type="submit">
            + Add Task
          </button>

        </form>



        {/* TASK SECTION */}

        <section className="task-section">


          <div className="section-heading">

            <h2>
              Tasks
            </h2>

            <span>
              {tasks.length} total
            </span>

          </div>



          {/* EMPTY STATE */}

          {tasks.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                ✓
              </div>

              <h3>
                No tasks yet
              </h3>

              <p>
                Add your first task above to get started.
              </p>

            </div>

          ) : (


            /* TASK LIST */

            <div className="task-list">

              {tasks.map((task) => (

                <article
                  className={
                    `task-item ${
                      task.completed
                        ? "completed"
                        : ""
                    }`
                  }
                  key={task.id}
                >


                  {/* CHECK BUTTON */}

                  <button
                    className="check-button"
                    onClick={() =>
                      toggleTask(task.id)
                    }
                  >
                    {task.completed
                      ? "✓"
                      : ""
                    }
                  </button>



                  {/* EDIT MODE */}

                  {editingId === task.id ? (

                    <div className="edit-area">

                      <input
                        autoFocus
                        value={editingText}
                        onChange={(event) =>
                          setEditingText(
                            event.target.value
                          )
                        }
                        onKeyDown={(event) => {

                          if (
                            event.key === "Enter"
                          ) {
                            saveEdit(task.id);
                          }

                          if (
                            event.key === "Escape"
                          ) {

                            setEditingId(null);

                            setEditingText("");
                          }

                        }}
                      />


                      <button
                        type="button"
                        className="save-button"
                        onClick={() =>
                          saveEdit(task.id)
                        }
                      >
                        Save
                      </button>

                    </div>


                  ) : (


                    /* NORMAL MODE */

                    <div className="task-content">

                      <span className="task-title">
                        {task.title}
                      </span>

                      <span className="task-status">

                        {task.completed
                          ? "Completed"
                          : "In progress"
                        }

                      </span>

                    </div>

                  )}



                  {/* EDIT + DELETE */}

                  {editingId !== task.id && (

                    <div className="task-actions">


                      <button
                        type="button"
                        className="action-button edit"
                        onClick={() =>
                          startEditing(task)
                        }
                      >
                        Edit
                      </button>


                      <button
                        type="button"
                        className="action-button delete"
                        onClick={() =>
                          deleteTask(task.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  )}

                </article>

              ))}

            </div>

          )}

        </section>



        {/* FOOTER */}

        <footer className="todo-footer">

          <span>
            {remainingCount} remaining
          </span>

          <span>
            Built with React useState
          </span>

        </footer>

      </main>

    </div>
  );
}


// Render React application

ReactDOM
  .createRoot(
    document.getElementById("root")
  )
  .render(<TodoApp />);