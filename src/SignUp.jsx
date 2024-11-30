import React, { useState } from 'react';

const SignUp = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        const envUsername = import.meta.env.VITE_USERNAME;
        const envPassword = import.meta.env.VITE_PASSWORD;

        if (username === envUsername && password === envPassword) {
            onLogin(); // 로그인 성공
        } else {
            setError('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900'>
            {/* 헤더 */}
            <div className='w-[500px] p-8 bg-gradient-to-b from-neutral-70 via-neutral-80 to-neutral-90 rounded-xl shadow-glow'>
                <h1 className='flex items-center justify-center mb-6 space-x-4 text-3xl font-semibold text-white'>
                    <img src='/img/HEZ_GG.svg' className='w-[80px] md:w-[100px]' alt='HEZ GG' />
                    <span className='text-white'>이벤트 로그인</span>
                </h1>
                {/* 입력 폼 */}
                <div className='flex flex-col space-y-4'>
                    <input
                        type='text'
                        placeholder='아이디'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='w-full px-4 py-2 text-white border rounded-lg bg-neutral-80 border-neutral-60 focus:outline-none focus:ring-2 focus:ring-primary-50'
                    />
                    <input
                        type='password'
                        placeholder='비밀번호'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full px-4 py-2 text-white border rounded-lg bg-neutral-80 border-neutral-60 focus:outline-none focus:ring-2 focus:ring-primary-50'
                    />
                </div>
                {error && <div className='mt-4 text-center text-error-10'>{error}</div>}
                {/* 로그인 버튼 */}
                <button
                    onClick={handleLogin}
                    className='w-full py-3 mt-6 text-xl font-semibold text-white transition-transform transform rounded-lg shadow-lg bg-primary-60 hover:scale-105 disabled:opacity-60'
                >
                    로그인
                </button>
            </div>
        </div>
    );
};

export default SignUp;
