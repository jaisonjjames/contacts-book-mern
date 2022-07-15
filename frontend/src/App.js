import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Contact from "./pages/contact";
import Auth from "./pages/auth";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/contact" exact element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
