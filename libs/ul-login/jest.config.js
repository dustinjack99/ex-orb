module.exports = {
  name: 'ul-login',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ul-login',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
