/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    API_URL: 'http://localhost:8000/api/';
    API_VERSION: 'v1/';
    ACCESS_TOKEN: 'access_token';
    PROFILE_COMPLETE: 'profile_complete';
    REFRESH_TOKEN: 'refresh_token';
  }
}
