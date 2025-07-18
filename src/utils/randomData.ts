import {
  WATER_LEVEL_RANGE,
  SUSPENDED_SOLIDS_RANGE,
  SALINITY_RANGE,
  PH_RANGE,
  NITRITE_RANGE,
  NITRATE_RANGE,
  AMMONIA_RANGE,
  TANK_ID,
} from "../consts/waterTankRange";

const DUMMY_DATA_PATH = "src/dummy_image_dataset";

function random(min: number, max: number, isInt = false, decimals = 2): number {
  const rand = Math.random() * (max - min) + min;
  if (isInt) return parseInt(rand.toFixed(decimals));
  return parseFloat(rand.toFixed(decimals));
}
export const GenerateRandomData = () => {
  const timestamp = new Date().toISOString();

  const water_level = random(WATER_LEVEL_RANGE.min, WATER_LEVEL_RANGE.max);
  const suspended_solids = random(
    SUSPENDED_SOLIDS_RANGE.min,
    SUSPENDED_SOLIDS_RANGE.max
  );
  const salinity = random(SALINITY_RANGE.min, SALINITY_RANGE.max);
  const pH = random(PH_RANGE.min, PH_RANGE.max);
  const nitrite = random(NITRITE_RANGE.min, NITRITE_RANGE.max);
  const nitrate = random(NITRATE_RANGE.min, NITRATE_RANGE.max);
  const ammonia = random(AMMONIA_RANGE.min, AMMONIA_RANGE.max);
  const tankId = "6879dc0022d3120bf58b8ce2"; // random(TANK_ID.min, TANK_ID.max, true);

  return {
    tankId,
    timestamp,
    water_level,
    suspended_solids,
    salinity,
    pH,
    nitrite,
    nitrate,
    ammonia,
  };
};
