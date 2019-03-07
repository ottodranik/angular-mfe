
export interface State {
  avatars: any[];
  avatarsTotal: number;
  listQuery: any;
  selected: any;
  selectedDetails: any;
  selectedLog: any[];
  connections: object;
  proxies: any[];
  currentTab: number;
  isLoading: boolean;
  error: any;
  isCreateBtnDisabled: boolean;
  cities: any[];
  importDiffs: any;
  awaitImportConfirmation: number[];
}

export const initialState: State = {
  avatars: [],
  avatarsTotal: 0,
  listQuery: {
    pageNumber: 0,
    pageSize: 20,
    filter: {},
    sortBy: {
      field: 'modifiedAt',
      asc: false
    }
  },
  selected: undefined,
  selectedDetails: undefined,
  selectedLog: undefined,
  connections: {},
  proxies: undefined,
  currentTab: 0,
  isLoading: false,
  error: null,
  isCreateBtnDisabled: false,
  cities: [],
  importDiffs: {},
  awaitImportConfirmation: []
};
