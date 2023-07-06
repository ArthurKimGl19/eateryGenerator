export const loadState = (): object | undefined => {
    try {
        const serialState = localStorage.getItem('appState');
        if (serialState === null) {
            return undefined;
        }
        return JSON.parse(serialState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: object): void => {
    try {
        const serialState = JSON.stringify(state);
        localStorage.setItem('appState', serialState);
    } catch (err) {
        console.error(err);
    }
};
