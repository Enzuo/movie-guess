import { useState, useEffect } from "react"

export default function CountdownTimer({ targetTime }) {

  const [countDown, setCountDown] = useState(
    targetTime - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime()
      setCountDown(targetTime - currentTime);
      if(targetTime - currentTime <= 0){
        clearInterval(interval)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);


  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);


  return (
    <div>
      {seconds}
    </div>
  )
}