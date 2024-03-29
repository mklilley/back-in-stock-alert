const axios = require("axios");
const schedule = require("node-schedule");
require("dotenv").config();

const outOfStockText = process.env.OUT_OF_STOCK_TEXT;

const url = process.env.URL;

const job = schedule.scheduleJob("*/5 * * * *", function (fireDate) {
  console.log(fireDate);
  checkIfOutOfStock();
});


async function checkIfOutOfStock() {
  try {
    const response = await axios.get(url);
    const id = response.data.search(outOfStockText);
    if (id == -1) {
      //send alert
      console.log("In stock");
      await telegramAlert("In stock");
    } else {
      console.log("Out of stock");
    }
  } catch (e) {
    console.log(e)
    await telegramAlert("**Error:** failed to check if item is in stock");
  }
}

async function telegramAlert(text) {
  const payload = {
    chat_id: process.env.CHAT_ID,
    parse_mode: "Markdown",
    text: text,
  };
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`,
      payload
    );
  } catch (e) {
    console.log(e);
  }
}
