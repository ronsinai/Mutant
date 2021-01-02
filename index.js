const Config = require('./config');

const KEYS = ['imagingType', 'bodyPart', 'sex'];

exports.create = (imagingId) => {
  try {
    const { imagingType, bodyPart, sex } = Config[imagingId.split('_')[0]];
    return { imagingType, bodyPart, sex };
  }
  catch (err) {
    throw new Error(`Uncrecognized imaging id: ${imagingId}`)
  }
};

exports.createPattern = (imagingId) => {
  try {
    const { imagingType, bodyPart, sex } = Config[imagingId.split('_')[0]];
    return `${imagingType}.${bodyPart}.${sex}`;
  }
  catch (err) {
    throw new Error(`Uncrecognized imaging id: ${imagingId}`)
  }
};
