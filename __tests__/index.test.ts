import { is } from '../';

interface Car {
  power: number
}
interface FuelCar extends Car {
  tank:number
}
interface ElectricCar extends Car {
  battery:number
  singlePedalDrive: boolean
}

const mustang:FuelCar = {
  power: 450,
  tank: 60
}
const tesla:ElectricCar = {
  battery: 100,
  power: 700,
  singlePedalDrive: true
}

describe('Should work with basic types', () => {
  describe('Should work with TS checkable instances', () => {
    it("Should work with strings", () => {
      expect(is<string>("Hello world", "length")).toBe(true);
    });
    it("Should work with arrays", () => {
      expect(is<string[]>(["Hello", "World"], "length")).toBe(true);
    });
    it("Should work with many keys", () => {
      expect(is<string[]>(["Hello", "World"], ["length", "concat"])).toBe(true);
    });
  });
  describe('Should work with TS runtime instances', () => {
    it("Should work with strings", () => {
      expect(is<string>(JSON.parse(JSON.stringify("Hello world")), "length")).toBe(true);
    });
    it("Should work with arrays", () => {
      expect(is<string[]>(JSON.parse(JSON.stringify(["Hello", "World"])), "length")).toBe(true);
    });
    it("Should work with many keys", () => {
      expect(is<string[]>(JSON.parse(JSON.stringify(["Hello", "World"])), ["length", "concat"])).toBe(true);
    });
  });
});
describe('Should work with TS types', () => {
  describe('Should work with TS checkable instances', () => {
    it("Should work with single keys check", () => {
      expect(is<FuelCar>(mustang, "tank")).toBe(true);
    });
    it("Should work with arrays", () => {
      expect(is<ElectricCar>(tesla, ["battery", "singlePedalDrive"])).toBe(true);
    });
  });
  describe('Should work with TS runtime instances', () => {
    it("Should work with single key check", () => {
      expect(is<FuelCar>(JSON.parse(JSON.stringify(mustang)), "tank")).toBe(true);
    });
    it("Should work with multiple keys check", () => {
      expect(is<ElectricCar>(JSON.parse(JSON.stringify(tesla)), ["battery", "singlePedalDrive"])).toBe(true);
    });
  });
  describe('Should return false with wrong instances', () => {
    it("Should work with single key check", () => {
      expect(is<ElectricCar>(JSON.parse(JSON.stringify(mustang)), "battery")).toBe(false);
    });
    it("Should work with multiple keys check", () => {
      expect(is<FuelCar>(JSON.parse(JSON.stringify(tesla)), ["tank", "power"])).toBe(false);
    });
  });
  describe('Should base the check on the selected keys', () => {
    it("A complete check should work", () => {
      expect(is<ElectricCar>(JSON.parse(JSON.stringify({
        battery: undefined,
        power: undefined,
        singlePedalDrive: undefined
      })), ["battery", "singlePedalDrive"])).toBe(false);
    });
    it("A partial check should generate a false positive check", () => {
      expect(is<ElectricCar>(JSON.parse(JSON.stringify(mustang)), "power")).toBe(true);
    });
  });
});
