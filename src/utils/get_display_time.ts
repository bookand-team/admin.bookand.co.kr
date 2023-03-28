type DisplayFormat = 'timeDiff' | 'yyyy-mm-dd hh:mm:ss' | 'yyyy-mm-dd hh:mm' | 'mm/dd hh:mm' | 'mm-dd hh:mm';

/**
 * 날짜 데이터를 원하는 형식으로 변환
 * @param date 변환할 날짜 정보
 * @param format 변환할 형식, default: 00시간 전 ex)'yyyy-mm-dd hh:mm:ss', 'yyyy-mm-dd hh:mm', 'mm/dd hh:mm'
 */
const getDisplayTime = (date: string, format: DisplayFormat = 'timeDiff'): string => {
  const currentDateTime = new Date();  // 현재 시각
  const displayDateTime = new Date(date);  // 표시할 시각

  const dateTime = {
    year: displayDateTime.getFullYear().toString(),
    month: (displayDateTime.getMonth() + 1).toString().padStart(2, '0'),
    day: displayDateTime.getDate().toString().padStart(2, '0'),
    hour: displayDateTime.getHours().toString().padStart(2, '0'),
    minute: displayDateTime.getMinutes().toString().padStart(2, '0'),
    second: displayDateTime.getSeconds().toString().padStart(2, '0')
  };
  const timeDiff = currentDateTime.getTime() - displayDateTime.getTime();

  switch (format) {
    case 'yyyy-mm-dd hh:mm:ss':
      return `${dateTime.year}-${dateTime.month}-${dateTime.day} ${dateTime.hour}:${dateTime.minute}:${dateTime.second}`;
    case 'yyyy-mm-dd hh:mm':
      return `${dateTime.year}-${dateTime.month}-${dateTime.day} ${dateTime.hour}:${dateTime.minute}`;
    case 'mm/dd hh:mm':
      if (currentDateTime.getFullYear() !== displayDateTime.getFullYear()) {
        return `${dateTime.year.substring(2, 4).padStart(2, '0')}/${dateTime.month}/${dateTime.day} ${dateTime.hour}:${dateTime.minute}`;
      }
      return `${dateTime.month}/${dateTime.day} ${dateTime.hour}:${dateTime.minute}`;
    case 'mm-dd hh:mm':
      if (currentDateTime.getFullYear() !== displayDateTime.getFullYear()) {
        return `${dateTime.year.substring(2, 4).padStart(2, '0')}-${dateTime.month}-${dateTime.day} ${dateTime.hour}:${dateTime.minute}`;
      }
      return `${dateTime.month}-${dateTime.day} ${dateTime.hour}:${dateTime.minute}`;
    default:
      if (timeDiff > 31536000000) {
        return `${Math.floor(timeDiff / 31536000000)}년 전`;
      }
      if (timeDiff > 2592000000) {
        return `${Math.floor(timeDiff / 2592000000)}달 전`;
      }
      if (timeDiff > 86400000) {
        return `${Math.floor(timeDiff / 86400000)}일 전`;
      }
      if (timeDiff > 3600000) {
        return `${Math.floor(timeDiff / 3600000)}시간 전`;
      }
      if (timeDiff > 60000) {
        return `${Math.floor(timeDiff / 60000)}분 전`;
      }
      return '방금 전';
  }
};

export default getDisplayTime;