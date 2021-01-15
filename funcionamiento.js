

let divImgCtn = document.getElementById('div-img-ctn');
let divImgName = document.getElementById('div-img-name');
const publicKey = '220e6fffc995cb1e02ec539b998bde3b';
    
const privateKey = '5de52699c360350d35bb7a3dfa28ff6f7703bd54';    
let ts = Date.now();

let busqueda = async () => {
    let data;
    const hash = MD5(ts + privateKey + publicKey);

  await  fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
        .then(response => response.json())
        .then(result => { console.log(result.data.results); data = result.data.results })
        .catch(error => console.log('error', error));
    await poneImagenes(data)
    
}

busqueda();




    let searchForm = document.getElementById('form');
    let inputSearch = document.getElementById('input-search');
    let btnSearch = document.getElementById('btn-search');
    let imageSection = document.getElementById('image-section');
    let main = document.getElementById('main');

    const filtrar = () => {

        if (!!document.getElementById('section-img-search')) {
            document.getElementById('section-img-search').remove();
        }

        const hash = MD5(ts + privateKey + publicKey);
        fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${inputSearch.value}&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
        .then(response => response.json())
        .then(response => {

            let sectionImgSearch = document.createElement('section');
            let divImgSearch = document.createElement('div');
            let imgSearch = document.createElement('img');
            let divNameHero = document.createElement('div');
            let nameHero = document.createElement('p');
            let iconClose = document.createElement('i');

            sectionImgSearch.setAttribute('id', 'section-img-search');
            sectionImgSearch.setAttribute('class', 'section-img-search');
            divImgSearch.setAttribute('class', 'div-img-search');
            divNameHero.setAttribute('class', 'div-name-hero');
            nameHero.setAttribute('class', 'name-hero');
            iconClose.setAttribute('class', 'fas fa-times');
            iconClose.setAttribute('id', 'icon-close');

            main.insertBefore(sectionImgSearch, imageSection);
            sectionImgSearch.appendChild(divImgSearch);
            divImgSearch.appendChild(imgSearch);
            divImgSearch.appendChild(divNameHero);
            divImgSearch.appendChild(iconClose);
            divNameHero.appendChild(nameHero);

            imgSearch.src = `${response.data.results[0].thumbnail.path}/standard_xlarge.${response.data.results[0].thumbnail.extension}`;

            nameHero.innerHTML = response.data.results[0].name;


            iconClose.addEventListener('click', () => {

                if (sectionImgSearch !== null) {
                    sectionImgSearch.remove();
                }
            });

    
            imgSearch.addEventListener('click', () => {
                popUp(`${response.data.results[0].thumbnail.path}/standard_xlarge.${response.data.results[0].thumbnail.extension}`, response.data.results[0].name, response.data.results[0].description);

                if (response.data.results[0].description == "") {
                    document.getElementById('description').textContent = 'No tiene descripcion';
                }
            
            });

        
        })
        .catch(error => {

            let msjError = document.createElement('p');
            let sectionImgSearch = document.getElementById('section-img-search');
            sectionImgSearch.appendChild(msjError);
            msjError.innerHTML = 'imagen no disponible';
        });

    }
    

    btnSearch.addEventListener('click', filtrar);
    

function poneImagenes(info) {
    

    info.forEach((element) => { 
        

        if (!element.thumbnail.path.includes('image_not_available')) {
            let img = document.createElement('img');
            let divImg = document.createElement('div');
            let name = document.createElement('p');
            
            img.setAttribute('class', 'img-hero');
            divImg.setAttribute('class', 'div-img');
            name.setAttribute('class', 'name-hero');
    
            divImgCtn.appendChild(divImg);
            divImg.appendChild(img);
            divImg.appendChild(name);
            img.src = `${element.thumbnail.path}/standard_xlarge.${element.thumbnail.extension}`;
            name.innerHTML = element.name;

            
            img.addEventListener('click', () => {

                popUp(`${element.thumbnail.path}/standard_xlarge.${element.thumbnail.extension}`,element.name, element.description);

                if (element.description == "") {
                    document.getElementById('description').textContent = 'No tiene descripcion';
                }
                
            });
        }
    }
    );
}


let slider = () => {

    let arrowLeft = document.getElementById('arrow-left-ctn');
    let arrowRight = document.getElementById('arrow-right-ctn');

    arrowLeft.addEventListener('click', () => {
        document.getElementById('div-img-ctn').scrollLeft -= 560;
    });

    arrowRight.addEventListener('click', () => {
        document.getElementById('div-img-ctn').scrollLeft += 560;
    });

}

slider();


let popUp = (src,characterName,characterDescription) => {

    let popUpWrapper = document.createElement('div');
    let popUpCtn = document.createElement('div');
    let popUpCloseCtn = document.createElement('div');
    let popUpClose = document.createElement('i');
    let popUpContent = document.createElement('div');
    let img = document.createElement('img')
    let name = document.createElement('p')
    let description = document.createElement('p');


    popUpWrapper.setAttribute('class', 'pop-up-wrapper');
    popUpCtn.setAttribute('class', 'pop-up-ctn');
    popUpCtn.setAttribute('id', 'pop-up-ctn');
    popUpCloseCtn.setAttribute('class', 'pop-up-close-ctn');
    popUpClose.setAttribute('class', 'fas fa-times');
    popUpClose.setAttribute('id', 'pop-up-close');
    popUpContent.setAttribute('class', 'pop-up-content');
    popUpContent.setAttribute('id', 'pop-up-content');
    description.setAttribute('class', 'description');
    description.setAttribute('id', 'description');
    img.setAttribute('class', 'image-pop-up');
    name.setAttribute('class', 'name-pop-up');

    let imageSection = document.getElementById('image-section');

    imageSection.appendChild(popUpWrapper);
    popUpWrapper.appendChild(popUpCtn);
    popUpCtn.appendChild(popUpCloseCtn);
    popUpCloseCtn.appendChild(popUpClose);
    popUpCtn.appendChild(popUpContent);
    popUpContent.appendChild(img);
    popUpContent.appendChild(name);
    popUpContent.appendChild(description);
    img.src = src;
    name.textContent = characterName;
    description.textContent = characterDescription;

    popUpCloseCtn.addEventListener('click', () => {
        
        if (popUpWrapper !== null) {
            popUpWrapper.remove();
        }
    });

}

