import React from 'react';
import NewPost from '../../Post/NewPost';
import ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';

jest.mock('@fortawesome/react-fontawesome', () => {
  const originalModule = jest.requireActual('@fortawesome/react-fontawesome');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked FontAwesomeIcon'),
    FontAwesomeIcon: () => <div />
  };
});

it('toggles add form', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewPost username="asd" onNewPostAdded={() => { }} />, div);

  const btn = div.querySelector('.add-new-post-toggle-button');

  expect(btn).not.toBeNull();

  if (btn == null) {
    fail('btn in missing');
  }

  TestUtils.Simulate.click(btn);

  let newPostForm = div.querySelector('.new-post-form');

  expect(newPostForm).not.toBeNull();
  
  TestUtils.Simulate.click(btn);

  newPostForm = div.querySelector('.new-post-form');
  
  expect(newPostForm).toBeNull();
});
