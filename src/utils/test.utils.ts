import {createStore} from 'redux';
import rootReducer from '../store/reducers';
import React, {ElementType} from 'react';
import {render, RenderOptions} from '@testing-library/react-native';
import {Provider} from 'react-redux';

const store = createStore(rootReducer);

type CustomRenderOptions = {
  store?: typeof store;
};

const AllTheProviders =
  (options: CustomRenderOptions) =>
  ({children}: {children: ElementType}) => {
    return <Provider store={options.store || store}>{children}</Provider>;
  };

const customRender = (
  ui: ElementType,
  options: customRenderOptions & Omit<RenderOptions, 'queries'> = {},
) => {
  const {store, ...others} = options;

  return render(ui, {
    wrapper: AllTheProviders({store}),
    ...others,
  });
};

export * from '@testing-library/react-native';
export {customRender as render};
