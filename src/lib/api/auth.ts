import md5 from "md5";
import { api } from ".";

let currentDate: string;

const fetchCurrentDate = async () => {
  try {
    currentDate = (await api.currentDate()).date;
  } catch (error) {
    setTimeout(fetchCurrentDate, 500);
  }
};

const getCurrentDate = (): Promise<string> =>
  new Promise((resolve) => {
    if (!currentDate) setTimeout(() => resolve(getCurrentDate()), 10);
    else {
      resolve(currentDate);
      return currentDate;
    }
  });

const generateDummyBearer = (isoDate: string) => {
  const t1 = isoDate.substring(0, 13);
  let t2 = Number(isoDate.substring(14, 16));
  t2 = t2 - (t2 % 5);
  return `Bearer ${md5(`${process.env.REACT_APP_BS}${t1}${t2}`)}`;
};

fetchCurrentDate();
setInterval(fetchCurrentDate, 1000 * 60);

export const getDummyBearer = async () => {
  const currentDate = await getCurrentDate();
  return generateDummyBearer(currentDate);
};
