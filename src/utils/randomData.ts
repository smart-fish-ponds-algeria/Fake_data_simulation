import axios from "axios";
import {
  WATER_LEVEL_RANGE,
  SUSPENDED_SOLIDS_RANGE,
  SALINITY_RANGE,
  PH_RANGE,
  NITRITE_RANGE,
  NITRATE_RANGE,
  AMMONIA_RANGE,
  TEMPERATURE,
  O2_RANGE,
} from "../consts/waterTankRange";
import { BACK_END_URL } from "../config/CheckableEnv";
import { ExpressApiRoutes } from "../route.enum";

function random(min: number, max: number, isInt = false, decimals = 2): number {
  const rand = Math.random() * (max - min) + min;
  if (isInt) return parseInt(rand.toFixed(decimals));
  return parseFloat(rand.toFixed(decimals));
}
export const GenerateRandomData = async () => {
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
  const temperature = random(TEMPERATURE.min, TEMPERATURE.max);
  const O2 = random(O2_RANGE.min, O2_RANGE.max);
  const waterTanksRes = await axios.get(
    `${BACK_END_URL}/${ExpressApiRoutes.GET_WATER_TANK}`
  );

  const tanks_ids = waterTanksRes.data.data.map(
    (waterTank: { _id: any }) => waterTank._id
  ) as any[];

  if (tanks_ids.length < 1) return;
  const randomIndex: number = Math.floor(Math.random() * tanks_ids.length);

  // todo Fetch real tanks and use their ids
  const tankId = tanks_ids[randomIndex]; // random(TANK_ID.min, TANK_ID.max, true);

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
    temperature,
    O2,
  };
};
