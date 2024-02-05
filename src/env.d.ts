/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    API_URL: 'http://api.apiato.dev.com/';
    RENIEC_URL: 'https://192.168.1.4/api/web-service/person-complete';
    RENIEC_TOKEN: 'eed63ab26117dacf4986f37ca1e61c4ccafc2aea';
    API_VERSION: 'v1/';
    ACCESS_TOKEN: 'access_token';
    PROFILE_COMPLETE: 'profile_complete';
    REFRESH_TOKEN: 'refresh_token';
  }
}
