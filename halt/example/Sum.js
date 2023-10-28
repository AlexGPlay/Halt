import * as Halt from "../index.js";

export default function Sum() {
  const [x, setX] = Halt.useState(0);

  return (
    <div>
      <button onClick={() => setX(x + 1)}>+1</button>
      <h1>{x}</h1>
    </div>
  );
}
