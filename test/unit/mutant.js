const { expect } = require('chai');

const Config = require('../../config');
const Mutant = require('../../src');

describe('Mutants', () => {
  before(() => {
    this.badIds = ['', 'no-such-id', 'no_such_id'];

    this.extendId = (id) => {
      const maxLength = 100;
      const length = Math.floor(Math.random() * maxLength);
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
      const charactersLength = characters.length;
      id += '_';

      for (let i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return id;
    };

    this.generateImagingIds = (imagingId) => {
      const count = 100;
      const ids = [];

      for (let i = 0; i < count; i++) {
        ids.push(this.extendId(imagingId));
      }
      return ids;
    }
  });

  describe('success', () => {
    it('should create correct mutants', () => {
      Object.keys(Config).forEach((imagingId) => {
        const { imagingType, bodyPart, sex } = Config[imagingId]

        const imagingIds = this.generateImagingIds(imagingId);
        imagingIds.forEach((imagingId) => {
          const mutant = Mutant.create(imagingId);
          expect(mutant).to.eql({ imagingType, bodyPart, sex });
        });
      });
    });

    it('should create correct mutant patterns', () => {
      Object.keys(Config).forEach((imagingId) => {
        const { imagingType, bodyPart, sex } = Config[imagingId]

        const imagingIds = this.generateImagingIds(imagingId);
        imagingIds.forEach((imagingId) => {
          const mutant = Mutant.createPattern(imagingId);
          expect(mutant).to.eql(`${imagingType}.${bodyPart}.${sex}`);
        });
      });
    });
  });

  describe('failure', () => {
    it('should fail unrecognized human on creation', async () => {
      this.badIds.forEach((badId) => {
        expect(Mutant.create.bind(this, badId)).to.throw(`Uncrecognized imaging id: ${badId}`);
      });
    });

    it('should fail unrecognized human on pattern creation', async () => {
      this.badIds.forEach((badId) => {
        expect(Mutant.createPattern.bind(this, badId)).to.throw(`Uncrecognized imaging id: ${badId}`);
      });
    });
  });
});
