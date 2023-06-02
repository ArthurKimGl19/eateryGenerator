//custom hooks to use localStorage instead of persisting redux in localStorage
export const decodeLocalStorageKey = function (key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        return localStorage.getItem(key);
    }
};
export const useLocalStorage = function (key, value) {
    const [state, setState] = React.useState(() =>
        localStorage.getItem(key) ? decodeLocalStorageKey(key) : value
    );
    React.useEffect(() => {
        if (typeof state === 'object') {
            localStorage.setItem(key, JSON.stringify(state));
        } else {
            localStorage.setItem(key, state);
        }
    }, [state]);
    return [state, setState];
};
