const { updateDataByPhone, deleteUserByPhone } = require('../database/crud');

const onboarding = (user, client, message) => {
  switch (user.dataValues.context) {
    case 'onboarding1':
      client.sendText(message.from, 'Seja bem-vindo ao LiteraCity. Você está a poucos passos de se tornar um dos respondentes de nossas pesquisas. Mas antes, você precisa aceitar nossos termos de uso.')
        .then(() => {
          client.sendText(message.from, 'A gente vai explicar ponto por ponto pra você ficar tranquilo e seguro. São 8 pontos explicados de forma simples e rápida. Vamos lá?')
        })
      updateDataByPhone(message.from, ['context'], 'onboarding2')
      break;
    case 'onboarding2':
      client.sendText(message.from, 'Ao se cadastrar no LiteraCity, você aceita ser um participante de nossas pesquisas. Quando você for selecionado para responder a uma pesquisa, enviaremos um convite para seu WhatsApp e você tem a opção de aceitar participar ou não.')
        .then(() => {
          client.sendText(message.from, 'Está de acordo? Digite 1').then(() => {
            client.sendText(message.from, 'Não concorda? Digite 2')
          })
        })
      updateDataByPhone(message.from, ['context'], 'onboarding3')
      break;
    case 'onboarding3':
      if (message.body === '1' || message.body === '1⃣') {
        client.sendText(message.from, 'Nosso cadastro pede dados sobre a cidade onde você mora, sua idade, sexo, raça, escolaridade, renda famíliar, número de pessoas que moram no seu domicílio e qual sua situação atual em relação a trabalho. Seu cadastro é protegido e não é compartilhado com terceiros (outras empresas, por exemplo). ')
          .then(() => {
            client.sendText(message.from, 'Está de acordo? Digite 1').then(() => {
              client.sendText(message.from, 'Não concorda? Digite 2')
            })
          })
        updateDataByPhone(message.from, ['context'], 'onboarding4')
        updateDataByPhone(message.from, ['allow_invite_whatsapp'], true)
      } else if (message.body === '2' || message.body === '2⃣') {
        client.sendText(message.from, 'Olá! Vimos que você não concorda com um dos nossos termos. Se mudar de ideia, basta mandar outra mensagem para mim e iremos refazer o questionário!')
        deleteUserByPhone(message.from)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandando apenas o número 1, caso concorde, ou o número 2, caso discorde')
      }
      break;
    case 'onboarding4':
      if (message.body === '1' || message.body === '1⃣') {
        client.sendText(message.from, 'Sempre que convidarmos você para participar de uma pesquisa, você será informado sobre o objetivo da pesquisa, quais as perguntas, a metodologia e como participar. Você sempre terá a opção de não participar de uma pesquisa.')
          .then(() => {
            client.sendText(message.from, 'Está de acordo? Digite 1').then(() => {
              client.sendText(message.from, 'Não concorda? Digite 2')
            })
          })
        updateDataByPhone(message.from, ['context'], 'onboarding5')
        updateDataByPhone(message.from, ['allow_personal_data'], true)
      } else if (message.body === '2' || message.body === '2⃣') {
        client.sendText(message.from, 'Olá! Vimos que você não concorda com um dos nossos termos. Se mudar de ideia, basta mandar outra mensagem para mim e iremos refazer o questionário!')
        deleteUserByPhone(message.from)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandando apenas o número 1, caso concorde, ou o número 2, caso discorde')
      }
      break;
    case 'onboarding5':
      if (message.body === '1' || message.body === '1⃣') {
        client.sendText(message.from, 'Você será remunerado a cada pesquisa que responder (desde que responda toda a pesquisa). Sua remuneração pode variar de uma pesquisa para outra, mas você será informado do valor no momento do convite e pode aceitar ou não participar.')
          .then(() => {
            client.sendText(message.from, 'Está de acordo? Digite 1').then(() => {
              client.sendText(message.from, 'Não concorda? Digite 2')
            })
          })
        updateDataByPhone(message.from, ['context'], 'onboarding6')
        updateDataByPhone(message.from, ['know_can_not_participate'], true)
      } else if (message.body === '2' || message.body === '2⃣') {
        client.sendText(message.from, 'Olá! Vimos que você não concorda com um dos nossos termos. Se mudar de ideia, basta mandar outra mensagem para mim e iremos refazer o questionário!')
        deleteUserByPhone(message.from)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandando apenas o número 1, caso concorde, ou o número 2, caso discorde')
      }
      break;
    case 'onboarding6':
      if (message.body === '1' || message.body === '1⃣') {
        client.sendText(message.from, 'Excepcionalmente, você pode ser convidado para pesquisas de estudantes e pesquisadores que não envolvem remuneração. Você também será informado no momento do convite e pode aceitar ou não participar.')
          .then(() => {
            client.sendText(message.from, 'Está de acordo? Digite 1').then(() => {
              client.sendText(message.from, 'Não concorda? Digite 2')
            })
          })
        updateDataByPhone(message.from, ['context'], 'onboarding7')
        updateDataByPhone(message.from, ['know_about_remuneration'], true)
      } else if (message.body === '2' || message.body === '2⃣') {
        client.sendText(message.from, 'Olá! Vimos que você não concorda com um dos nossos termos. Se mudar de ideia, basta mandar outra mensagem para mim e iremos refazer o questionário!')
        deleteUserByPhone(message.from)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandando apenas o número 1, caso concorde, ou o número 2, caso discorde')
      }
      break;
    case 'onboarding7':
      if (message.body === '1' || message.body === '1⃣') {
        client.sendText(message.from, 'Você pode decidir não participar mais das pesquisas do LiteraCity a qualquer momento. E pode solicitar que seu cadastro seja excluído de nossa base. Basta enviar uma mensagem para nosso WhatsApp.')
          .then(() => {
            client.sendText(message.from, 'Está de acordo? Digite 1').then(() => {
              client.sendText(message.from, 'Não concorda? Digite 2')
            })
          })
        updateDataByPhone(message.from, ['context'], 'onboarding8')
        updateDataByPhone(message.from, ['know_about_free_surveys'], true)
      } else if (message.body === '2' || message.body === '2⃣') {
        client.sendText(message.from, 'Olá! Vimos que você não concorda com um dos nossos termos. Se mudar de ideia, basta mandar outra mensagem para mim e iremos refazer o questionário!')
        deleteUserByPhone(message.from)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandando apenas o número 1, caso concorde, ou o número 2, caso discorde')
      }
      break;
    case 'onboarding8':
      if (message.body === '1' || message.body === '1⃣') {
        client.sendText(message.from, 'Você tem 18 anos ou mais?')
          .then(() => {
            client.sendText(message.from, 'Sim? Digite 1').then(() => {
              client.sendText(message.from, 'Não? Digite 2')
            })
          })
        updateDataByPhone(message.from, ['context'], 'onboarding9')
        updateDataByPhone(message.from, ['know_how_to_leave'], true)
      } else if (message.body === '2' || message.body === '2⃣') {
        client.sendText(message.from, 'Olá! Vimos que você não concorda com um dos nossos termos. Se mudar de ideia, basta mandar outra mensagem para mim e iremos refazer o questionário!')
        deleteUserByPhone(message.from)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandando apenas o número 1, caso concorde, ou o número 2, caso discorde')
      }
      break;
    case 'onboarding9':
      if (message.body === '1' || message.body === '1⃣') {
        client.sendText(message.from, 'Você leu e está de acordo com nossos termos de uso?')
          .then(() => {
            client.sendText(message.from, 'Leu e está de acordo? Digite 1').then(() => {
              client.sendText(message.from, 'Não está de acordo? Digite 2')
            })
          })
        updateDataByPhone(message.from, ['context'], 'onboarding10')
        updateDataByPhone(message.from, ['above_legal_age'], true)
      } else if (message.body === '2' || message.body === '2⃣') {
        client.sendText(message.from, 'Olá! Vimos que você não é maior de idade. Atualmente essa pesquisa contempla apenas as pessoas acima de 18 anos. Agradecemos o seu contato!')
        deleteUserByPhone(message.from)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandando apenas o número 1, caso concorde, ou o número 2, caso discorde')
      }
      break;
    case 'onboarding10':
      if (message.body === '1' || message.body === '1⃣') {
        client.sendText(message.from, 'Você concordou com nossos termos de uso e está pronto para começar seu cadastro. Para prosseguir, basta enviar qualquer mensagem para mim novamente!')
        updateDataByPhone(message.from, ['context'], 'register1')
        updateDataByPhone(message.from, ['agree_to_terms_of_use'], true)
      } else if (message.body === '2' || message.body === '2⃣') {
        client.sendText(message.from, 'Olá! Vimos que você não concorda com nossos termos de uso. Por isso interrompemos o questionário. Se quiser ler os termos em nosso site acesse: litera.city/termos  Se mudar de ideia, lá você tem a opção de aceitar os termos e fazer seu cadastro.')
        deleteUserByPhone(message.from)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandando apenas o número 1, caso concorde, ou o número 2, caso discorde')
      }
      break;
    default:
      console.log('caiu no default')
      break;
  }
}

module.exports = { onboarding }