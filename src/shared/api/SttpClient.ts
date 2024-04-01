/* eslint-disable @typescript-eslint/no-explicit-any */
import Sttp, { SttpResponse } from '@supercharge/sttp';
import { AxiosRequestConfig } from 'axios';
import { Router } from 'vue-router';
import {
  ApiatoError,
  ApiatoResponse,
  InstallationManager,
  NotifyUtils,
  Query,
  TokenManager,
} from '../utils';
enum StatusCode {
  Unauthorized = 401,
  MethodNotAllowed = 405,
  Forbidden = 403,
  NotFound = 404,
  TooManyRequests = 429,
  InternalServerError = 500,
  ValidationError = 422,
  ExpectationFailed = 417,
}

const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    if (TokenManager.hasAccessToken()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config.headers!.Authorization = `Bearer ${TokenManager.access_token}`;
    }
    return config;
  } catch (error) {
    throw new Error(error as string);
  }
};

class SttpClient {
  private static _router: Router;
  private get sttp(): Sttp {
    return this.initHttp(SttpClient._router);
  }

  initHttp(router: Router) {
    if (!router) {
      console.error('NO HAY INSTANCIA DE ROUTER INYECTADA');
    }
    SttpClient._router = router;

    // const sttp = Sttp.withOptions({
    //   baseURL: process.env.API_URL + process.env.API_VERSION,
    //   withCredentials: true,
    // }).contentType('application/json');
    const sttp = Sttp.create()
      .withBaseUrl(process.env.API_URL + process.env.API_VERSION)
      .withTimeoutInSeconds(15)
      .acceptJson();
    sttp
      .axios()
      .interceptors.request.use(injectToken, (error) => Promise.reject(error));

    sttp.axios().interceptors.response.use(
      (response) => response,
      async (error) => {
        const { response } = error;
        return await this.handleError(response);
      }
    );

    return sttp;
  }

  get<T>(
    url: string,
    queryParams?: Query
  ): Promise<SttpResponse<ApiatoResponse<T>>> {
    return this.sttp.get<ApiatoResponse<T>>(url, queryParams);
  }

  post<T, R = any>(
    url: string,
    data?: R
  ): Promise<SttpResponse<ApiatoResponse<T>>> {
    return this.sttp.post<ApiatoResponse<T>>(url, data);
  }

  put<T = any, R = any>(
    url: string,
    data?: R
  ): Promise<SttpResponse<ApiatoResponse<T>>> {
    return this.sttp.put<ApiatoResponse<T>>(url, data);
  }

  patch<T = any, R = any>(
    url: string,
    data?: R
  ): Promise<SttpResponse<ApiatoResponse<T>>> {
    return this.sttp.patch<ApiatoResponse<T>>(url, data);
  }

  delete<T>(
    url: string,
    queryParams?: object
  ): Promise<SttpResponse<ApiatoResponse<T>>> {
    return this.sttp.delete<ApiatoResponse<T>>(url, queryParams);
  }

  withOptions(config: AxiosRequestConfig): Sttp {
    return this.sttp.withOptions(config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async handleError(error: ApiatoError) {
    const { status, data } = error;

    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        NotifyUtils.error(data.message || 'Error de Servidor');
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        NotifyUtils.error(data.message || 'Prohibido.');
        break;
      }
      case StatusCode.Unauthorized: {
        // Handle Unauthorized

        console.warn('El token es invalido... forzamos cierre de sesión');
        TokenManager.removeAccessToken();
        InstallationManager.removeProfileToken();
        SttpClient._router.push({ name: 'login' });
        NotifyUtils.error(data.message || 'No autorizado');
        break;
      }
      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        NotifyUtils.error(data.message || 'Muchas peticiones...');
        break;
      }
      case StatusCode.ValidationError: {
        // Handle TooManyRequests
        NotifyUtils.error('Los datos son incorrectos.');
        break;
      }
      case StatusCode.ExpectationFailed: {
        NotifyUtils.error(
          data.message || 'Hubo un error al eliminar el recurso.'
        );
        break;
      }
      case StatusCode.MethodNotAllowed: {
        NotifyUtils.error(data.message || 'No esta permitido esta petición.');
        break;
      }
      case StatusCode.NotFound: {
        NotifyUtils.error(
          data.message || 'No se encontro la ruta especificada.'
        );
        break;
      }
    }

    return Promise.reject(error);
  }
}
export const sttpClient = new SttpClient();
