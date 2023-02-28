import { useState, useEffect, useReducer, useRef } from "react"

export default function CountdownTimer({ targetTime, countDownLength = 10 }) {

  // const [countDownLength, setCountDownLength] = useState(10)
  const passingRef = useRef(null)
  const urgentRef = useRef(null)

  // TODO Fix unpure reducer
  const [countDown, updateCountDown] = useReducer((state, action) => {
    const currentTime = new Date().getTime()
    const time = targetTime - currentTime
    return time > 0 ? time : 0
  },
  targetTime - new Date().getTime())

  // useEffect(() => {
  //   setCountDownLength(targetTime - new Date().getTime())
  //   updateCountDown()
  //   const interval = setInterval(() => {
  //     updateCountDown();
  //     const currentTime = new Date().getTime()
  //     if(targetTime - currentTime <= 0){
  //       clearInterval(interval)
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [targetTime]);

  useEffect(() => {
    let animationFrameId
    const animateFn = () => {

      const currentTime = new Date().getTime()
      const time = targetTime - currentTime
      const ct = time > 0 ? time : 0
      const percent = (ct/(countDownLength*1000))*100
      const radius = 360*percent

      if(passingRef){
        passingRef.current.setAttribute("width", 100-percent + "%")
      }

      if(urgentRef){
        // if(percent < 25){
          const opacity = (25-percent)/25
          urgentRef.current.setAttribute("style", "opacity: "+opacity+"; fill: rgb(244 50 80)")
        // }
      }

      if(ct > 0){
        animationFrameId = requestAnimationFrame(animateFn)
      }
    }
    

    animationFrameId = requestAnimationFrame(animateFn)
    return () => cancelAnimationFrame(animationFrameId);

  }, [targetTime])


  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  const percent = countDown/countDownLength
  const radius = 360*percent
  const color = seconds > 5 ? "#aaa" : "#d33"

  return (
    <div style={{width : '100%', height: '3px'}}>
      <svg className="countdown-svg" style={{width: '100%', height:'100%', display: "block"}}>
      
        <rect width="100%" height="100%" style={{fill: "rgb(40 53 68);"}}></rect>
        <rect ref={urgentRef} width="100%" height="100%" style={{opacity: 0, fill: "rgb(244 50 80)"}}></rect>
        <rect ref={passingRef} width="100%" height="100%" style={{fill: "rgb(30 41 54)"}}></rect>
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