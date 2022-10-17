const axios = require("axios");
const schedule = require("node-schedule");
require("dotenv").config();

const outOfStockText = "Back in stock soon";

const url =
  "https://ao.com/product/eib15050a1duk1-indesit-fridge-freezer-white-79565-28.aspx";

const job = schedule.scheduleJob("*/1 * * * *", function (fireDate) {
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
    } else {
      console.log("Out of stock");
      await telegramAlert();
    }
  } catch (e) {
    // send alert that something has gone wrong with axios
  }
}

async function telegramAlert() {
  const payload = {
    chat_id: "@urgent_lilley",
    parse_mode: "Markdown",
    text: "**TEST**",
  };
  try {
    const response = axios.post(
      `https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`,
      payload
    );
  } catch (e) {
    console.log(e);
  }
}
