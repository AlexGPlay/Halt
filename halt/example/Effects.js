import * as Halt from "../index.js";

export default function Effects() {
  const [isLoading, setIsLoading] = Halt.useState(false);
  const [data, setData] = Halt.useState();
  const [counter, setCounter] = Halt.useState(0);

  Halt.useEffect(async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const json = await response.json();
    setIsLoading(false);
    setData(json);
  }, []);

  Halt.useEffect(() => {
    setInterval(() => {
      setCounter((counter) => counter + 1);
    }, 1000);
  }, []);

  Halt.useEffect(() => {
    console.log("Counter updated", counter);
  }, [counter]);

  return (
    <div>
      <div>isLoading: {isLoading}</div>
      <div>Data: {isLoading ? null : JSON.stringify(data)}</div>
      <div>{counter}</div>
    </div>
  );
}
