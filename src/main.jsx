import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './AppWrapper';
import './index.css'; // Tailwind CSS 스타일 파일 import

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppWrapper />
    </React.StrictMode>
);
