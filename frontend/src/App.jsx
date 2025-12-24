import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/privateRoute";
import ListingManager from "./pages/ListingManager";
import CreateListing from "./pages/CreateListing";
import ShowMyList from "./pages/ShowMyList";
import EditListing from "./pages/EditListing";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/listings" element={<ListingManager />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/manage-listing" element={<ShowMyList />} />
          <Route path="/listing/:id" element={<EditListing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
