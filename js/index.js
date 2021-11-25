const $ = (selector) => document.querySelector(selector);

function App() {
    // 폼 태그 자동 전송 방지
    $("#coffee-form")
        .addEventListener("submit", (e) => {
            e.preventDefault()
        })
    // 메뉴 입력

    const coffeeSubmit = () =>{
        if ($("#coffee-name").value === ""){
            alert("값을 입력해 주세요");
            return;
        }
        
        const coffeeName = $("#coffee-name").value;
        const menuTemplate = (coffeeName) => {
            return `<li>${coffeeName}</li>`
        };
        $("#coffee-list").insertAdjacentHTML(
            "beforeend", menuTemplate(coffeeName)
        );
        //$("#coffee-list").innerHTML = menuTemplate(coffeeName);
        const menuCount = $("#coffee-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount}개`;
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