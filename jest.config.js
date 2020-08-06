module.exports = {
  name: 'ex-orb',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ex-orb',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
