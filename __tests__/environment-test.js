"use strict"

jest.dontMock('../environment.js');

describe('environment', () => {
  let environment = require('../environment.js');

  it('uses original config attributes if no env key is found', () => {
    let parsedConfig = environment.checkEnvironmentForConfig({
      key:'fromDefaultConfig'
    })

    expect(parsedConfig).toEqual({
      key:'fromDefaultConfig'
    });
  })

  it('correctly interperts the current config', () => {
    process.env.MENTION_BOT_CONFIG = `
      {
        "maxReviewers":3,
        "numFilesToCheck":5,
        "userBlacklist":[],
        "userBlacklistForPR":[],
        "userWhitelist":[],
        "fileBlacklist":[],
        "requiredOrgs":[],
        "findPotentialReviewers":true,
        "actions":["opened"],
        "skipAlreadyAssignedPR":false,
        "skipAlreadyMentionedPR":false,
        "delayed":false,
        "delayedUntil":"3d",
        "assignToReviewer":false,
        "skipTitle":"",
        "withLabel":"",
        "skipCollaboratorPR":false
      }
      `

    let parsedConfig = environment.checkEnvironmentForConfig({
      maxReviewers: 4,
      numFilesToCheck: 6,
      userBlacklist: ['user1'],
      userBlacklistForPR: ['user1','user2'],
      userWhitelist: ['user3'],
      fileBlacklist: ['**.md'],
      requiredOrgs: ['facebook'],
      findPotentialReviewers: false,
      actions: ['opened','closed'],
      skipAlreadyAssignedPR: true,
      skipAlreadyMentionedPR: true,
      delayed: true,
      delayedUntil: '1d',
      assignToReviewer: true,
      skipTitle: 'skippy',
      withLabel: 'labelly',
      skipCollaboratorPR: true,
    })

    expect(parsedConfig).toEqual({
      maxReviewers: 3,
      numFilesToCheck: 5,
      userBlacklist: [],
      userBlacklistForPR: [],
      userWhitelist: [],
      fileBlacklist: [],
      requiredOrgs: [],
      findPotentialReviewers: true,
      actions: ['opened'],
      skipAlreadyAssignedPR: false,
      skipAlreadyMentionedPR: false,
      delayed: false,
      delayedUntil: '3d',
      assignToReviewer: false,
      skipTitle: '',
      withLabel: '',
      skipCollaboratorPR: false,
    });
  });
});
