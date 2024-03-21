import React from 'react';
import { useTranslation } from 'react-i18next';

import usa from './../../images/icon/usa.png';
import vn from './../../images/icon/vn.webp';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const isEnglish = i18n.language.includes('en');
  const isVietnamese = i18n.language.includes('vi');

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button

        onClick={() => changeLanguage('vi')}
        style={{ backgroundColor: isVietnamese ? 'white' : '#ffa133', height: '40px', width: '40px', border: 'none' }}
        aria-label="Switch to Vietnamese"
        title="Tiếng Việt"
      >
        <img src={vn} alt="Vietnamese flag" />
      </button>
      <button
        onClick={() => changeLanguage('en')}
        style={{ backgroundColor: isEnglish ? 'white' : '#ffa133', height: '40px', width: '40px', border: 'none' }}
        aria-label="Switch to English"
        title="English"
      >
        <img src={usa} alt="USA flag" />
      </button>
    </div>
  );
}

export default LanguageSwitcher;
