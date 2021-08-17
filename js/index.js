let houseContainer = 1;

window.addEventListener('DOMContentLoaded', (event) => {
    const url = "https://estate-comparison.codeboot.cz/list.php";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let listHouses = document.querySelector(".list-houses");
            for(let i = 0; i < data.length; i++) {
                let container = document.createElement("div");
                container.classList.add("house-thumbnail");
                container.setAttribute("id", data[i].id);
                container.addEventListener("click", selectHouse);

                let image = document.createElement("img");
                image.setAttribute("src", data[i].images[0]);

                let name = document.createElement("p");
                name.textContent = data[i].name_extracted + ", " + data[i].locality;

                container.appendChild(image);
                container.appendChild(name);

                listHouses.appendChild(container);
            }
        });
});

function selectHouse(e) {
    let id = e.currentTarget.getAttribute("id");
    let houseUrl = "https://estate-comparison.codeboot.cz/detail.php?id=";

    fetch(houseUrl + id)
        .then(response => response.json())
        .then(data => {
            let house = document.querySelector(`.house-${houseContainer}`);
            let otherHouse;
            if (houseContainer == 1) {
                otherHouse = document.querySelector(".house-2");
            } else {
                otherHouse = document.querySelector(".house-1");
            }

            let image = house.querySelector("img");
            image.setAttribute("src", data.images[0]);

            let description = house.querySelector(".description p");
            description.textContent = data.name;

            let price = house.querySelector(".price .prize_czk");
            price.textContent = data.prize_czk;
            let otherPrice = otherHouse.querySelector(".price .prize_czk");
            compareValues(price, otherPrice, false);

            let locality = house.querySelector(".city .locality");
            locality.textContent = data.locality;

            let buildingArea = house.querySelector(".floor-area .building_area");
            buildingArea.textContent = data.building_area;
            let otherBuildingArea = otherHouse.querySelector(".floor-area .building_area");
            compareValues(buildingArea, otherBuildingArea, true);

            let landArea = house.querySelector(".land-area .land_area");
            landArea.textContent = data.land_area;
            let otherLandArea = otherHouse.querySelector(".land-area .land_area");
            compareValues(landArea, otherLandArea, true);

            let companyLogo = house.querySelector(".company-name img");
            companyLogo.setAttribute("src", data.company_logo);
            let companyName = house.querySelector(".company-name p");
            companyName.textContent = data.company_name;

            
            if (houseContainer == 1) {
                houseContainer = 2;
            } else {
                houseContainer = 1;
            }
            
        })
}

function compareValues(first, second, isHigher) {
    let val = 0;
    if (isHigher) {
        val = parseInt(first.textContent) - parseInt(second.textContent);
    } else {
        val = parseInt(second.textContent) - parseInt(first.textContent);
    }
    if (val > 0) {
        first.parentElement.classList.add("green");
        first.parentElement.classList.remove("red");
        second.parentElement.classList.add("red");
        second.parentElement.classList.remove("green");
    } else {
        first.parentElement.classList.add("red");
        first.parentElement.classList.remove("green");
        second.parentElement.classList.remove("red");
        second.parentElement.classList.add("green");
    }
}