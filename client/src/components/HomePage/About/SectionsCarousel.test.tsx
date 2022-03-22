import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SectionsCarousel } from "./SectionsCarousel"

describe('Sections carousel', () => {
    test('Renders team in 2nd section', () => {
        render(<SectionsCarousel initialIndex={1} />)
        expect(screen.getByTestId('team')).toBeInTheDocument();
    })
    test('Does not render team in 1st section', () => {
        render(<SectionsCarousel initialIndex={0} />)
        expect(screen.queryByTestId('team')).not.toBeInTheDocument();
    })
    test('Does not render team in 3rd section', () => {
        render(<SectionsCarousel initialIndex={2} />)
        expect(screen.queryByTestId('team')).not.toBeInTheDocument();
    })
})