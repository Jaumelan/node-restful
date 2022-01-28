const buttons = {
    post: document.getElementById("postButton"),
    getall: document.getElementById("getAll"),
    getsearch: document.getElementById("getSearch"),
    delete: document.getElementById("delete"),
    put: document.getElementById("updateButton")
};

const apiURL = "http://localhost:3000";

const queryValues = {
    post: {
        id: 0,
        nome: ""
    },

    getsearch: 0,
    deleteId: 0,
    updateData: {
        id: 0,
        nome: ""
    },

    getQueryValues() {
        this.post.id = document.getElementById("addid").value;
        this.post.nome = document.getElementById("addname").value;
    },

    getSearchValue() {
        this.getsearch = document.getElementById("idsearch").value;
    },

    getDeleteID() {
        this.deleteId = document.getElementById("idDel").value;
    },

    getUpdateValues() {
        this.updateData.id = document.getElementById("updateId").value;
        this.updateData.nome = document.getElementById("updateNome").value;
    }
};

const route = {
    post: "/produto",
    getall: "/produto/all",
    getsearch: "/produto/",
    delete: "/produto/",
    update: "/produto/"
};

const tbody = document.querySelector('tbody');

const updateTable = function(rows) {
    tbody.innerHTML = "";
    rows.forEach(rowData => {
        let row = document.createElement("tr");
        let cellId = document.createElement("td");
        cellId.appendChild(document.createTextNode(rowData.id));
        let cellNome = document.createElement("td");
        cellNome.appendChild(document.createTextNode(rowData.nome));
        row.appendChild(cellId);
        row.appendChild(cellNome);
        tbody.appendChild(row);
        return true;
    });
};

buttons.post.addEventListener("click", () => {
    queryValues.getQueryValues();
    console.log()

    document.querySelector("form").reset();
    console.log(queryValues.post);
    
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(queryValues.post)
    };

    fetch(apiURL + route.post, requestOptions)
        .then(response => response.json() )
        .then( el => console.log(el) ).catch( (error) => console.log('Error: '+ error) )
})

buttons.getall.addEventListener("click", () => {

    fetch(apiURL + route.getall, {method: "GET"}).then(answer => answer.json()).then(data => {
        console.log (data);
        updateTable(data);
    }).catch((error) => {
        console.log('Error: '+ error);
    });
});

buttons.getsearch.addEventListener("click", () => {
    queryValues.getSearchValue();
    document.querySelector("form").reset();
    fetch(apiURL + route.getsearch + queryValues.getsearch, {method: "GET"}).then(answer => answer.json()).then(data => {
        console.log (data);
        updateTable(data);
    }).catch((error) => {
        console.log('Error: '+ error);
    });
});

buttons.delete.addEventListener("click", () => {
    queryValues.getDeleteID();
    document.querySelector("form").reset();
    fetch(apiURL + route.delete + queryValues.deleteId, {method: 'DELETE'}).then(response => response.json() )
    .then( el => {
        console.log(el)
        updateTable(el);
    } ).catch( (error) => console.log('Error: '+ error) )
});

buttons.put.addEventListener("click", () => {
    queryValues.getUpdateValues();
    document.querySelector("form").reset();
    const requestOptionsUpdate = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(queryValues.updateData)
    };

    fetch(apiURL + route.update + queryValues.updateData.id, requestOptionsUpdate).then(response => console.log(response))
})