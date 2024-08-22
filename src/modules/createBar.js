const calcSizeBar = (width) => width * 4;

export const DEFAULT_TOTAL_BARS = 8;
export const DEFAULT_PADDING_BAR = 8;
export const DEFAULT_HEIGHT_BAR = 35;

export const createBar = (item, info, position) => {
  const bar = document.createElement("div");
  bar.classList.add("bar");
  bar.dataset.username = item.username;
  bar.style.setProperty("--width", item.username.length);
  bar.style.setProperty("--color", info.users[item.username].color);
  bar.style.setProperty("--y", `${position * (DEFAULT_HEIGHT_BAR + DEFAULT_PADDING_BAR)}px`);
  console.log({ item, position });
  bar.style.width = `${calcSizeBar(item.count)}px`;
  bar.innerHTML = `<span class="count">${item.count}</span>`;
  return bar;
};
