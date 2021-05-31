var data;
const link = "https://transacoesapi.herokuapp.com"
window.addEventListener("load", () => {
  //Todos os elementos do DOM e scripts estão disponiveis
  //http://localhost:3000/users
  axios.get(link + "/users").then((resposta) => {
    //console.log(resposta.data.User);
    //data vai carregar o dados para outras functions
    data = resposta.data.User;
    listLoad(data);
    //datas(data)
  });
});


var list = document.getElementById("list");
//função load a lista sempre q necessario
function listLoad(data) {
  //GET /users
  list.innerHTML = "";
  //<td id="num${prop}"><strong>${prop}</strong></td> class="col-7"
  let novoConteudo = "";
  data.forEach((user) => {
    //Linha de um Usuario
    novoConteudo += `<tr>
                <td>${user.name}</td>
                <td>${user.cpf}</td>
                <td>${user.age} </td>
                <td>${user.email}</td>
                <td>
                    <button onclick="transactionsUser(${user.id})" id="trans-${user.id}" 
                    type="button" class="btn btn-success"
                    data-toggle="modal" data-target="#exampleModal">
                    Trans.
                    </button>
                    <button onclick="editUser(${user.id})" id="edit-${user.id}" 
                    type="button" class="btn btn-info"
                    data-toggle="modal" data-target="#exampleModal">
                    Editar
                    </button>
                    <button onclick="delUser(${user.id})" id="del-${user.id}" 
                    type="button" class="btn btn-danger"
                    data-toggle="modal" data-target="#exampleModal">
                    Excluir
                    </button>
                </td>
                </tr>`;
  });

  list.innerHTML = novoConteudo;
}

//console.log("2",data)

var tituloModal = document.getElementById("tituloModal");
var bodyModal = document.getElementById("bodyModal");
var footerModal = document.getElementById("footerModal");
function editUser(editId) {
  //deleteId = obj.id.split("-")[1];
  //console.log(editId);
  tituloModal.innerHTML = `Editar <strong>Cliente</strong>`;
  //console.log(data);
  user = data.find((f) => {
    return f.id === editId;
  });
  editbodyModal = `<section class="container">
                    <div id="forms">
                      <div class="col-md-8">
                        <label for="name" class="form-label">Nome</label>
                        <input type="text" id="name" class="form-control" value="${user.name}"/>
                      </div>
                      <div class="col-md-8">
                        <label for="age" class="form-label">Idade</label>
                        <input type="text" id="age" class="form-control" value="${user.age}"/>
                      </div>
                      <div class="col-md-8">
                        <label for="cpf" class="form-label">CPF</label>
                        <input type="text" id="cpf" class="form-control" value="${user.cpf}"/>
                      </div>
                      <div class="col-md-8">
                        <label for="email" class="form-label">email</label>
                        <input type="text" id="email" class="form-control"value="${user.email}" />
                      </div>
                    </div>
                  </section> `;  

  editFooterModal = `<button type="button" 
                    onclick="btnEditUser(${user.id})" 
                    class="btn btn-info">
                      Editar Usuario
                    </button>
                    <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    >
                    Close
                    </button>`;

  //cria outro file e criar outro function e button edit com axios.PUT
  bodyModal.innerHTML = editbodyModal;
  footerModal.innerHTML = editFooterModal
}

function transactionsUser(editId) {
  //deleteId = obj.id.split("-")[1];
  //console.log(editId);
  tituloModal.innerHTML = `Editar/Ver <strong>Transações</strong>`;
  //console.log(data);
  // encontrar o registro
  const indiceUser = data.findIndex((f) => {
    return f.id === editId;
  });

  //console.log(indiceUser);
  // user = data.find((f) => {
  //   return f.id === editId;
  // });

  const transactions = data[indiceUser].transactions;

  const balance = data[indiceUser].balance;

  console.log(balance);

  //console.log(transactions);

  let transbodyModal = "";
  transbodyModal += `<section class="container">
                    <div id="forms">
                      <div class="col-md-8">
                        <label for="title" class="form-label">Titulo</label>
                        <input type="text" id="title" class="form-control" value=""/>
                      </div>
                      <div class="col-md-8">
                        <label for="value" class="form-label">Valor</label>
                        <input type="text" id="value" class="form-control" value=""/>
                      </div>
                      <div class="col-md-8">
                        <label for="type" class="form-label">Tipo</label>
                        <input type="text" id="type" class="form-control" 
                        placeholder="income or outcome" value=""/>
                      </div>
                      <div class="mt-2 mb-2">
                        <button type="button" onclick="btnAddTrans(${data[indiceUser].id})" class="btn btn-primary">
                          Salvar Trans.
                        </button>
                      </div>
                    </div>
                  </section> `;

    let transTable = "";
    transTable += `<table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Titulo</th>
                          <th>Valor</th>
                          <th>Tipo</th>
                          <th>Comandos</th>
                        </tr>
                      </thead>
                      <tbody>`;
    transactions.forEach((trans) => {
      //Linha de um Trans.
      transTable += `<tr>
                  <td>${trans.title}</td>
                  <td>${trans.value}</td>
                  <td>${trans.type}</td>
                  <td>
                  <button type="button" 
                    onclick="btnEditUser(${trans.id})" 
                    class="btn btn-info">
                      Editar Trans.
                  </button>
                  </td>  
                  </tr>`;
    });
    // transTable += `</tbody>
    //                 </table>`;

    transbodyModal += transTable;

    // let totalBalance = "";
    
    // totalBalance += `<tr>
    //                 <td>Entrada:</td>
    //                 <td>${balance.income}</td>
    //                 </tr>
    //                 <td>Saida:</td>
    //                 <td>${balance.outcome}</td>
    //                 <tr>
    //                 <td>Total:</td>
    //                 <td>${balance.total}</td>
    //                 </tr>`;
    // totalBalance += `</tbody>
    //                 </table>`;

    //transbodyModal += totalBalance;

    transFooterModal = `<button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    >
                    Close
                    </button>`;

  bodyModal.innerHTML = transbodyModal;
  footerModal.innerHTML = transFooterModal
}

//var deleteId ='';
// Passar CPF ele faz conta de matematica antes de usar a variavel
function delUser(deleteId) {
  //console.log(deleteId);
  //cpfString = cpf.toString();
  // console.log(cpfString);

  tituloModal.innerHTML = `Confirmação de Exclusão do <strong>Item</strong>`;
  bodyModal.innerHTML = `Tem certeza ? Não poderá ser recupado o <strong>Usuario(a) ${deleteId}</strong> no futuro. `;
  delFooterModal = `<button type="button" 
                    onclick="btnDeleteUser(${deleteId})" 
                    class="btn btn-danger">
                      Deletar Usuario
                    </button>
                    <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    >
                    Close
                    </button>`;
  footerModal.innerHTML = delFooterModal
  
}

function btnEditUser(id) {
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let cpf = document.getElementById("cpf").value;
  let email = document.getElementById("email").value;

  let ageInt = parseInt(age);

  //console.log(name);
  
  //console.log(name,ageInt,cpf,email)

  axios
    .put(link + "/users/" + id, {
      name: name,
      cpf: cpf,
      email: email,
      age: ageInt,
    })
    .then((response) => {
      console.log(response);
      location.reload();
    })
    .catch((error) => {
      console.log(error);
      location.reload();
    });
}

function btnAddTrans(id) {
  let title = document.getElementById("title").value;
  let value = document.getElementById("value").value;
  let type = document.getElementById("type").value;
  let valueInt = parseInt(value);

  console.log(title);
  
  //console.log(name,ageInt,cpf,email)

  axios
    .post(link + "/user/" + id + "/transactions", {
      title: title,
      value: valueInt,
      type: type,
    })
    .then((response) => {
      console.log(response);
      setTimeout(() => 
        { location.reload(); }, 1000);
    })
    .catch((error) => {
      console.log(error);
      setTimeout(() => 
        { location.reload(); }, 1000);
    });
}

function btnDeleteUser(id) {
  axios
    .delete(link + "/users/" + id )
    .then((response) => {
      console.log(response);
      location.reload();
    })
    .catch((error) => {
      console.log(error);
      location.reload();
    });
}