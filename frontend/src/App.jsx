
// // import { useState, useEffect } from 'react'
// // import Navbar from './components/Navbar'
// // import { FaEdit } from "react-icons/fa";
// // import { AiFillDelete } from "react-icons/ai";
// // import { v4 as uuidv4 } from 'uuid';

// // function App() {

// //   const [todo, setTodo] = useState("")
// //   const [todos, setTodos] = useState([])
// //   const [showFinished, setshowFinished] = useState(true)

// //   useEffect(() => {
// //     const saved = JSON.parse(localStorage.getItem("todos"));
// //     if (saved) setTodos(saved);
// //   }, []);

// //   useEffect(() => {
// //     localStorage.setItem("todos", JSON.stringify(todos));
// //   }, [todos]);

// //   const toggleFinished = () => {
// //     setshowFinished(!showFinished)
// //   }

// //   const handleEdit = (id) => {
// //     let t = todos.filter(i => i.id === id)
// //     setTodo(t[0].todo)
// //     let newTodos = todos.filter(item => item.id !== id);
// //     setTodos(newTodos)
// //   }

// //   const handleDelete = (id) => {
// //     let newTodos = todos.filter(item => item.id !== id);
// //     setTodos(newTodos)
// //   }

// //   const handleAdd = () => {
// //     setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
// //     setTodo("")
// //   }

// //   const handleChange = (e) => {
// //     setTodo(e.target.value)
// //   }

// //   // ✅ FIXED CHECKBOX HANDLER
// //   const handleCheckbox = (e) => {
// //     let id = e.target.dataset.id;
// //     let index = todos.findIndex(item => item.id === id);

// //     if (index === -1) return;   // <-- REQUIRED FIX

// //     let newTodos = [...todos];
// //     newTodos[index].isCompleted = !newTodos[index].isCompleted;
// //     setTodos(newTodos);
// //   }

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
// //         <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>

// //         <div className="addTodo my-5 flex flex-col gap-4">
// //           <h2 className='text-2xl font-bold'>Add a Todo</h2>
// //           <div className="flex">

// //             <input
// //               onChange={handleChange}
// //               value={todo}
// //               type="text"
// //               className='w-full rounded-full px-5 py-1 bg-white'
// //             />

// //             <button
// //               onClick={handleAdd}
// //               disabled={todo.length <= 3}
// //               className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'
// //             >
// //               Save
// //             </button>

// //           </div>
// //         </div>

// //         <input
// //           className='my-4'
// //           id='show'
// //           onChange={toggleFinished}
// //           type="checkbox"
// //           checked={showFinished}
// //         />

// //         <label className='mx-2' htmlFor="show">Show Finished</label>

// //         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>

// //         <h2 className='text-2xl font-bold'>Your Todos</h2>

// //         <div className="todos">

// //           {todos.length === 0 && <div className='m-5'>No Todos to display</div>}

// //           {todos.map(item => {
// //             return (showFinished || !item.isCompleted) &&
// //               <div key={item.id} className="todo flex my-3 justify-between">

// //                 <div className='flex gap-5'>

                
// //                   <input
// //                     data-id={item.id}
// //                     onChange={handleCheckbox}
// //                     type="checkbox"
// //                     checked={item.isCompleted}
// //                   />

// //                   <div  className={item.isCompleted ? "line-through" : ""}>
// //                     {item.todo}
// //                   </div>
// //                 </div>

// //                 <div className="buttons flex h-full">
// //                   <button
// //                     onClick={() => handleEdit(item.id)}
// //                     className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'
// //                   >
// //                     <FaEdit />
// //                   </button>

// //                   <button
// //                     onClick={() => handleDelete(item.id)}
// //                     className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'
// //                   >
// //                     <AiFillDelete />
// //                   </button>
// //                 </div>

// //               </div>
// //           })}

// //         </div>

// //       </div>
// //     </>
// //   )
// // }

// // export default App



// import { useState, useEffect } from 'react'
// import Navbar from './components/Navbar'
// import { FaEdit } from "react-icons/fa";
// import { AiFillDelete } from "react-icons/ai";

// function App() {

//   const [todo, setTodo] = useState("")
//   const [todos, setTodos] = useState([])
//   const [showFinished, setshowFinished] = useState(true)

//   // ⭐ LOAD TODOS FROM BACKEND
//   useEffect(() => {
//     fetch("http://localhost:3000/todos")
//       .then(res => res.json())
//       .then(data => setTodos(data))
//   }, [])

//   const toggleFinished = () => {
//     setshowFinished(!showFinished)
//   }

//   // ⭐ DELETE TODO (MongoDB)
//   const handleDelete = async (id) => {
//     await fetch(`http://localhost:3000/todos/${id}`, {
//       method: "DELETE"
//     })

//     setTodos(todos.filter(item => item._id !== id))
//   }

//   // ⭐ EDIT TODO (UI ONLY)
//   const handleEdit = (id) => {
//     const t = todos.find(i => i._id === id)
//     setTodo(t.todo)

//     // Remove old one temporarily
//     setTodos(todos.filter(item => item._id !== id))
//   }

//   // ⭐ ADD TODO (MongoDB)
//   const handleAdd = async () => {
//     const newTodo = {
//       todo,
//       isCompleted: false
//     }

//     const res = await fetch("http://localhost:3000/todos", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newTodo)
//     })

//     const data = await res.json()
//     setTodos([...todos, data])
//     setTodo("")
//   }

//   const handleChange = (e) => {
//     setTodo(e.target.value)
//   }

//   // ⭐ TOGGLE CHECKBOX (MongoDB)
//   const handleCheckbox = async (e) => {
//     const id = e.target.dataset.id
//     const item = todos.find(t => t._id === id)

//     const res = await fetch(`http://localhost:3000/todos/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ isCompleted: !item.isCompleted })
//     })

//     const updated = await res.json()

//     setTodos(todos.map(t => t._id === id ? updated : t))
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
//         <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>

//         <div className="addTodo my-5 flex flex-col gap-4">
//           <h2 className='text-2xl font-bold'>Add a Todo</h2>
//           <div className="flex">

//             <input
//               onChange={handleChange}
//               value={todo}
//               type="text"
//               className='w-full rounded-full px-5 py-1 bg-white'
//             />

//             <button
//               onClick={handleAdd}
//               disabled={todo.length <= 3}
//               className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'
//             >
//               Save
//             </button>

//           </div>
//         </div>

//         <input
//           className='my-4'
//           id='show'
//           onChange={toggleFinished}
//           type="checkbox"
//           checked={showFinished}
//         />

//         <label className='mx-2' htmlFor="show">Show Finished</label>

//         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>

//         <h2 className='text-2xl font-bold'>Your Todos</h2>

//         <div className="todos">

//           {todos.length === 0 && <div className='m-5'>No Todos to display</div>}

//           {todos.map(item => {
//             return (showFinished || !item.isCompleted) &&
//               <div key={item._id} className="todo flex my-3 justify-between">

//                 <div className='flex gap-5'>

//                   <input
//                     data-id={item._id}
//                     onChange={handleCheckbox}
//                     type="checkbox"
//                     checked={item.isCompleted}
//                   />

//                   <div className={item.isCompleted ? "line-through" : ""}>
//                     {item.todo}
//                   </div>
//                 </div>

//                 <div className="buttons flex h-full">
//                   <button
//                     onClick={() => handleEdit(item._id)}
//                     className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'
//                   >
//                     <FaEdit />
//                   </button>

//                   <button
//                     onClick={() => handleDelete(item._id)}
//                     className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'
//                   >
//                     <AiFillDelete />
//                   </button>
//                 </div>

//               </div>
//           })}

//         </div>

//       </div>
//     </>
//   )
// }

// export default App
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Home from './pages/Home'
import Auth from './components/Auth'
import Todo from './components/Todo'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user'))
  )

  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Login / Register */}
        <Route
          path="/login"
          element={<Auth setToken={setToken} setUser={setUser} />}
        />

        {/* Protected Todos */}
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <Todo
                setToken={setToken}
                user={user}
                setUser={setUser}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

