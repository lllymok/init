import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
const SwitchLanguages = () => {
  const { t } = useTranslation(['common']);

  const handleLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
    console.log(lng);
  };
  return (
    <ul>
      <button onClick={() => handleLanguage('en')}>{t('common:en')}</button>
      <button onClick={() => handleLanguage('fr')}>{t('common:fr')}</button>
    </ul>
  );
};

export default SwitchLanguages;
