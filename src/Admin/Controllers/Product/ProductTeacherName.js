const products = require("../../../Model/Product");
const users = require("../../../Model/Users");

module.exports = async function (bot, message, admin, productId) {
  try {
    const userId = message.from.id;
    await users.findOneAndUpdate(
      {
        user_id: admin?.user_id,
      },
      {
        step: `addProduct#${productId}#price`,
      }
    );

    await products.findOneAndUpdate(
      {
        id: productId,
      },
      {
        teacher: message.text,
      }
    );

    await bot.sendMessage(userId, `Misollarni javoblarini rasimini yuboring`, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [
            {
              text: "⬅️ Ortga",
            },
          ],
        ],
      },
      parse_mode: "HTML",
    });
  } catch (err) {
    console.log(err + "");
  }
};
