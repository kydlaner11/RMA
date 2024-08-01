import React, { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import './responsive.css'; // Ensure you have this CSS file for styling

const CountdownTimer = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
      isExpired: false,
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <>
      {!timeLeft.isExpired && (
      <div className="countdown-container">
      <div className="label-time">
      <span>Ticket <strong>Estimation</strong> Finished</span>
      </div>
      <div className="time-container">
      <div className="countdown-item">
        <span>{timeLeft.days}</span>
        <span className="label">Days</span>
      </div>
      :
      <div className="countdown-item">
        <span>{timeLeft.hours}</span>
        <span className="label">Hours</span>
      </div>
      :
      <div className="countdown-item">
        <span>{timeLeft.minutes}</span>
        <span className="label">Minutes</span>
      </div>
      :
      <div className="countdown-item">
        <span>{timeLeft.seconds}</span>
        <span className="label">Seconds</span>
      </div>
      </div>
    </div>  
     )}

    {timeLeft.isExpired && (
      <div className="countdown-container-delay countdown-complete">
        <span><ExclamationCircleOutlined /> Ticket Delayed</span>
      </div>
    )}
    </>

  );
};

export default CountdownTimer;
