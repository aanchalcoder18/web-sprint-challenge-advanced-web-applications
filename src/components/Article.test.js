import React from 'react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';
import { render, screen } from '@testing-library/react';

const testEditorial = 
{
    id: 'aMqwd', //unique article id
    headline: "headline", //title of article
    createdOn: '2021-08-09T18:02:38-04:00', //timestamp of when article was added
    summary: "summary", //short summary statement of article
    body: ""  //paragraph of article text
}

test('renders component without errors', ()=> {
    render(<Article article={testEditorial}/>)
});

test('renders headline, author from the article when passed in through props', ()=> {
    // arrange
    render(<Article article={testEditorial}/>)
    // act
    const title = screen.queryByTestId('headline')
    const publisher = screen.queryByTestId('author')
    // assert
    expect(title).toBeInTheDocument();
    expect(publisher).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={testEditorial}/>)
    const publisher = screen.queryByTestId('author')
      expect(publisher).toHaveTextContent(/Associated Press/i)
});

test('executes handleDelete when the delete button is pressed', ()=> {
    const handleDelete = jest.fn();
    render(<Article article={testEditorial} handleDelete={handleDelete}/>)
    const deleteBTN = screen.queryByTestId('deleteButton')
        userEvent.click(deleteBTN);
          expect(handleDelete).toHaveBeenCalled();
});

//Task List:
//1. Complete all above tests. Create test article data when needed.