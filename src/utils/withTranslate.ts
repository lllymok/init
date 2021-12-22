import i18n from 'i18n';

const withTranslateFn = (ns: string, path: string, options?: any) => {
  return i18n.t(`${ns}:${path}`, options);
};

export default withTranslateFn;
