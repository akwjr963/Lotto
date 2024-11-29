import React, { useEffect, useRef } from 'react';

const Slider = ({ images, className }) => {
    // `sliderRef`를 사용하여 슬라이더 DOM 요소에 접근
    const sliderRef = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current; // 슬라이더 컨테이너 DOM 요소 가져오기
        let animationFrame;

        // 슬라이더를 애니메이션하는 함수
        const animateSlider = () => {
            if (slider) {
                const firstChild = slider.firstElementChild; // 첫 번째 슬라이드 요소 가져오기
                const clone = firstChild.cloneNode(true); // 첫 번째 슬라이드 복제
                slider.appendChild(clone); // 복제된 요소를 슬라이더 끝에 추가

                const slideWidth = firstChild.offsetWidth; // 슬라이드의 너비 계산
                slider.style.transition = 'none'; // 초기 위치 설정 전 애니메이션 제거
                slider.style.transform = `translateX(0)`; // 슬라이더를 처음 위치로 이동

                // 약간의 시간 대기 후 애니메이션 시작
                setTimeout(() => {
                    slider.style.transition = 'transform 5s linear'; // 5초 동안 선형 애니메이션 적용
                    slider.style.transform = `translateX(-${slideWidth}px)`; // 슬라이더를 왼쪽으로 이동
                }, 50);

                // 애니메이션 종료 후 처리
                setTimeout(() => {
                    slider.removeChild(firstChild); // 슬라이더에서 첫 번째 슬라이드를 제거
                    slider.style.transition = 'none'; // 위치 재설정 전 애니메이션 제거
                    slider.style.transform = `translateX(0)`; // 슬라이더를 처음 위치로 이동
                    requestAnimationFrame(animateSlider); // 다음 슬라이드 애니메이션 요청
                }, 5000); // 5초 후 실행 (애니메이션 길이와 동일)
            }
        };

        // 첫 번째 애니메이션 프레임 요청
        animationFrame = requestAnimationFrame(animateSlider);

        // 컴포넌트가 언마운트될 때 애니메이션 정지
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    return (
        // 슬라이더를 감싸는 컨테이너, overflow-hidden으로 영역 밖 콘텐츠 숨김
        <div className={`overflow-hidden w-full ${className}`}>
            <div
                ref={sliderRef} // 슬라이더 컨테이너 참조 연결
                className="flex w-full whitespace-nowrap gap-4" // 슬라이드 이미지를 가로로 나열
                style={{ display: 'flex' }}
            >
                {images.map((image, index) => (
                    <img
                        key={index} // 이미지 배열의 인덱스를 키로 설정
                        src={image} // 이미지 경로
                        alt={`slide-${index}`} // 접근성을 위한 alt 속성
                        className="object-cover w-64 h-40 rounded-md shadow-md" // 이미지 스타일
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
