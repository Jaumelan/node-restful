const express = require("express");
const router = express.Router();

let produto = [
    {id: 1, nome: "Produto A"},
    {id: 2, nome: "Produto B"},
    {id: 3, nome: "Produto C"},
    {id: 4, nome: "Produto D"},
    {id: 5, nome: "Produto E"},
    {id: 6, nome: "Produto F"},
    {id: 7, nome: "Produto G"},
];

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get("/all", (req,res) => {
        res.send(produto);
});

router.get("/:id", (req,res) => {
    let param = req.params;
    console.log(param);

    let resultado = produto.filter(user => {
        if (user.id === Number(param.id)) {
            return true;
        } else {
            return false;
        }
    });

    produto = resultado;

    res.send(resultado);
});

router.delete('/:id', (req,res) => {
    let param = req.params;
    console.log(param);
    let exist;
    let updatedProducts = produto.filter(user => {
            if ( user.id != Number(param.id) ) {
                exist = true;
                return true;
            } else {
                exist = false;
                return false;
            }
        })
        produto = updatedProducts;
        res.send(exist)
});

router.put('/:id', (req, res) => {
    let bodyParam = req.body;
    
    let exist = false;

    produto = produto.filter(item => {
        if (item.id === Number(bodyParam.id)) {
            exist = true;
            item.nome = bodyParam.nome;
            return true
        } else {
            
            return true
        }
    
    })
    res.send(exist);
})



router.post('/', (req,res) => {
        let userData = req.body;      
        produto.push({ id : parseInt(userData.id,10), nome: userData.nome});
        res.json(produto);
})

module.exports = router;