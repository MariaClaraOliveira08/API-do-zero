let users = [];

module.exports = class userController {
  static async createUser(req, res) {
    //criar usuario
    const { cpf, email, password, name } = req.body; //validação de campos req.body

    if (!cpf || !email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (isNaN(cpf) || cpf.length !== 11) {
      //verifica o tamanho e se é um numero se quiser saber o tamanho utiliza length o isNan verifica se é um número ai ele retorna true
      return res.status(400).json({
        error: "CPF inválido. Deve conter exatamente 11 dígitos numéricos",
      });
    } else if (!email.includes("@")) {
      //verifica se inclui o @
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    }

    // Verifica se já existe um usuário com o mesmo CPF
    const existingUser = users.find((user) => user.cpf === cpf); //filtra e verifica find
    if (existingUser) {
      return res.status(400).json({ error: "CPF já cadastrado" });
    }

    // Cria e adiciona novo usuário
    const newUser = { cpf, email, password, name };
    users.push(newUser);

    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser });
  }

  static async getAllUsers(req, res) {
    return res
      .status(200)
      .json({ message: "Obtendo todos os usuários", users });
  }

  static async updateUser(req, res) {
    //Desestrutura e recupera os dados enviados via corpo da requisição
    const { cpf, email, password, name } = req.body;

    //Validar se todos os campos foram preenchidos
    if (!cpf || !email || !password || !name) {
      return res
        .status(400)
        .json({ Error: "Todos os campos devem ser preenchidos" });
    }
    //Procurar o índice do usuario no array 'users' pelo cpf
    const userIndex = users.findIndex((user) => user.cpf === cpf);

    //Se o usuario não for encontrado userIndex equivale a -1
    if (userIndex === -1) {
      return res.status(400).json({ Error: "Usuário não encontrado" });
    }

    //Atualiza os dados do usuário no array 'users'
    users[userIndex] = { cpf, email, password, name };

    return res
      .status(200)
      .json({ message: "Usuário atualizado", user: users[userIndex] });
  }

  static async deleteUser(req, res) {
    // obtem o parâmetro 'Id' da requisição que é o CPF do user a ser deletado
    const userId = req.params.cpf;
    //Procurar o índice do usuario no array 'users' pelo cpf
    const userIndex = users.findIndex((user) => user.cpf === userId);

    //Se o usuario não for encontrado userIndex equivale a -1
    if (userIndex === -1) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    //Removendo o usuário da array 'users'
    users.splice(userIndex, 1);
    return res.status(200).json({ message: "Usuário apagado" });
  }
};
