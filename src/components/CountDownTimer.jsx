import { useState, useEffect, useReducer } from "react"

export default function CountdownTimer({ targetTime }) {

  const [countDownLength, setCountDownLength] = useState(10)

  // TODO Fix unpure reducer
  const [countDown, updateCountDown] = useReducer((state, action) => {
    const currentTime = new Date().getTime()
    const time = targetTime - currentTime
    return time > 0 ? time : 0
  },
  targetTime - new Date().getTime())

  useEffect(() => {
    setCountDownLength(targetTime - new Date().getTime())
    updateCountDown()
    const interval = setInterval(() => {
      updateCountDown();
      const currentTime = new Date().getTime()
      if(targetTime - currentTime <= 0){
        clearInterval(interval)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);


  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  const percent = countDown/countDownLength
  const radius = 360*percent
  const color = seconds > 5 ? "#aaa" : "#d33"

  return (
    <div>
      {seconds}
      <svg className="countdown-svg" style={{width: '28px', height:'28px'}}>
        <path
            fill="none"
            stroke="#ddd"
            strokeWidth="2"
            d={describeArc(14, 14, 12, 0, 359)}
        />
        <path
            fill="none"
            stroke={color}
            strokeWidth="4"
            d={describeArc(14, 14, 12, 0, radius)}
        />
      </svg>
    </div>
  )
}




function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  var d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y
  ].join(' ');

  return d;
}