import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { act } from 'react-dom/test-utils';
import { TestMockWrapper } from 'test-utils/TestMockWrapper';
import { defaultOpeningHours } from 'utils/defaults';
import { OpeningHours } from '..';
describe('Opening hours', () => {
  test('Should display alert if isActive is false', () => {
    render(
      <TestMockWrapper isLoggedIn={true}>
        <OpeningHours isActive={false} />
      </TestMockWrapper>
    );
    expect(screen.getByTestId('active-alert')).toBeInTheDocument();
  });

  test('Should display opening hours dialog on save button click if checkbox is not checked', () => {
    render(
      <TestMockWrapper isLoggedIn={true}>
        <OpeningHours openingHours={defaultOpeningHours} isActive={false} alwaysOpen={false} />
      </TestMockWrapper>
    );
    const saveButton = screen.getByRole('button', { name: 'Save changes' });
    expect(screen.queryByTestId('opening-hours-dialog')).not.toBeInTheDocument();
    fireEvent.click(saveButton);
    expect(screen.getByTestId('opening-hours-dialog')).toBeInTheDocument();
  });

  test('Should disable opening hours card when checkbox is checked', async () => {
    render(
      <TestMockWrapper isLoggedIn={true}>
        <OpeningHours isActive={false} alwaysOpen={false} />
      </TestMockWrapper>
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(screen.getByTestId('opening-hours-container')).not.toHaveStyle({ opacity: '0.4', pointerEvents: 'none' });
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(screen.getByTestId('opening-hours-container')).toHaveStyle({ opacity: '0.4', pointerEvents: 'none' });
  });
  test('Should display day tabs correctly', () => {
    render(
      <TestMockWrapper isLoggedIn={true}>
        <OpeningHours isActive={false} openingHours={defaultOpeningHours} />
      </TestMockWrapper>
    );
    expect(screen.getAllByTestId('day-tab')).toHaveLength(7);
  });
  test('Should not display alert if isActive is true', () => {
    render(
      <TestMockWrapper isLoggedIn={true}>
        <OpeningHours isActive={true} />
      </TestMockWrapper>
    );
    expect(screen.queryByTestId('active-alert')).not.toBeInTheDocument();
  });
  test('Should display locations information if locations are passed as a property and not display activity alert, even if isActive is false ', () => {
    const selectedLocations = ['one', 'two', 'three'];
    render(
      <TestMockWrapper isLoggedIn={true}>
        <OpeningHours isActive={false} selectedLocations={selectedLocations} />
      </TestMockWrapper>
    );
    expect(screen.queryByTestId('active-alert')).not.toBeInTheDocument();
    expect(screen.getByTestId('locations-alert')).toBeInTheDocument();
    // checking if alert displays valid selected locations count
    expect(screen.getByTestId('locations-alert')).toHaveTextContent(/3/);
  });
});
