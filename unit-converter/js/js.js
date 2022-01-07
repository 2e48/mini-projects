
const unitObj = (name, unit, base) => {
  return {
    /**
     * @type string
     */
    name: name,
    /**
     * @type string
     */
    unit: unit,

    // how many meters is the unit?
    /**
     * @type double
     */
    base: base,
  }
};

const convert = (value, baseUnit, toUnit, units = lengthUnits) => {
  if (baseUnit === toUnit) {
    return value;
  }

  // convert the unit first to meter
  const base = units.find(u => u.unit == baseUnit || u.name == baseUnit);
  const meters = value * base.base;

  // then convert meter to the target units
  const target = units.find(u => u.unit == toUnit || u.name == toUnit);
  const newValue = meters / target.base;

  return newValue;
};

const lengthUnits = [
  unitObj('millimeter', 'mm', 0.001),
  unitObj('centimeter', 'cm', 0.01),
  unitObj('meter', 'm', 1),
  unitObj('kilometer', 'km', 1000),
  unitObj('inch', 'in', 0.0254),
  unitObj('feet', 'ft', 0.3048),
  unitObj('yard', 'yd', 0.9144),
  unitObj('mile', 'mi', 1609.35),
  unitObj('fathom', 'ftm', 1.852),
  unitObj('nautical mile', 'nmi', 1852),
  unitObj('Toyota Corolla', 'corolla', 4.175),
];


console.log(convert(3, 'in', 'corolla'));