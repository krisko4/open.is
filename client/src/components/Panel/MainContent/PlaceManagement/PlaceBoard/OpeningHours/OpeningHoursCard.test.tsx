import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { defaultOpeningHours } from 'utils/defaults';
import { OpeningHoursCard } from './OpeningHoursCard';
import _ from 'lodash';


describe('Opening hours card', () => {
    test('Should render days correctly', () => {
        render(<OpeningHoursCard openingHours={defaultOpeningHours} />);
        expect(screen.getAllByTestId('day')).toHaveLength(7);
    })

    test('Should render closed buttons when place is closed all week', () => {
        render(<OpeningHoursCard openingHours={defaultOpeningHours} />);
        expect(screen.getAllByTestId('closed-button')).toHaveLength(7);
        expect(screen.queryByTestId('open-date')).not.toBeInTheDocument();
    })
    test('Should render hours when place is open all week', () => {
        const hours = _.cloneDeep(defaultOpeningHours);
        for(const value of Object.values(hours)){
            value.open = true;
        }
        render(<OpeningHoursCard openingHours={hours} />);
        expect(screen.queryByTestId('closed-button')).not.toBeInTheDocument();
        expect(screen.getAllByTestId('open-date')).toHaveLength(7);
    })
    test('Should render hours and closed buttons in mixed case', () => {
        const hours = _.cloneDeep(defaultOpeningHours);
        hours.monday.open = true;
        hours.tuesday.open=true;
        render(<OpeningHoursCard openingHours={hours} />);
        expect(screen.getAllByTestId('closed-button')).toHaveLength(5);
        expect(screen.getAllByTestId('open-date')).toHaveLength(2);
    })
})