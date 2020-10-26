'use strict'

module.exports = {
  name: 'github',
  description: 'GitHub link to my page.',
  execute(message, args) {
    message.channel.send('https://github.com/jxng1');
  }
}
