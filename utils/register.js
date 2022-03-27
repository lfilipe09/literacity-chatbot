const { updateDataByPhone, findUserData } = require('../database/crud');

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const register = (user, client, message) => {
  switch (user.dataValues.context) {
    case 'register1':
      client.sendText(message.from, 'Pronto! Agora precisamos fazer o seu cadastro. São só 9 perguntas.')
        .then(() => {
          client.sendText(message.from, `*PERGUNTA 01 de 09:*\n----------------\n\nEm qual cidade você mora?`)
        })
      updateDataByPhone(message.from, ['context'], 'register2')
      break;

    case 'register2':
      client.sendText(message.from, `*PERGUNTA 02 de 09:*\n----------------\n\nQual a renda da sua família considerando o Salário Mínimo SM=R$ 1.100,00`)
        .then(() => {
          client.sendText(message.from, `Até 1 SM? Digite 1\nDe 1 SM até 2 SM? Digite 2\nDe 2 SM até 3 SM? Digite 3\nDe 3 SM até 5 SM? Digite 4\nDe 5 SM até 10 SM? Digite 5\nDe 10 SM até 20 SM? Digite 6\nDe 20 SM até 30 SM? Digite 7\nMais de 30 SM? Digite 8\nNão tem renda? Digite 9`)
        })
      updateDataByPhone(message.from, ['context'], 'register3')
      updateDataByPhone(message.from, ['city'], message.body)
      break;

    case 'register3':
      const numberValidationUntilNine = /[1-9]$/
      if (numberValidationUntilNine.test(Number(message.body))) {
        client.sendText(message.from, `*PERGUNTA 03 de 09:*\n----------------\n\nQuantas pessoas moram na sua residência?`)
          .then(() => {
            client.sendText(message.from, `1 morador? Digite 1\n2 moradores? Digite 2\n3 moradores? Digite 3\n4 moradores? Digite 4\n5 moradores? Digite 5\n6 moradores ou mais? Digite 6`)
          })
        updateDataByPhone(message.from, ['context'], 'register4')
        const family_income =
          message.body === '1' ? 'Até 1 SM'
            : message.body === '2' ? 'De 1 SM até 2 SM'
              : message.body === '3' ? 'De 2 SM até 3 SM'
                : message.body === '4' ? 'De 3 SM até 5 SM'
                  : message.body === '5' ? 'De 5 SM até 10 SM'
                    : message.body === '6' ? 'De 10 SM até 20 SM'
                      : message.body === '7' ? 'De 20 SM até 30 SM'
                        : message.body === '8' ? 'Mais de 30 SM'
                          : message.body === '9' && 'Não tem renda'

        updateDataByPhone(message.from, ['family_income'], family_income)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandado um número de 1 a 9')
      }
      break;
    case 'register4':
      const numberValidationUntilSix = /[1-6]$/
      if (numberValidationUntilSix.test(Number(message.body))) {
        client.sendText(message.from, `*PERGUNTA 04 de 09:*\n----------------\n\nQual seu sexo?`)
          .then(() => {
            client.sendText(message.from, `Masculino? Digite 1\nFeminino? Digite 2`)
          })
        updateDataByPhone(message.from, ['context'], 'register5')
        const how_many_residents =
          message.body === '1' ? '1 morador'
            : message.body === '2' ? '2 moradores'
              : message.body === '3' ? '3 moradores'
                : message.body === '4' ? '4 moradores'
                  : message.body === '5' ? '5 moradores'
                    : message.body === '6' && '6 moradores ou mais'

        updateDataByPhone(message.from, ['how_many_residents'], how_many_residents)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandado um número de 1 a 6')
      }
      break;
    case 'register5':
      const numberValidationUntilTwo = /[1-2]$/
      if (numberValidationUntilTwo.test(Number(message.body))) {
        client.sendText(message.from, `*PERGUNTA 05 de 09:*\n----------------\n\nComo você se declara?`)
          .then(() => {
            client.sendText(message.from, `Branco? Digite 1\nNegro? Digite 2\nPardo? Digite 3\nAmarelo? Digite 4\nIndígena? Digite 5`)
          })
        updateDataByPhone(message.from, ['context'], 'register6')
        const gender =
          message.body === '1' ? 'Masculino'
            : message.body === '2' && 'Feminino'

        updateDataByPhone(message.from, ['gender'], gender)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandado um número de 1 a 2')
      }
      break;
    case 'register6':
      const numberValidationUntilFive = /[1-5]$/
      if (numberValidationUntilFive.test(Number(message.body))) {
        client.sendText(message.from, `Vamos conferir se os dados estão corretos até aqui?`)
          .then(async () => {
            const currentUser = await findUserData(message.from)
            client.sendText(message.from, `Você mora em ${currentUser.dataValues.city}\nSua renda familiar é de ${currentUser.dataValues.family_income}\nVocê vive com ${currentUser.dataValues.how_many_residents}\nVocê é do sexo ${currentUser.dataValues.gender}\nE se identifica com a raça ${currentUser.dataValues.race}`)
            await delay(1000)
            client.sendText(message.from, `Tudo certo com os seus dados?\nSim? Digite 1\nNão? Digite 2\n`)
          })
        updateDataByPhone(message.from, ['context'], 'register7')
        const race =
          message.body === '1' ? 'Branco'
            : message.body === '2' ? 'Negro'
              : message.body === '3' ? 'Pardo'
                : message.body === '4' ? 'Amarelo'
                  : message.body === '5' && 'Indígena'

        updateDataByPhone(message.from, ['race'], race)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandado um número de 1 a 5')
      }
      break;
    case 'register7':
      if (message.body === '1' || message.body === '1⃣') {
        client.sendText(message.from, `*PERGUNTA 06 de 09:*\n----------------\n\nQual sua faixa etária?`)
          .then(() => {
            client.sendText(message.from, 'De 10 a 15 anos? Digite 1\nDe 16 a 24 anos? Digite 2\nDe 25 a 34 anos? Digite 3\nDe 35 a 44 anos? Digite 4\nDe 45 a 59 anos? Digite 5\n60 anos ou mais? Digite 6\n70 anos ou mais? Digite 7\n80 anos ou mais? Digite 8')
          })
        updateDataByPhone(message.from, ['context'], 'register8')
      } else if (message.body === '2' || message.body === '2⃣') {
        client.sendText(message.from, 'Vimos que você preencheu algum dado incorretamente! Vamos retornar para a primeira pergunta de registro, está bem? \n\n Quando quiser recomeçar mande qualquer mensagem 😊')
        updateDataByPhone(message.from, ['context'], 'register1')
        updateDataByPhone(message.from, ['city', 'family_income', 'how_many_residents', 'gender', 'race'], 'null')
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandando apenas o número 1, caso concorde, ou o número 2, caso discorde')
      }
      break;
    case 'register8':
      const numberValidationUntilEight = /[1-8]$/
      if (numberValidationUntilEight.test(Number(message.body))) {
        client.sendText(message.from, `*PERGUNTA 07 de 09:*\n----------------\n\nQual sua escolaridade?`)
          .then(() => {
            client.sendText(message.from, `Analfabeto: Digite 1\n\nSabe ler/escrever, mas não cursou escola: Digite 2\n\nAté pré-escola incompleto: Digite 3\n\nPré-escola completo: Digite 4\n\n1a até 3a série (Primário)¹/1a até 3a série (Ensino Fundamental I)²: Digite 5\n\n4a série (Primário)¹/4a até 5a série (Ensino Fundamental I)²: Digite 6\n\n5a até 7a série (Ginásio)¹/1a até 3a série (Ensino Fundamental II)²: Digite 7\n\n8a série (Ginásio)¹/4a série (Ensino Fundamental II)²: Digite 8\n\n1a e 2a série (Colegial)¹/1a e 2a série (Ensino Médio)²: Digite 9\n\n3a série/vestibular (Colegial)¹/3a  série/vestibular (Ensino Médio)²: Digite 10\n\nSuperior incompleto: Digite 11\n\nSuperior completo: Digite 12`)
          })
        updateDataByPhone(message.from, ['context'], 'register9')
        const age_group =
          message.body === '1' ? 'De 10 a 15 anos'
            : message.body === '2' ? 'De 16 a 24 anos'
              : message.body === '3' ? 'De 25 a 34 anos'
                : message.body === '4' ? 'De 35 a 44 anos'
                  : message.body === '5' ? 'De 45 a 59 anos'
                    : message.body === '6' ? '60 anos ou mais'
                      : message.body === '7' ? '70 anos ou mais'
                        : message.body === '8' && '80 anos ou mais'

        updateDataByPhone(message.from, ['age_group'], age_group)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandado um número de 1 a 8')
      }
      break;
    case 'register9':
      const numberValidationUntilTwelve = /^([1-9]|[0-1][0-2])$/
      if (numberValidationUntilTwelve.test(Number(message.body))) {
        client.sendText(message.from, `*PERGUNTA 08 de 09:*\n----------------\n\nCom relação a trabalho, qual sua condição atual?`)
          .then(() => {
            client.sendText(message.from, `Trabalha em atividade remunerada (na força de trabalho): Digite 1\n\nTrabalha em atividade não remunerada, como ajudante (na força de trabalho): Digite 2\n\nTrabalha, mas está afastado (na força de trabalho): Digite 3\n\nTomou providência para conseguir trabalho nos últimos 30 dias (na força de trabalho): Digite 4\n\nNão trabalha e não procurou trabalho nos últimos 30 dias (fora da força de trabalho): Digite 5\n\nSou aposentado e não possuo atividade remunerada (na força de trabalho): Digite 6\n\nSou aposentado e possuo atividade remunerada (na força de trabalho): Digite 7`)
          })
        updateDataByPhone(message.from, ['context'], 'register10')
        const scholarity =
          message.body === '1' ? 'Analfabeto'
            : message.body === '2' ? 'Sabe ler/escrever, mas não cursou escola'
              : message.body === '3' ? 'Até pré-escola incompleto'
                : message.body === '4' ? 'Pré-escola completo'
                  : message.body === '5' ? '1a até 3a série (Primário)¹/1a até 3a série (Ensino Fundamental I)²'
                    : message.body === '6' ? '4a série (Primário)¹/4a até 5a série (Ensino Fundamental I)²'
                      : message.body === '7' ? '5a até 7a série (Ginásio)¹/1a até 3a série (Ensino Fundamental II)²'
                        : message.body === '8' ? '8a série (Ginásio)¹/4a série (Ensino Fundamental II)²'
                          : message.body === '9' ? '1a e 2a série (Colegial)¹/1a e 2a série (Ensino Médio)²'
                            : message.body === '10' ? '3a série/vestibular (Colegial)¹/3a  série/vestibular (Ensino Médio)²'
                              : message.body === '11' ? 'Superior incompleto'
                                : message.body === '12' && 'Superior completo'

        updateDataByPhone(message.from, ['scholarity'], scholarity)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandado um número de 1 a 12')
      }
      break;
    case 'register10':
      const numberValidationUntilSeven = /[1-7]$/
      if (numberValidationUntilSeven.test(Number(message.body))) {
        client.sendText(message.from, `*PERGUNTA 09 de 09:*\n----------------\n\nÚltima pergunta: além do WhatsApp, você usa o Zoom?`)
          .then(() => {
            client.sendText(message.from, `Uso o Zoom: Digite 1\nNão uso o Zoom: Digite 2`)
          })
        updateDataByPhone(message.from, ['context'], 'register11')
        const actual_occupation =
          message.body === '1' ? 'Trabalha em atividade remunerada (na força de trabalho)'
            : message.body === '2' ? 'Trabalha em atividade não remunerada, como ajudante (na força de trabalho)'
              : message.body === '3' ? 'Trabalha, mas está afastado (na força de trabalho)'
                : message.body === '4' ? 'Tomou providência para conseguir trabalho nos últimos 30 dias (na força de trabalho)'
                  : message.body === '5' ? 'Não trabalha e não procurou trabalho nos últimos 30 dias (fora da força de trabalho)'
                    : message.body === '6' ? 'Sou aposentado e não possuo atividade remunerada (na força de trabalho)'
                      : message.body === '7' && 'Sou aposentado e possuo atividade remunerada (na força de trabalho)'

        updateDataByPhone(message.from, ['actual_occupation'], actual_occupation)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandado um número de 1 a 7')
      }
      break;
    case 'register11':
      const numberValidationUntilTwoSecond = /[1-2]$/
      if (numberValidationUntilTwoSecond.test(Number(message.body))) {
        client.sendText(message.from, `Vamos dar uma última conferida nos seus dados?`)
          .then(async () => {
            const currentUser = await findUserData(message.from)
            client.sendText(message.from, `Você mora em ${currentUser.dataValues.city}\nSua renda familiar é de ${currentUser.dataValues.family_income}\nVocê vive com ${currentUser.dataValues.how_many_residents}\nVocê é do sexo ${currentUser.dataValues.gender}\nSe identifica com a raça ${currentUser.dataValues.race}\nEstá na faixa etária ${currentUser.dataValues.age_group}\nSua escolaridade é: ${currentUser.dataValues.scholarity}\n${currentUser.dataValues.actual_occupation}\n${currentUser.dataValues.is_zoom_user ? 'Usa o Zoom' : 'Não usa o Zoom'}`)
            await delay(1000)
            client.sendText(message.from, `Tudo certo com os seus dados?\nSim? Digite 1\nNão? Digite 2\n`)
          })
        updateDataByPhone(message.from, ['context'], 'register12')
        const is_zoom_user =
          message.body === '1' ? true
            : message.body === '2' && false

        updateDataByPhone(message.from, ['is_zoom_user'], is_zoom_user)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandado um número de 1 a 2')
      }
      break;
    case 'register12':
      if (message.body === '1' || message.body === '1⃣') {
        client.sendText(message.from, `Deu tudo certo. Já recebemos suas respostas.Você conclui a primeira fase do cadastro para ser um dos respondentes das pesquisas do LiteraCity. Parabéns!`)
          .then(() => {
            client.sendText(message.from, 'Agora basta aguardar o nosso contato que encaixaremos você em uma pesquisa compatível ao seu perfil!')
          })
        updateDataByPhone(message.from, ['context'], 'free')
      } else if (message.body === '2' || message.body === '2⃣') {
        client.sendText(message.from, 'Vimos que você preencheu algum dado incorretamente! Vamos retornar para a primeira pergunta de registro, está bem? \n\n Quando quiser recomeçar mande qualquer mensagem 😊')
        updateDataByPhone(message.from, ['context'], 'register1')
        updateDataByPhone(message.from, ['city', 'family_income', 'how_many_residents', 'gender', 'race', 'age_group', 'scholarity', 'actual_occupation'], 'null')
        updateDataByPhone(message.from, ['is_zoom_user'], null)
      } else {
        client.sendText(message.from, 'Não entendi o que você disse 😞 Por favor, responda mandando apenas o número 1, caso concorde, ou o número 2, caso discorde')
      }
      break;
  }

}
module.exports = { register }