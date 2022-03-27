const { addUser, existUser, findUserData } = require('./database/crud');
const { onboarding } = require('./utils/onboarding')
const { register } = require('./utils/register')
const venom = require('venom-bot');

venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {

    const validateUser = async () => {
      const userExists = await existUser(message.from)
      !userExists && await addUser(message.from, message.notifyName)
      const user = await findUserData(message.from)
      return user
    }

    const detectContext = async () => {
      try {
        const user = await validateUser()
        user.dataValues.context.slice(0, 10) === 'onboarding' ? onboarding(user, client, message) :
          user.dataValues.context.slice(0, 8) === 'register' ? register(user, client, message) :
            user.dataValues.context === 'free' && client.sendText(message.from, 'Seu cadastro foi realizado com sucesso!\nAssim que encontrarmos uma pesquisa compatível ao seu perfil, você será acionado. Até logo 👋')
      } catch (error) {
        console.log(error)
      }
    }

    detectContext()

  });
}