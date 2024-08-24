//FillterStatus
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if (status) {
                url.searchParams.set("status",status);
            }else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href
        })
    })
}

//End FillterStatus

//Search    
    const formSearch = document.querySelector("#form-search");
    if (formSearch) {
        let url = new URL(window.location.href);
        formSearch.addEventListener("submit", (e) => {
            e.preventDefault();
            const keyword = e.target.elements.keyword.value;
            if (keyword) {
                url.searchParams.set("keyword",keyword);
            }else {
                url.searchParams.delete("keyword");
            }
            window.location.href = url.href;
        })
    }
    
//End Search

// Pagination
    const buttonPagination = document.querySelector("[ulpagination]");
    if (buttonPagination) {
        let url = new URL(window.location.href);
        const buttonpagi = buttonPagination.querySelectorAll("[button-pagi]");
        buttonpagi.forEach(button => {
            button.addEventListener("click",() => {
                const page = button.getAttribute("button-pagi");
                console.log(page);
                url.searchParams.set("page",page);
                window.location.href = url.href;
            })
        })
    }

//End Pagination

// CheckBoxMulti 
    const checkboxmulti = document.querySelector("[checkbox-multi]");
    if (checkboxmulti) {
        const inputcheckAll =checkboxmulti.querySelector("input[name='checkall']");
        const inputsId =checkboxmulti.querySelectorAll("input[name='id']");
        inputcheckAll.addEventListener("click",() => {
            if (inputcheckAll.checked) {
                inputsId.forEach(input => {
                    input.checked=true;
                })
            }else {
                inputsId.forEach(input => {
                    input.checked=false;
                })
            }
        })
        inputsId.forEach(input => {
            input.addEventListener("click", () => {
                const inputChecked = checkboxmulti.querySelectorAll("input[name='id']:checked").length;
                if (inputChecked == inputsId.length ) {
                    inputcheckAll.checked=true;
                }else {
                    inputcheckAll.checked=false;
                }
            })
        })
        
    }
    
//End CheckBoxMulti 

// Form ChangeMulti

    const FormChangeMulti = document.querySelector("[form-changed-multi]");
    if (FormChangeMulti) {
        FormChangeMulti.addEventListener("submit",(e) => {
            e.preventDefault();
            const checkboxmulti = document.querySelector("[checkbox-multi]");
            const inputChecked = checkboxmulti.querySelectorAll("input[name='id']:checked");
            const check = confirm("Ban Chac Chan Muon Ap Dung");
            const typeChange = FormChangeMulti.querySelector("select[name='type']").value;
            if (!check){
                return;
            }
            if (inputChecked.length > 0) {
                let ids=[];
                const inputmutil = document.querySelector("[inputchangemulti]");
                inputChecked.forEach(input => {
                    if (typeChange == "change-position") {
                        const position= input.closest('tr').querySelector("input[name='position']").value;
                        ids.push(`${input.value}-${position}`);
                    }else {
                        ids.push(input.value);
                    }
                })
                inputmutil.value=ids.join(", ");
                FormChangeMulti.submit();
            }else {
                alert("Vui long nhap it nhat 1 san pham");
            }
        })
    }

// End Form ChangeMulti

// Alert
    const alertsucces = document.querySelector("[show-alert]");
    if (alertsucces) {
        const closeAlert = alertsucces.querySelector("[alert-close]");
        const datatime = alertsucces.getAttribute("data-time");
        setTimeout(() => {
            alertsucces.classList.add("alert-hidden");
        },datatime)
        closeAlert.addEventListener("click",() => {
            alertsucces.classList.add("alert-hidden");
        })
    }

// End Alert 

//Previews Image Upload

    const uploadsImage =  document.querySelector("[uploads-image]");
    if (uploadsImage) {
        const uploadImageInput = uploadsImage.querySelector("[uploads-image-input]");
        const uploadImagePreview = uploadsImage.querySelector("[uploads-image-previews]");
        const buttondelete = uploadsImage.querySelector("[button-delete-uploads]");
        if ((uploadImageInput.value == "") && (uploadImagePreview.getAttribute("src") == "")) {
            buttondelete.classList.add("button-hidden");    
        }  
        uploadImageInput.addEventListener("change",(e) => {
            const [file] = e.target.files;
            if (file) {
                uploadImagePreview.src= URL.createObjectURL(file);
                buttondelete.classList.remove("button-hidden");
            }
        })
        buttondelete.addEventListener("click",() => {
            uploadImageInput.value="";
            uploadImagePreview.src="";
            buttondelete.classList.add("button-hidden");
        })
    }
    

//Previews Image Upload


// Sort
    const sort = document.querySelector("[sort]");
    if (sort) {
        let url = new URL(window.location.href);
        const selectSort = sort.querySelector("[sort-select]");
        const btnClear = sort.querySelector("[sort-clear]");
        selectSort.addEventListener("change", (e) => {
            const Value = e.target.value;
            const [sortKey,sortValue] = Value.split("-");
            url.searchParams.set("sortKey",sortKey);
            url.searchParams.set("sortValue",sortValue);
            window.location.href = url.href;
        })
        btnClear.addEventListener("click", () => {
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue");
            window.location.href = url.href;
        })
        const sortkey = url.searchParams.get("sortKey");
        const sortvalue = url.searchParams.get("sortValue");
        if (sortkey && sortvalue) {
            const stringsort = `${sortkey}-${sortvalue}`;
            const optionSelected = selectSort.querySelector(`option[value=${stringsort}]`);
            optionSelected.selected = true;
        }
    }

    
//End Sort