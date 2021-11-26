const $ = (selector) => document.querySelector(selector);

function App() {

    const updateCount = () => {
        const menuCount = $("#coffee-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount}개`;
    }

    const coffeeSubmit = () =>{
        if ($("#coffee-name").value === ""){
            alert("값을 입력해 주세요");
            return;
        }

    $("#coffee-list").addEventListener("click", (e) => {
        if(e.target.classList.contains("edit-button")){
            const $menuName = e.target.closest("li").querySelector(".menu-name") 
            const menuName = $menuName.innerText;
            const updatedMenu = prompt("메뉴명을 수정하세요", menuName);
            
            $menuName.innerText = updatedMenu;
        }

        if(e.target.classList.contains("delete-button")){
            if(confirm("삭제 하시겠습니까?")){
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
        
        const coffeeName = $("#coffee-name").value;
        const menuTemplate = (coffeeName) => {
            return `
            <li class="menu-list">
                <p class= "menu-name">
                    ${coffeeName}
                </p>
                <div class="button-wrap">
                    <button class="edit-button">
                        수정
                    </button>
                    <button class="delete-button">
                        삭제
                    </button>
                </div>
            </li>`
        };
        $("#coffee-list").insertAdjacentHTML(
            "beforeend", menuTemplate(coffeeName)
        );
        //$("#coffee-list").innerHTML = menuTemplate(coffeeName);
        updateCount();
        $("#coffee-name").value = "";
    }

    $("#submit-button").addEventListener("click", () => {
        coffeeSubmit();
    })
    $("#coffee-name")
        .addEventListener("keypress", (e) => {
            if (e.key !== "Enter"){
                return;
            }
            coffeeSubmit();
        });
}

App();