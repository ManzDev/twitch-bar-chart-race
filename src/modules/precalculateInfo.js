import { getRandomColor } from "@/modules/getRandomColor.js";

const info = {
  totalUsers: 0,
  maxMessages: 0,
  users: {}
};

export const precalculateInfo = (data) => {
  for (const day in data) {
    const usersPerStream = data[day];
    for (const item of usersPerStream) {
      if (!info.users[item.username]) {
        info.users[item.username] = { count: 0, color: getRandomColor() };
      }
      info.users[item.username].count += Number(item.count);
    }
  }

  info.totalUsers = Object.keys(info.users).length;

  for (const name in info.users) {
    if (Number(info.users[name].count) > info.maxMessages) {
      info.maxMessages = Number(info.users[name].count);
    }
  }

  return info;
};
