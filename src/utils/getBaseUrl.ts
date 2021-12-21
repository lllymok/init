import { config } from 'config';

interface BaseUrlConfig {
  protocol?: boolean;
  hostUrl?: boolean;
  apiRoot?: boolean;
  apiVersion?: boolean;
}

export default (newConfig?: BaseUrlConfig) => {
  const baseUrlConfig: BaseUrlConfig = {
    protocol: true,
    hostUrl: true,
    apiRoot: true,
    apiVersion: true,
    ...newConfig,
  };
  const protocol = baseUrlConfig.protocol ? config.PROTOCOL : '';
  const hostUrl = baseUrlConfig.hostUrl ? config.HOST_URL : '';
  const apiRoot = baseUrlConfig.apiRoot ? `/${config.API_ROOT}` : '';

  return `${protocol}${hostUrl}${apiRoot}`;
};
