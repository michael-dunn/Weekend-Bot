function getDateString(year, month, day) {
    var date;
    if (year != null && month != null && day != null) {
        date = new Date(year, month, day);
    } else {
        date = new Date();
    }
    date.setHours(date.getHours() - (date.getTimezoneOffset() / 60));
    return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
}

module.exports = getDateString;