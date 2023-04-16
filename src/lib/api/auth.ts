import md5 from "md5";
import { api } from ".";

let serverLocalDiffMs: number;

const fetchServerDate = () =>
  setTimeout(async () => {
    if (typeof serverLocalDiffMs === "number") return;
    const serverDate = new Date((await api.currentDate()).date).getTime();
    const localDate = new Date().getTime();
    serverLocalDiffMs = localDate - serverDate;
  }, 0);

const getCurrentDate = (): Promise<string> =>
  new Promise((resolve) => {
    if (typeof serverLocalDiffMs !== "number")
      setTimeout(() => resolve(getCurrentDate()), 50);
    else {
      const date = new Date();
      date.setMilliseconds(date.getMilliseconds() - serverLocalDiffMs);
      resolve(date.toISOString());
      return date.toISOString();
    }
  });

export const generateDummyBearer = (isoDate: string) => {
  const t1 = isoDate.substring(0, 13);
  let t2 = Number(isoDate.substring(14, 16));
  t2 = t2 - (t2 % 5);
  return `Bearer ${md5(`${process.env.REACT_APP_BS}${t1}${t2}`)}`;
};

fetchServerDate();

export const getDummyBearer = async () => {
  const currentDate = await getCurrentDate();
  return generateDummyBearer(currentDate);
};
