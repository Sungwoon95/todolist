const $ = (selector) => document.querySelector(selector);

const store = {
    setLocalStorage(menu){
        localStorage.setItem("menu", JSON.stringify(menu));
    },
    getLocalStorage(){
        return JSON.parse(localStorage.getItem("menu"));
    }

}

function App() {
    this.menu = [];
    this.init = () => {
        if (store.getLocalStorage().length > 1){
            this.menu = store.getLocalStorage();
            console.log(this.menu);
        }
        render();
    }
    
    const render = () => {
        const template = this.menu.map((item, index) => {
            return `
            <li class="menu-list" data-menu-id="${index}">
                <p class= "menu-name">
                    ${item.name}
                </p>
                <div class="button-wrap">
                    <button class="edit-button">
                        <span class="material-icons edit-icon">edit</span>
                    </button>
                    <button class="delete-button">
                    <span class="material-icons delete-icon">delete</span>
                    </button>
                </div>
            </li>`
        }).join("");
        $("#coffee-list").innerHTML = template;
    }

    const updateCount = () => {
        const menuCount = $("#coffee-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount}개`;
    }

    const coffeeSubmit = () =>{
        if ($("#coffee-name").value === ""){
            alert("값을 입력해 주세요");
            return;
        }

        const coffeeName = $("#coffee-name").value;
        this.menu.push({ name: coffeeName});
        store.setLocalStorage(this.menu);
        render();
        $("#coffee-name").value = "";
    }

    $("#coffee-list").addEventListener("click", (e) => {
        if(e.target.classList.contains("edit-icon")){
            const menuId = e.target.closest("li").dataset.menuId;
            const $menuName = e.target.closest("li").querySelector(".menu-name") 
            const menuName = $menuName.innerText;
            const updatedMenu = prompt("메뉴명을 수정하세요", menuName);
            this.menu[menuId].name = updatedMenu;
            store.setLocalStorage(this.menu);
            $menuName.innerText = updatedMenu;
        }

        if(e.target.classList.contains("delete-icon")){
            if(confirm("삭제 하시겠습니까?")){
                const menuId = e.target.closest("li").dataset.menuId
                this.menu.splice(menuId, 1)
                store.setLocalStorage(this.menu);
                e.target.closest("li").remove();
                updateCount();
            }
        }
    })

    // 폼 태그 자동 전송 방지
    $("#coffee-form")
        .addEventListener("submit", (e) => {
            e.preventDefault()
        })
    // 메뉴 입력
        //$("#coffee-list").innerHTML = menuTemplate(coffeeName);
        

    $("#submit-button").addEventListener("click", () => {
        coffeeSubmit();
        updateCount();
    })
    $("#coffee-name")
        .addEventListener("keypress", (e) => {
            if (e.key !== "Enter"){
                return;
            }
            coffeeSubmit();
            updateCount();
        });

}

const app = new App();
app.init();