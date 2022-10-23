/**
 * 날짜 데이터를 원하는 형식으로 변환
 * @param {String} date 변환할 날짜 정보
 * @param {String} method 변환할 형식, default: 00시간 전 ex)'yyyy-mm-dd hh:mm:ss', 'yyyy-mm-dd hh:mm', 'mm/dd hh:mm'
 */
const getDisplayTime = (date = '', method = 'timeDiff') => {
  const now = new Date();
  const pastDate = new Date(date);

  if (method !== 'timeDiff') {
    const datetime = {
      year: pastDate.getFullYear().toString(),
      month: (pastDate.getMonth() + 1).toString().padStart(2, '0'),
      day: pastDate.getDate().toString().padStart(2, '0'),
      hour: pastDate.getHours().toString().padStart(2, '0'),
      minute: pastDate.getMinutes().toString().padStart(2, '0'),
      second: pastDate.getSeconds().toString().padStart(2, '0')
    };
    if (method === 'yyyy-mm-dd hh:mm:ss') {
      return `${datetime.year}-${datetime.month}-${datetime.day} ${datetime.hour}:${datetime.minute}:${datetime.second}`;
    } else if (method === 'yyyy-mm-dd hh:mm') {
      return `${datetime.year}-${datetime.month}-${datetime.day} ${datetime.hour}:${datetime.minute}`;
    } else if (method === 'mm/dd hh:mm') {
      if (now.getFullYear() !== pastDate.getFullYear()) {
        return `${datetime.year.substring(2, 4).padStart(2, '0')}/${datetime.month}/${datetime.day} ${datetime.hour}:${datetime.minute}`;
      }
      return `${datetime.month}/${datetime.day} ${datetime.hour}:${datetime.minute}`;
    }
  } else {
    const timeDiff = now.getTime() - pastDate.getTime();

    if (timeDiff > 31536000000) {
      return `${parseInt(timeDiff / 31536000000)}년 전`;
    }
    if (timeDiff > 2592000000) {
      return `${parseInt(timeDiff / 2592000000)}달 전`;
    }
    if (timeDiff > 86400000) {
      return `${parseInt(timeDiff / 86400000)}일 전`;
    }
    if (timeDiff > 3600000) {
      return `${parseInt(timeDiff / 3600000)}시간 전`;
    }
    if (timeDiff > 60000) {
      return `${parseInt(timeDiff / 60000)}분 전`;
    }
    return '방금 전';
  }
};

export default getDisplayTime;