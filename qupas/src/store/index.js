import React from "react";
import useGlobalHook from "use-global-hook";

import * as actions from "../actions";

const initialState = {
  omdb_data: [],
  type: '', 
  s: 'your',
  y: '2019'
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;