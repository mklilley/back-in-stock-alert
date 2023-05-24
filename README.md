# Back in stock alert

A web service that will check whether an out of stock item you want to buy online has become available and then message you on Telegram.

## Using this repo

First, you'll need to [create a telegram bot](https://core.telegram.org/bots#how-do-i-create-a-bot) and acquire its authentication `TOKEN`. 

Next, you'll need to get the `CHAT_ID` for the chat between you and your bot (so that you'll have somewhere to send notifications to):
- Send a message to your new bot
- Open a new browser tab and visit `https://api.telegram.org/bot{insert_your_token_here}/getUpdates`
- Find the data associated with "chat" - the "id" field is the CHAT_ID

Now, you'll need to get the `URL` of the webpage where your out of stock product is listed

Finally you'll need to find some `OUT_OF_STOCK_TEXT` - this is text that only appears when a product is out of stock. The best way to find this is to compare with other products that are in stock.

Once you've set `TOKEN`, `CHAT_ID`, `URL` and `OUT_OF_STOCK_TEXT` as environment variables you can then run `npm install` and `npm start` to start the server - it will check the product page every 5 minutes and notify you when the product is back in stock.
