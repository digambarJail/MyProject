import "./index.css";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Signup from "./components/singup";
import Posts from "./components/posts";

const router = createBrowserRouter(
  createRoutesFromElements(
      <>
      <Route path="/signup" element={<><Signup /></>} />
      <Route path="/posts" element={<><Posts /></>} />
      </>     
  
  )
)

function App({routes}) {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;

// function App() {