import { screen, act } from '@testing-library/react';

import Loading from '../Loading';
import { renderWithProviders } from '../../../utils/test-utils';

const advanceTimers = (time) => {
    act(() => {
        jest.advanceTimersByTime(time);
    });
};

describe('Successfully renders loading component', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('Renders loading component with default text', () => {
        renderWithProviders(<Loading />);

        const text = screen.getByText(/loading/i);
        expect(text).toBeInTheDocument();
    });

    test('updates text content with additional dot every speed milliseconds', () => {
        renderWithProviders(<Loading text="Loading" speed={300} />);

        advanceTimers(300);
        expect(screen.getByText(/loading./i)).toBeInTheDocument();

        advanceTimers(300);
        expect(screen.getByText(/loading../i)).toBeInTheDocument();

        advanceTimers(300);
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();

        advanceTimers(300);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
});
