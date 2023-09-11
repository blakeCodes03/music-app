import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spotify from './Spotify';
import Library from './Library';
import Search from './Search';
import ErrorPage from './ErrorPage';


function RouterPaths() {
  return (
    <Router>
      <Routes>
      
        <Route
          path="/"
          element={[<Spotify  key={1}/>]}

        />
        <Route path="/library" element={[<Library  key={1} />]} />
        <Route path="/search" element={[<Search  key={1} />]} />
        <Route path="*" element={[<ErrorPage key={1}/>]} />
      </Routes>
    </Router>
  
  )
}

export default RouterPaths