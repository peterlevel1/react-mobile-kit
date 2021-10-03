import React, { FC, useContext } from 'react'
import zhCN from '../../locales/zh-CN';

export const defaultConfigRef = {
  current: {
    locale: zhCN, // TODO: change it to enUS
  },
};

export function setDefaultConfig(config) {
  defaultConfigRef.current = config;
}

export function getDefaultConfig() {
  return defaultConfigRef.current;
}

const ConfigContext = React.createContext(null);

export const ConfigProvider = props => {
  const { children, ...config } = props;
  const parentConfig = useConfig();

  return (
    <ConfigContext.Provider
      value={{
        ...parentConfig,
        ...config,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext) ?? getDefaultConfig();
}
