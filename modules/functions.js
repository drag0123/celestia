// This is the functions file, you can place any function in here.

module.exports = (client) => {

  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };

  client.awaitEmbedReply = async (message, question, filter, limit = 60000, embed) => {
    await message.channel.send(question, embed);
    try {
      const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (error) {
      client.logger.error(error);
      return false;
    }
  };
  
  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  Number.prototype.between = function(a, b) {
    const min = Math.min.apply(Math, [a, b]),
          max = Math.max.apply(Math, [a, b]);
    return this > min && this < max;
  };

  client.wait = require("util").promisify(setTimeout);

  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Uncaught Exception: ", errorMsg);

    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
  });
};
