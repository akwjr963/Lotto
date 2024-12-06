import React, { useState } from 'react';
import SignUp from './SignUp';
import App from './App'; // 기존 App.jsx

const AppWrapper = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true); // 로그인 성공 시 상태 변경
    };

    return isLoggedIn ? <App /> : <SignUp onLogin={handleLogin} />;
};

export default AppWrapper;
