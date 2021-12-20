/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import I18NextHttpBackend from 'i18next-http-backend';
import { mergeDeepRight } from 'ramda';

class Backend extends I18NextHttpBackend {
  parseLoadUrl(res, url, languages, namespaces) {
    let ret;
    let parseErr;

    try {
      if (typeof res.data === 'string') {
        ret = this.options.parse(res.data, languages, namespaces);
      } else {
        // fallback, which omits calling the parse function
        ret = res.data;
      }
    } catch (e) {
      parseErr = `failed parsing ${url} to json`;
    }

    return [parseErr, ret];
  }

  loadUrl(url, callback, languages, namespaces) {
    this.options.request(this.options, url, undefined, (err, res) => {
      if (res && ((res.status >= 500 && res.status < 600) || !res.status)) {
        if (this.options.omitDefaultPath) {
          return callback(
            `failed loading ${url}; status code: ${res.status}`,
            true /* retry */,
          );
        }
      }
      if (res && res.status >= 400 && res.status < 500) {
        if (this.options.omitDefaultPath) {
          return callback(
            `failed loading ${url}; status code: ${res.status}`,
            false /* no retry */,
          );
        }
      }
      if (
        !res &&
        err &&
        err.message &&
        err.message.indexOf('Failed to fetch') > -1
      ) {
        if (this.options.omitDefaultPath) {
          return callback(
            `failed loading ${url}: ${err.message}`,
            true /* retry */,
          );
        }
      }

      if (err) {
        if (this.options.omitDefaultPath) {
          return callback(err, false);
        }
      }

      const [parseErr, ret] = this.parseLoadUrl(
        res,
        url,
        languages,
        namespaces,
      );

      if (this.options.defaultLoadPath) {
        const { defaultLoadPath, ...opts } = this.options;
        const defaultConfigOptions = {
          ...opts,
          loadPath: defaultLoadPath,
        };

        const defaultConfigUrl = this.services.interpolator.interpolate(
          defaultLoadPath,
          { lng: languages, ns: namespaces },
        );

        return this.options.request(
          defaultConfigOptions,
          defaultConfigUrl,
          undefined,
          (error, response) => {
            if (
              response &&
              ((response.status >= 500 && response.status < 600) ||
                !response.status)
            ) {
              if (this.options.omitDefaultPath) return callback(null, ret);

              return callback(
                `failed loading default ${defaultConfigUrl}; status code: ${response.status}`,
                true /* retry */,
              );
            }
            if (response && response.status >= 400 && response.status < 500) {
              if (response.status === 404) {
                return callback(null, ret);
              }

              return callback(
                `failed loading default ${defaultConfigUrl}; status code: ${response.status}`,
                false /* no retry */,
              );
            }
            if (
              !response &&
              error &&
              error.message &&
              error.message.indexOf('Failed to fetch') > -1
            ) {
              if (this.options.omitDefaultPath) return callback(null, ret);

              return callback(
                `failed loading default ${defaultConfigUrl}: ${err.message}`,
                true /* retry */,
              );
            }

            if (error) {
              if (!err) {
                return callback(null, ret);
              }

              return callback(error, false);
            }

            const [, defaultRet] = this.parseLoadUrl(
              response,
              defaultConfigUrl,
              languages,
              namespaces,
            );

            if (parseErr) {
              if (this.options.omitDefaultPath) {
                return callback(null, defaultRet);
              }
            }

            const defaultTranslations = defaultRet || {};
            const translations = ret || {};

            return callback(
              null,
              mergeDeepRight(defaultTranslations, translations),
            );
          },
        );
      }

      if (parseErr) {
        return callback(parseErr, false);
      }

      return callback(null, ret);
    });
  }
}

export default Backend;
