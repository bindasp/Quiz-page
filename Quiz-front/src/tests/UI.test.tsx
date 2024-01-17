import {MyQuizzes} from '../features/quiz/MyQuizzes'
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';


test('MyQuizzes renders Title element', () => {
    render(<MyQuizzes />);
    const element = screen.getByText('Moje quizy');
    expect(element).toBeInTheDocument();
});