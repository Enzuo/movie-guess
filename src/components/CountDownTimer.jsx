import { useState, useEffect } from "react"

export default function CountdownTimer({ targetTime }) {

  const [countDown, setCountDown] = useState(
    targetTime - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(targetTime - new Date().getTime());
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