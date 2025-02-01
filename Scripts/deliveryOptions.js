import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
	{
		id: '1',
		deliveryDay: 7,
		costCents: 0,
	},
	{
		id: '2',
		deliveryDay: 3,
		costCents: 499,
	},
	{
		id: '3',
		deliveryDay: 1,
		costCents: 999,
	},
];

export function getDeliveryOption(deliveryOptionId) {
	let deliveryOption;

	deliveryOptions.forEach((option) => {
		if (deliveryOptionId === option.id) {
			deliveryOption = option;
		}
	});

	return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
	const now = dayjs();
    let deliveryDate = now.add(deliveryOption.deliveryDay, 'days'); 
    let notWeekend = deliveryDate; 
    while (
		deliveryDate.format('dddd') === 'Saturday' ||
		deliveryDate.format('dddd') === 'Sunday'
    ) {
        deliveryDate = deliveryDate.add(1, 'day');
        notWeekend = deliveryDate;
    } 
	const deliveryDateString = notWeekend.format('dddd, MMMM D');

	return deliveryDateString;
}
