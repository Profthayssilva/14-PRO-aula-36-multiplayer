var Ball, database;
var position;

function setup() {
    database = firebase.database();
    console.log(database);
    createCanvas(500, 500);
    //  Exiba o modelo do código para criar o sprite ball
    Ball = createSprite(250, 250, 10, 10);
    Ball.shapeColor = "red";

// //     Adicione a referência ao banco de dados usando o comando
// // firebase.database(). firebase.database().ref() para referir-se ao local fonte ou a child no
// banco de dados.

    var BallPosition = database.ref("bola/posicao");
    //  Adicione a função showError dentro da função de configuração
    BallPosition.on("value", readPosition, showError);
}

function draw() {
    background("white");
    // O movimento da bola é controlado pelas teclas de seta.
    if (keyDown(LEFT_ARROW)) {
        writePosition(-1, 0);
    } else if (keyDown(RIGHT_ARROW)) {
        writePosition(1, 0);
    } else if (keyDown(UP_ARROW)) {
        writePosition(0, -1);
    } else if (keyDown(DOWN_ARROW)) {
        writePosition(0, +1);
    }
    drawSprites();
}

//  Mude a posição quando as teclas de seta forem pressionadas usando writePosition().

function writePosition(x, y) {
    database.ref("bola/posicao").set({
        x: position.x + x,
        y: position.y + y,
    });
}

// Adicione readPosition para alterar os valores no banco de dados.
function readPosition(data) {
    position = data.val();
    console.log(position.x);
    Ball.x = position.x;
    Ball.y = position.y;
}

//  Dentro da função showError imprima a mensagem do console
function showError() {
    console.log("Dados não recebidos do banco de dados");
}