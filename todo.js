class Todo{
    constructor(nom, contenu, dateCrea, date, fini, archive){
        this.nom = nom;
        this.contenu = contenu;
        this.dateCrea = dateCrea;
        this.date = date;
        this.fini = fini;
        this.archive = archive;
    }
    getNom(){
        return this.nom;
    }
    getContenu(){
        return this.contenu;
    }
    getDateCrea(){
        return this.dateCrea;
    }
    getDate(){
        return this.date;
    }
    getFini(){
        return this.fini;
    }
    getArchive(){
        return this.archive;
    }
    setNom(parametre){
        this.nom = parametre;
    }
    setContenu(parametre){
        this.contenu = parametre;
    }
    setDateCrea(parametre){
        this.dateCrea = parametre;
    }
    setDate(parametre){
        this.date = parametre;
    }
    setFini(parametre){
        this.fini = parametre;
    }
    setArchive(parametre){
        this.archive = parametre;
    }
}

let toggle=false;

let list = [
    new Todo('chercher du pain','Au super boulanger du coin',new Date(), '2019-08-21', false, false),
    new Todo('Faire des courses','A Hyper U',new Date(), '2019-10-21', true, false),
];

let listArchive = [];

let cible = document.getElementById('cible');

function affichage(){
    if (toggle){
        tableau = listArchive;
        document.getElementById('title').innerHTML="Archives";
        document.getElementById('toggler').innerHTML="To-Do List";
        document.getElementById('envoi').innerHTML="Add to Archives";
    }
    else{
        tableau = list;
        document.getElementById('title').innerHTML="To-Do List";
        document.getElementById('toggler').innerHTML="Archives";
        document.getElementById('envoi').innerHTML="Add to List";
    }
    cible.innerHTML = '';
    let message ='';
    for(i = 0; i < tableau.length ; i++){
        var check='';
        tableau[i].fini ? check='checked' : check='';
        message += '<div class="row my-3">';
        message += '<div class="col-1"><button class="btn btn-danger btn-sm" onclick="supprime('+i+')">X</button></div>';
        message += '<div class="col-4">'+tableau[i].nom+'</div>';
        message += '<div class="col-3">'+tableau[i].date+'</div>';
        message += '<div class="col-2"><input type="checkbox" '+check+' onclick="checkbox('+i+')"></div>';
        if(toggle){
            message += '<div class="col-2"><button class="btn btn-success" onclick="archive('+i+')">Récupérer</button></div>';
        }
        else
        {
            message += '<div class="col-2"><button class="btn btn-success" onclick="archive('+i+')">Archiver</button></div>';
        }
        message += '</div>'
    }
    cible.innerHTML = message;
}

function add(){
    let nom = document.getElementById('nom');
    let date = document.getElementById('date');
    var tableau;
    toggle?tableau=listArchive:tableau=list;
    tableau.push(new Todo(nom.value,'',new Date(),date.value,false,false));
    nom.value = '';
    date.value = '';
    affichage();
}

function archive(i){
    if (toggle){
        tabOrigin=listArchive;
        tabDestination=list;
    }
    else{
        tabOrigin=list;
        tabDestination=listArchive;
    }
    tabOrigin[i].setArchive = !tabOrigin[i].setArchive;
    tabDestination.push(tabOrigin[i]);
    tabOrigin.splice(i,1);
    affichage();
}

function supprime(i){
    tableau.splice(i,1);
    affichage();
}

function archivesButton(){
    toggle=!toggle;
    affichage();
}

function checkbox(i){
    tableau[i].fini=!tableau[i].fini;
    affichage();
}

document.getElementById('envoi').addEventListener('click',add,false);

affichage();