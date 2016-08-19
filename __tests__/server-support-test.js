"use strict"

jest.dontMock('../server-support.js');

describe('server-support', () => {
  it('edits the issue state correctly when closing a PR', () => {
    let serverSupport = require('../server-support.js');

    var githubMock = {
      issues: {
        edit: jest.genMockFunction()
      }
    };

    serverSupport.closePr(
      githubMock,
      {
        repository: {
          owner: {
            login:'fbsamples'
          },
          name: 'bot-testing'
        },
        pull_request : {
          number:3
        }
      }
    );

    expect(githubMock.issues.edit.mock.calls.length).toBe(1);
    expect(githubMock.issues.edit.mock.calls[0][0]).toEqual({
      number: 3,
      repo: 'bot-testing',
      state: 'closed',
      user: 'fbsamples'
    });
  });
});
