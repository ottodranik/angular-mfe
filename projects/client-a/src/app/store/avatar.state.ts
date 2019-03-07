
export interface State {
  list: any[];
  avatarsTotal: number;
  details: any;
  connections: object;
  proxies: any[];
  currentTab: number;
  isLoading: boolean;
  error: any;
  isCreateBtnDisabled: boolean;
  cities: any[];
}

export const initialState: State = {
  list: [],
  avatarsTotal: 0,
  details: undefined,
  connections: {},
  proxies: undefined,
  currentTab: 0,
  isLoading: false,
  error: null,
  isCreateBtnDisabled: false,
  cities: []
};
