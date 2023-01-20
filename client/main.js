import React from "react"
import HelloWorld from "./HelloWorld"
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<HelloWorld />);