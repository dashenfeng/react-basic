import { useEffect, useRef } from "react";

export default function App() {
  const domRef = useRef<HTMLInputElement>(null);
  const timerId = useRef<number | undefined | NodeJS.Timeout>(undefined);
  useEffect(() => {
    domRef.current?.focus;

    timerId.current = setInterval(() => {
      console.log(123);
    }, 1000);

    return () => clearInterval(timerId.current)
  },[]);
  return (
    <>
      <input ref={domRef}></input>
    </>
  );
}
