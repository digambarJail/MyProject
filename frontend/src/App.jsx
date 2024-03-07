import "./index.css";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Signup from "./components/singup";

const router = createBrowserRouter(
  createRoutesFromElements(
      <>
      <Route path="/" element={<><Signup /></>} />
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