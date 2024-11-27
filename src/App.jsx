import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [availableNumbers, setAvailableNumbers] = useState(Array.from({ length: 1000 }, (_, i) => i + 1));
    const [currentNumber, setCurrentNumber] = useState(null);
    const [finalNumber, setFinalNumber] = useState(null);
    const [prize, setPrize] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const prizes = ['상품1', '상품2', '상품3', '상품4', '상품5'];

    const startAnimation = () => {
        if (availableNumbers.length === 0) {
            alert('더 이상 번호가 없습니다!');
            return;
        }

        setIsAnimating(true);
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const number = availableNumbers[randomIndex];
        const prizeIndex = number % prizes.length;

        setPrize(prizes[prizeIndex]);

        const interval = setInterval(() => {
            setCurrentNumber(Math.floor(Math.random() * 1000) + 1);
        }, 50);

        setTimeout(() => {
            clearInterval(interval);
            setCurrentNumber(number);
            setFinalNumber(number);
            setAvailableNumbers((prev) => prev.filter((num) => num !== number));
            setIsAnimating(false);
            setShowModal(true);
        }, 1500);
    };

    return (
        <div className='flex flex-col items-center justify-center bg-gray-200 full-h-screen'>
            <div className='w-64 p-6 text-center bg-white rounded-lg shadow-lg'>
                <h1 className='mb-4 text-2xl font-bold'>랜덤 번호 뽑기</h1>
                <div className='text-6xl font-bold text-blue-500'>{isAnimating ? currentNumber : finalNumber || '-'}</div>
                <button
                    onClick={startAnimation}
                    disabled={isAnimating}
                    className='px-4 py-2 mt-4 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50'
                >
                    {isAnimating ? '추첨 중...' : '추첨 시작'}
                </button>
            </div>

            {showModal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='p-6 text-center bg-white rounded-lg w-80'>
                        <h2 className='mb-4 text-2xl font-bold'>당첨 번호</h2>
                        <p className='text-4xl font-bold text-green-500'>{finalNumber}</p>
                        <p className='mt-2 text-lg'>상품: {prize}</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className='px-4 py-2 mt-4 text-white transition bg-red-500 rounded-lg hover:bg-red-600'
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
