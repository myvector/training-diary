export interface Inavigation {
  route: any;
  navigation: any;
  [key: string]: string;
}

export interface Ichild {
  children: JSX.Element | JSX.Element[];
  style?: { [key: string]: string | number };
  onPress?: (id?: any) => any;
}

export interface ITheme {
  [key: string]: string;
}

export interface Ibutton extends Ichild {
  color?: string;
  onLongPress?: () => void;
  onPress: () => void;
  colorText?: string;
  style?: { [key: string]: string | number };
}

export interface ItrainingInfor {
  nameTrainingDay: string;
  nameExercise: string;
  amount: number;
}

export interface IcardExercise {
  key: number;
  iteration: number;
  history: { weight: string; amount: string };
  change: (value: IitemListChange, i: number) => void;
  id: number;
  removeItem: (id: number) => void;
  margin: number | string;
}

export interface Iexercise {
  amount: number;
  id: number;
  name: string;
}

export interface IcardList {
  list: number[];
  takeResult: (
    result: ItrainingInfor[],
    id: number,
    readiness?: boolean
  ) => void;
  flatList?: boolean;
}

export interface Ifinish {
  finishResultData: (
    result: ItrainingInfor[],
    id: number,
    readiness?: boolean
  ) => void;
  id: number;
  style?: { [key: string]: string | number };
}

export interface IchangeResultValid {
  array: boolean[];
  bool: boolean;
  id: number;
}
export interface IitemList {
  type?: string;
  value?: string;
  amount?: string;
  weight?: string;
  id?: number;
  i?: number;
}

export interface IitemListChange {
  type: string;
  value: string;
}

export interface Imodal {
  show: () => void;
  modalVisible: boolean;
}

export interface ImodalEdit extends Imodal {
  name: string;
  id: number;
  change: (
    id: number,
    name: string,
    parrentId?: number,
    index?: number
  ) => void;
  parrentId?: string;
  index?: number;
}

export interface ImodalWrap extends Imodal {
  children: JSX.Element | JSX.Element[];
  save: () => void;
  translucent?: boolean;
  backColor?: string;
}

export interface IpopupMenu {
  actions: string[];
  onPress: (e: string, i: number | void) => void;
  color: string;
  width?: number;
}

export interface IsettingCard {
  id: number;
  name: string;
  change: (id: number, name: string, parrentId?: number) => void;
  action: string[];
  pressAction: any[];
  parrentId?: string;
  index?: number;
  navigation?: any;
}

//redux

export interface Iaction {
  [key: string]: string | number | boolean | string[];
  amount: string[];
  name: string[];
  day: number;
  id: number;
}

export interface IstateForm {
  formCreateData: {
    day: number[];
    resultData: ItrainingInfor[][];
    buttonShow: boolean;
    checkFormValid: boolean[];
  };
}

export interface Ilist {
  id: number;
  name: string;
  parrentId: number;
}

export interface IinitialState {
  date: string;
  approaches: {}[];
  sheme: { id: number; name: string }[];
  trainingDay: {
    [key: string]: {
      id: number;
      list: Ilist[];
    };
  };
  exercise: { [key: string]: { id: number; list: Iexercise[] } };
  history: any[];
  historyId: string;
}

export interface Istate {
  trainingData: IinitialState;
}
