type Routes = {
  routeNames: never[];
};

export type NavigationProps = {
  navigate: (name: string, params?: {[key: string]: any}) => void;
  goBack: () => void;
  reset: (index: number, routeNames: Routes[]) => void;
  addListener: (v1: string, v2: any) => void;
  setOptions: (v1: any) => void;
};
