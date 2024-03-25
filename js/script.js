let maxAmount = 0;

fetch('json/data.json')
  .then(response => response.json())
  .then(data => {
    maxAmount = Math.max(...data.map(item => item.amount));

    data.forEach(item => {
      let isActualDay = item.day === new Date().toLocaleString('en', { weekday: 'short' }).toLowerCase();
      createBar(item, isActualDay);
    });
  })
  .catch(error => console.error('Error:', error));

let spending__card__bars = document.querySelector('.spending__card__bars');

function createBar(item, isActualDay) {
  amount = calculatePercentage(item);
  spending__card__bars.innerHTML += `
            <div class="bar">
                <span class="bar__amount" style="--bottom: ${amount}px ">$${item.amount}</span>
                <div class="bar__fill ${ isActualDay ? 'actual_day' : '' }" style="--height-bar:${amount}px"></div>
                <span class="bar__day">${item.day}</span>
            </div>
        `;
}

function calculatePercentage(item) {
  return (item.amount / maxAmount) * 110 + 5;
}