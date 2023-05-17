const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveway = document.querySelector(".giveway");
const deadline = document.querySelector(".deadline");
const deadlineItems = document.querySelectorAll(".deadline-format h4");

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const dayOfMonth = futureDate.getDate();
const hours = futureDate.getHours();
let minutes = futureDate.getMinutes();
const weekday = weekdays[futureDate.getDay()];

let amPm = "am";

if (hours >= 12 && minutes > 0) amPm = "pm";
if (minutes < 10) minutes = "0" + minutes;

giveway.textContent = `giveway ends on ${weekday}, ${dayOfMonth} ${month} ${year} ${hours}:${minutes}${amPm}`;

function getRemainingTime() {
  const rightNow = new Date().getTime();
  const givewayDate = futureDate.getTime();

  const msLeft = Math.floor(givewayDate - rightNow);

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  const oneSecond = 1000;

  let days = Math.floor(msLeft / oneDay);
  let hours = Math.floor((msLeft / oneHour) % 24);
  let minutes = Math.floor((msLeft / oneMinute) % 60);
  let seconds = Math.floor((msLeft / oneSecond) % 60);

  const timeLeft = [days, hours, minutes, seconds];

  function formatZero(item) {
    if (item < 10) return (item = "0" + item);
    return item;
  }

  deadlineItems.forEach((item, index) => {
    item.innerHTML = formatZero(timeLeft[index]);
  });
  if (msLeft < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveway has expired</h4>`;
  }
}

let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();
