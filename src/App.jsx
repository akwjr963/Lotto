import React, { useState, useEffect } from 'react';
import prizesData from './prizes.json'; // 상품 데이터 JSON 가져오기

const App = () => {
    const [prizes, setPrizes] = useState([]);
    const [availableNumbers, setAvailableNumbers] = useState(Array.from({ length: 1000 }, (_, i) => i + 1));
    const [currentNumber, setCurrentNumber] = useState(null);
    const [finalNumber, setFinalNumber] = useState(null);
    const [selectedPrize, setSelectedPrize] = useState(null);
    const [selectedPrizeGrade, setSelectedPrizeGrade] = useState(null); // 등수 상태 추가
    const [isAnimating, setIsAnimating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isExiting, setIsExiting] = useState(false); // 모달 종료 애니메이션 상태 추가

    // JSON 파일 데이터를 상태로 설정
    useEffect(() => {
        setPrizes(prizesData.items);
    }, []);

    // 특정 번호에 해당하는 상품 가져오기
    const getPrize = (number) => {
        for (const prize of prizes) {
            // 번호가 winningNumbers에 포함되거나, 모든 번호에 열려 있는 상품인지 확인
            if ((prize.winningNumbers.length === 0 || prize.winningNumbers.includes(number)) && prize.count > 0) {
                return prize; // 상품 객체를 반환
            }
        }
        return null; // 당첨 가능한 상품이 없으면 null 반환
    };

    const startAnimation = () => {
        if (availableNumbers.length === 0 || prizes.every((prize) => prize.count === 0)) {
            alert('더 이상 뽑을 번호나 상품이 없습니다!');
            return;
        }

        setIsAnimating(true);
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const number = availableNumbers[randomIndex];
        const prize = getPrize(number); // 현재 번호로 상품 조회

        if (!prize) {
            alert('해당 번호에 당첨 가능한 상품이 없습니다.');
            setIsAnimating(false);
            return;
        }

        const interval = setInterval(() => {
            setCurrentNumber(Math.floor(Math.random() * 1000) + 1);
        }, 50);

        setTimeout(() => {
            clearInterval(interval);
            setCurrentNumber(number);
            setFinalNumber(number);

            setPrizes((prevPrizes) =>
                prevPrizes.map((prizeItem) =>
                    prizeItem.name === prize.name
                        ? { ...prizeItem, count: prizeItem.count - 1 }
                        : prizeItem
                )
            );

            setSelectedPrize(prize.name);
            setSelectedPrizeGrade(prize.grade); // 당첨된 상품의 등수 저장
            setAvailableNumbers((prev) => prev.filter((num) => num !== number));
            setIsAnimating(false);
            setShowModal(true);
        }, 1500);
    };

    // 모달 닫기 함수 (애니메이션 후 닫기)
    const closeModal = () => {
        setIsExiting(true); // fadeOut 애니메이션 실행
        setTimeout(() => {
            setShowModal(false); // 애니메이션 후 모달 닫기
            setIsExiting(false); // 애니메이션 상태 초기화
        }, 250); // fadeOut 애니메이션 시간
    };

    return (
        <div className="flex flex-1 flex-col items-center min-h-screen bg-gray-900 pt-10 md:pt-20">
            {/* 행운 뽑기 */}   
            <div className="w-[90%] md:w-[500px] p-8 bg-gradient-to-b from-neutral-70 via-neutral-80 to-neutral-90 rounded-xl mb-10 shadow-glow">
            <h1 className="mb-6 text-3xl font-semibold text-white flex items-center justify-center space-x-4">
                <img src="/img/HEZ_GG.svg" className="w-[80px] md:w-[100px]" alt="HEZ GG" />
                <span className="text-white">행운 뽑기</span>
            </h1>
            <div className="text-7xl font-extrabold text-primary-40 my-6 text-center">
                {isAnimating ? currentNumber : finalNumber || '-'}
            </div>
            <button
                onClick={startAnimation}
                disabled={isAnimating}
                className="text-white font-semibold bg-primary-60 rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:opacity-60 px-6 py-3 w-auto h-auto text-xl mx-auto block"
            >
                {isAnimating ? '추첨 중...' : '추첨 시작'}
            </button>
            </div>

            {/* 남은 상품 */}
            <div className="w-[90%] sm:w-[80%] max-w-[1200px] p-8 bg-gradient-to-tr from-primary-40 via-teal-400 to-blue-400 rounded-xl shadow-lg mt-12">
                <h2 className="mb-6 text-2xl font-semibold text-white text-center">행운 뽑기 상품</h2>
                <ul className="flex flex-wrap justify-center gap-8 overflow-x-auto">
                    {prizes.map((prize) => (
                        <li key={prize.name} className="flex flex-1 flex-col items-center flex-shrink-0 w-[200px]">
                            <img
                                src={`/img/${prize.image}`}
                                alt={prize.name}
                                className="w-[150px] h-[150px] object-cover rounded-[25px] shadow-md mb-4"
                            />
                            <span className="text-xs sm:text-lg font-semibold text-neutral-70 text-center">
                                {prize.grade} {prize.name}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className={`w-[90%] md:w-[700px] h-[90%] md:h-[400px] bg-neutral-80 p-8 rounded-xl shadow-xl transition-transform transform ${
                            isExiting ? 'animate-fadeOut' : 'animate-fadeIn'
                        } flex md:flex-row flex-col justify-between`} // 반응형으로 좌우 배치 변경
                    >
                        {/* 왼쪽: 당첨번호와 상품 정보 */}
                        <div className="flex flex-col justify-center text-center w-full md:w-1/2">
                            <h1 className="mb-4 text-4xl font-extrabold text-white uppercase tracking-widest">
                                당첨번호
                            </h1>
                            <div className="py-4 text-6xl font-extrabold bg-gradient-to-b from-primary-40 to-primary-60 text-transparent bg-clip-text">
                                {finalNumber}
                            </div>
                            <div className="py-4 text-4xl font-semibold text-primary-50">
                                {selectedPrizeGrade}{' '}
                                <span className="text-3xl bg-neutral-10 text-transparent bg-clip-text">
                                    축하드립니다!
                                </span>
                            </div>
                        </div>

                        {/* 오른쪽: 상품 이미지 */}
                        <div className="flex justify-center items-center w-full md:w-1/2 mt-2">
                            <div className="inline-block px-6 py-4 rounded-lg text-2xl text-neutral-10 text-center font-medium tracking-tight shadow-md">
                                <span className="block text-3xl font-semibold mb-4">상품</span>
                                {/* 상품 이미지 표시 */}
                                <img
                                    src={`/img/${prizes.find((prize) => prize.name === selectedPrize)?.image}`}
                                    alt={selectedPrize}
                                    className="w-[200px] h-[200px] object-cover rounded-[25px] shadow-md"
                                />
                            </div>
                        </div>

                        {/* 닫기 버튼 */}
                        <div className="absolute top-6 right-6">
                            <button
                                onClick={closeModal}
                                className="absolute top right-2 text-error-10 text-3xl font-semibold hover:text-error-20 transition-transform transform"
                            >
                                &times; {/* X 모양의 문자 */}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
