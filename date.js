const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

// https://stackoverflow.com/a/53800501/8943850
exports.getRelativeTime = (d1, d2 = new Date()) => {
  if (!(d1 instanceof Date)) {
    d1 = new Date(d1);
  }
  if (!(d2 instanceof Date)) {
    d2 = new Date(d2);
  }
  const elapsed = d1 - d2;

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (const u in units) {
    if (Math.abs(elapsed) > units[u] || u == 'second') {
      return rtf.format(Math.round(elapsed / units[u]), u);
    }
  }
};
