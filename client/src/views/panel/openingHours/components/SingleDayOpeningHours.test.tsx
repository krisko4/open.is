import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import _ from 'lodash';
import { FC, useState } from 'react';
import { OpeningHoursProps } from 'store/slices/PlaceProps';
import { TestMockWrapper } from 'test-utils/TestMockWrapper';
import { defaultOpeningHours } from 'utils/defaults';
import { SingleDayOpeningHours } from './SingleDayOpeningHours';

interface Props {
  openingHours: OpeningHoursProps;
}

const Wrapper: FC<Props> = ({ openingHours }) => {
  const [hours, setHours] = useState(openingHours);
  return <SingleDayOpeningHours day={'monday'} openingHours={hours} setOpeningHours={setHours} />;
};

describe('Single day opening hours', () => {
  test('Should display closed door if day is closed', () => {
    render(
      <TestMockWrapper isLoggedIn={true}>
        <Wrapper openingHours={defaultOpeningHours} />
      </TestMockWrapper>
    );
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
    expect(screen.queryByTestId('time-picker-container')).not.toBeInTheDocument();
    expect(screen.getByTestId('closed-container')).toBeInTheDocument();
  });
  test('Should display error alert if user provides closing hour which is earlier than opening hour', () => {
    const hours = _.cloneDeep(defaultOpeningHours);
    hours['monday'].open = true;
    render(
      <TestMockWrapper isLoggedIn={true}>
        <Wrapper openingHours={hours} />
      </TestMockWrapper>
    );
    const penIcons = screen.getAllByTestId('PenIcon');
    expect(penIcons).toHaveLength(2);
    penIcons.forEach((penIcon) => {
      fireEvent.click(penIcon);
    });
    // const openingHourInput = screen.getByTestId('opening-hour-input')
    // expect(openingHourInput).toBeInTheDocument();
    // screen.debug()
    // const closingHourInput = screen.getByTestId('closing-hour-input')
    // expect(closingHourInput).toBeInTheDocument();
    // fireEvent.change(openingHourInput, {target: {value: '16:00'}})
    // fireEvent.change(closingHourInput, {target: {value: '15:00'}})
    // expect(screen.getByTestId('error-alert')).toBeInTheDocument();
  });
  test('Should display time pickers and close button if day is open', () => {
    const hours = _.cloneDeep(defaultOpeningHours);
    hours['monday'].open = true;
    render(
      <TestMockWrapper isLoggedIn={true}>
        <Wrapper openingHours={hours} />
      </TestMockWrapper>
    );
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    expect(screen.getByTestId('time-picker-container')).toBeInTheDocument();
    expect(screen.queryByTestId('closed-container')).not.toBeInTheDocument();
  });
});
