const THEME_KEY = 'app-theme';

export const ThemeService = {
    getStoredTheme: () => {
        return localStorage.getItem(THEME_KEY);
    },
    setStoredTheme: (theme) => {
        localStorage.setItem(THEME_KEY, theme);
    },
    getPreferredTheme: () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    },
    applyTheme: (theme) => {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(`${theme}-theme`);
    }
};
