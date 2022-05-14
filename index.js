import cron from 'node-cron';
import axios from 'axios';
import _get from 'lodash/get.js';

const desiredAmountInUST = 10000.00; // $10,000.00 UST
const notifyMessage = 'Available amount:';

const contractURL = 'https://fcd.terra.dev/v1/bank/terra169urmlm8wcltyjsrn7gedheh7dker69ujmerv2';

// run every 2 seconds
cron.schedule('*/2 * * * * *', async () => {
  try {
    const response = await axios.get(contractURL);
  
    const availableAmount = _get(response, 'data.balance[0].available');
    const availableAmountInUST = availableAmount && availableAmount / 1000000; // format to decimal value
  
    console.log(`${notifyMessage} `, availableAmountInUST);
  
    if (availableAmountInUST > desiredAmountInUST) {
      notifier.notify(`${notifyMessage} ${amount} UST`);
    }
  } catch (err) {
    console.log('Error fetching contract amount: ', err);
  }
});

