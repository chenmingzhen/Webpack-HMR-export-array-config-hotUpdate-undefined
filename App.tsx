import React from "react";

const App: React.FC = React.memo(() => {
  /** 热更新测试 */
  const [time] = React.useState(Math.random());

  return (
    <div>
      <div>div</div>
      <span>span</span>
      <div>{time}</div>
    </div>
  );
});

export default App;
