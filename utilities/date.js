function getDateString(year, month, day) {
    var date;
    if (year != null && month != null && day != null) {
        console.log(`getting date for input: ${year}.${month}.${day}`)
        date = new Date(year, month, day);
    } else {
        date = new Date();
    }
    date.setHours(date.getHours() - (date.getTimezoneOffset() / 60));
    return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
}

module.exports = getDateString;