var data;
window.addEventListener("load", () => {
  //Todos os elementos do DOM e scripts estão disponiveis
  //http://localhost:3000/users
  axios.get("https://transacoesapi.herokuapp.com/users").then((resposta) => {
    //console.log(resposta.data.User);
    //data vai carregar o dados para outras functions
    data = resposta.data.User;
    listLoad(data);
    //datas(data)
  });
});

// await data;
// //console.log("1",data)

// async function datas(arrayData = data){
//   try {
//     datas = arrayData;
//     console.log(datas)
//     return datas
//   } catch (error) {
//     console.log("error" + error);
//   }
// }

// datas();

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
  tituloModal.innerHTML = `Editar <strong>Item</strong>`;
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

//var deleteId ='';
// Passar CPF ele faz conta de matematica antes de usar a variavel
function delUser(deleteId) {
  //deleteId = obj.id.split("-")[1];
  console.log(deleteId);
  //cpfString = cpf.toString();
  // console.log(cpfString)

  // btndelItem.style.display = "block";
  // btndelTudo.style.display = "none";

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

  console.log(name);
  //console.log(name,ageInt,cpf,email)

  axios
    .put("http://localhost:3000/users/" + id, {
      name: name,
      cpf: cpf,
      email: email,
      age: ageInt,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  location.reload();
  //return json;
}

function btnDeleteUser(id) {
  axios
    .delete("http://localhost:3000/users/" + id )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  location.reload();
  //return json;
}