import React, { useEffect, useRef } from 'react';

const Slider = ({ images, className }) => {
    const sliderRef = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current;
        let animationFrame;

        const animateSlider = () => {
            if (slider) {
                const firstChild = slider.firstElementChild;
                const clone = firstChild.cloneNode(true);
                slider.appendChild(clone);

                const slideWidth = firstChild.offsetWidth;
                slider.style.transition = 'none';
                slider.style.transform = `translateX(0)`;

                setTimeout(() => {
                    slider.style.transition = 'transform 5s linear';
                    slider.style.transform = `translateX(-${slideWidth}px)`;
                }, 50);

                setTimeout(() => {
                    slider.removeChild(firstChild);
                    slider.style.transition = 'none';
                    slider.style.transform = `translateX(0)`;
                    requestAnimationFrame(animateSlider); // 계속 반복
                }, 5000); // 슬라이드가 끝날 때
            }
        };

        animationFrame = requestAnimationFrame(animateSlider);

        return () => cancelAnimationFrame(animationFrame);
    }, []);

    return (
        <div className={`overflow-hidden w-full ${className}`}>
            <div
                ref={sliderRef}
                className="flex w-full whitespace-nowrap gap-4"
                style={{ display: 'flex' }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`slide-${index}`}
                        className="object-cover w-64 h-40 rounded-md shadow-md"
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
