// ChangeStatus
    const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
    if (buttonChangeStatus.length > 0) {
        const formchangeStatus = document.querySelector("#form-change-status");
        const path =formchangeStatus.getAttribute("data-path");
        buttonChangeStatus.forEach(button => {
            button.addEventListener("click",() => {
                const id = button.getAttribute("data-id");
                const currentStatus = button.getAttribute("data-status");
                const StatusChange = currentStatus == "active" ? "inactive" :"active"
                const action = path + `/${StatusChange}/${id}?_method=PATCH`;
                formchangeStatus.action=action;
                formchangeStatus.submit();
            })
        })
    }

//End ChangeStatus

// Delete
    const buttonDelete =document.querySelectorAll("[button-delete]");
    if (buttonDelete.length > 0) {
        const formDeleteItem =document.querySelector("#form-delete-item");
        const path = formDeleteItem.getAttribute("data-path");
        buttonDelete.forEach(button => {
            button.addEventListener("click",() => {
                const isConfirm = confirm("Ban Co Chan Muon Xoa");
                if (!isConfirm) {
                    return;
                }
                const id = button.getAttribute("data-id");
                const action = path + `/${id}?_method=DELETE`;
                formDeleteItem.action=action;
                formDeleteItem.submit();
            })
        })
    }

// End Delete

// Restore
    const buttonrestore = document.querySelectorAll("[button-restore]");
    if (buttonrestore.length > 0) {
        const formDeleteItem =document.querySelector("#form-change-restore");
        const path = formDeleteItem.getAttribute("data-path");
        buttonrestore.forEach(button => {
            button.addEventListener("click", () => {
                const id = button.getAttribute("data-id");
                const action = path + `/${id}?_method=PATCH`;
                formDeleteItem.action=action;
                formDeleteItem.submit();
            })
        })
    }

//End Restore