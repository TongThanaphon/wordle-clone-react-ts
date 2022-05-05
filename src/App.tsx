import React from "react";

import AppLayout from "./components/layout/AppLayout";
import Keyboard from "./components/keyboard";
import Board from "./components/board";
import AlertContainer from "./components/alert/AlertContainer";

const App = () => {
  return (
    <AppLayout>
      <AlertContainer />
      <Board />
      <Keyboard />
    </AppLayout>
  );
};

export default App;
