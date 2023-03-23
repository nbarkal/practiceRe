import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Post } from './components/post';
import { ProductsTable } from './components/productsTable';
import { RouterList } from './components/Router';


export default function App() {

  return (
    <div className="App">
      <RouterList />
    </div>
  );
}

