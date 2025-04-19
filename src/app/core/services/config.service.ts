import { Injectable } from '@angular/core';

import { environment2 } from '../../../environments/environment';
import { Observable } from 'rxjs';
// import { environment } from '../../../environment/environment';

type AppEnv = typeof environment2;

@Injectable({ providedIn: 'root' })
export class ConfigService {
  /**
   * Returns environment config of application
   */
  getEnvironment(): AppEnv {
    return environment2;
  }

  /**
   * Indicates whether the apps is running in production mode
   *
   * @return {*}  {boolean}
   */
  isProd(): boolean {
    return environment2.production;
  }

  /**
   * Returns app's version
   */
  getVersion(): string {
    return environment2.appVersion;
  }

  /**
   * Returns the server's host url
   */
  getAPIUrl() {

    return environment2?.apiUrl ?? '';
  }

  /**
   * Returns configuration for auth client and secret
   */
  getAuthSettings(): AppEnv['settings']['auth'] {
    return environment2?.settings?.auth;
  }
}
