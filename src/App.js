import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Post } from './components/post';


function App() {

  return (
    <div className="App">
      <Post/>
    </div>
  );
}

export default App;
