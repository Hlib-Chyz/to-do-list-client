import { useEffect, useState } from "react";
import styles from "./ToDo.module.css";
import { INote } from "./ToDo.types";
import { addNote, deleteNote, getNotes, updateNote } from "./ToDoAPI";
import LoaderWrapper from "../../common/wrappers/LoaderWrapper";

function Todo() {
  const [tasks, setTasks] = useState<INote[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO - remove setTimeout
    setTimeout(() => {
      getTasks();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callApi = async (func: Function): Promise<void> => {
    try {
      setIsLoading(true);
      await func();
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = (): void => {
    if (newTask.trim() !== "") {
      callApi(async () => {
        await addNote(newTask);
        setTasks([...tasks, { _id: Date.now().toString(), title: newTask }]);
        setNewTask("");
      });
    }
  };

  const getTasks = (): void => {
    callApi(async () => {
      const data = await getNotes();
      setTasks(data);
      setNewTask("");
    });
  };

  const deleteTask = (taskId: string): void => {
    callApi(async () => {
      await deleteNote(taskId);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    });
  };

  const editTask = (taskId: string, title: string): void => {
    setEditingTaskId(taskId);
    setNewTitle(title);
  };

  const saveTask = (): void => {
    callApi(async () => {
      await updateNote(editingTaskId!, newTitle);
      const updatedTasks = tasks.map((task) =>
        task._id === editingTaskId ? { ...task, title: newTitle } : task
      );
      setTasks(updatedTasks);
      setEditingTaskId(null);
    });
  };

  return (
    <div className={styles.Todo}>
      <LoaderWrapper loading={isLoading}>
        <div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
            />
            <button onClick={addTask}>Add</button>
          </div>
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                {editingTaskId === task._id ? (
                  <div>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <button onClick={() => saveTask()}>Save</button>
                  </div>
                ) : (
                  <div>
                    <div>{task.title}</div>
                    <div>
                      <button
                        className={styles.editButton}
                        onClick={() => editTask(task._id, task.title)}
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteTask(task._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </LoaderWrapper>
    </div>
  );
}

export default Todo;
