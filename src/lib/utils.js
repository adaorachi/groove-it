import dayjs from "dayjs";

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const truncate = (str, len) =>
  str?.length
    ? str.length <= len
      ? `${str.slice(0, len)}`
      : `${str.slice(0, len)}...`
    : null;

export const formatNumWithCommas = (num) => {
  return num !== ""
    ? num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";
};

export const formatIndexToDouble = (num) => {
  return num.toString().length === 1 ? `0${num}` : num.toString();
};

export function formatTime(seconds) {
  if (seconds < 0) {
    return "Invalid time";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let timeString = "";
  if (hours > 0) {
    timeString += hours + " hrs ";
  }
  if (minutes > 0) {
    timeString += minutes + " mins ";
  }
  if (remainingSeconds > 0) {
    timeString += remainingSeconds + " secs";
  }

  return timeString.trim();
}

export const formatDuration = (seconds) => {
  if (isNaN(seconds) || seconds < 0) {
    return "Invalid input";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${formattedMinutes}:${formattedSeconds}`;
};

export function formatDateString(date) {
  return dayjs(date).format("DD-MM-YYYY");
}

export function formatNumberWithCommas(number) {
  if (typeof number !== "number") {
    throw new Error("Input must be a number");
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const floatToTime = (floatTime) => {
  const num = floatTime.toFixed(2);
  if (!(typeof floatTime !== "number" || isNaN(floatTime))) {
    const [minutes, seconds] = num.toString().split(".");
    return `${minutes}:${seconds?.slice(0, 2) || "00"}`;
  } else {
    return "0:00";
  }
};

const isNumber = (value) => {
  return typeof value === "number" && !isNaN(value);
};

const generateRandomNumbers = (count, min, max) => {
  if (isNumber(count) && isNumber(min) && isNumber(max)) {
    const numbers = Array.from(
      { length: max - min + 1 },
      (_, index) => index + min
    );

    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers.slice(0, count);
  }

  return [];
};

export const getRandomList = (arr, count, min, max) => {
  const randomNums = generateRandomNumbers(count, min, max);

  return arr?.length
    ? arr?.filter((_, index) => randomNums.includes(index + 1))
    : [];
};

export const getFormatData = (arr, image_alt) => {
  return arr?.length
    ? arr?.map((item, index) => {
        return {
          index: index,
          id: item?.id,
          image:
            item?.picture_big ||
            item?.cover_big ||
            item?.album?.cover_big ||
            image_alt,
          name: item?.title || item?.name,
          desc:
            item?.artist?.name ||
            item?.description ||
            item?.details?.description,

          albumId: item?.album?.id,
          albumTitle: item?.album?.title,
          artistId: item?.artist?.id,
          artistName: item?.artist?.name,
          genres: item?.genres,
          type: item?.type,
          duration: item?.duration,
          releaseDate: item?.release_date || item?.creation_date,
          contributors: item?.contributors,
          tracksNo: item?.track_total || item?.nb_tracks,
          albumsNo: item?.nb_album || item?.details?.nb_album,
          fansNo: item?.nb_fan || item?.fans || item?.details?.nb_fan,
          audioSrc: item?.preview,
          tracks: item?.tracks,
          details: item?.details,
        };
      })
    : [];
};

export const pluralize = (word, count) => {
  const wordsList = {
    track: "tracks",
    album: "albums",
    fan: "fans",
  };

  return count > 1 ? wordsList[word] : word;
};

export const fileBlob = (files) => {
  if (files?.[0]) {
    return {
      blobName: files[0]?.name,
      blobUrl: URL.createObjectURL(files[0]),
    };
  } else {
    return {};
  }
};

export const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

export const uniqueObjectArray = (arrayOfObjects) =>
  arrayOfObjects.filter(
    (obj, index, self) =>
      index === self.findIndex((o) => Object.keys(o)[0] === Object.keys(obj)[0])
  );

export const elementInArray = (array, ele) =>
  array.some((obj) => Object.keys(obj)[0] === Object.keys(ele)[0]);
