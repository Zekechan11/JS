
function loadData(){
    $.ajax({
        url: "categories.php"
    }).done(function(data){
        console.log(data);
        
        let result = JSON.parse(data);
        
        var template = document.querySelector("#categoryRowTemplate");
        var parent = document.querySelector("#tableBody");
        
        result.forEach(item => {
            let clone = template.content.cloneNode(true);
            clone.querySelector("tr td.id").innerHTML = item.category_id;
            clone.querySelector("tr td.name").innerHTML = item.category_name;
            parent.appendChild(clone);
        });
    });
  }
  
  loadData();
  
  $("#btnSaveCategory").click(function(){
    var categoryName = document.querySelector("#categoryName").value;
    if(categoryName.length > 0){
        $.ajax({
            url:  "categories.create.php",
            type: "GET",
            data: {
                name: categoryName
            }
        }).done(function(data){
            let result = JSON.parse(data);
            if(result.res == "success"){
                location.reload();
            }
        })
    }
  });
  
  $(document).on("click", ".btnUpdate", function(){
    var categoryId = $(this).closest("tr").find(".id").text();
    var categoryName = $(this).closest("tr").find(".name").text();
    
    $("#updateCategoryId").val(categoryId);
    $("#updateCategoryName").val(categoryName);
    
    $("#updateModal").modal("show");
  });
  
  $("#btnUpdateCategory").click(function(){
    var categoryId = $("#updateCategoryId").val();
    var categoryName = $("#updateCategoryName").val();
    
    if(categoryName.length > 0){
        $.ajax({
            url:  "categories.update.php",
            type: "POST",
            data: {
                id: categoryId,
                name: categoryName
            }
        }).done(function(data){
            let result = JSON.parse(data);
            if(result.res == "success"){
                location.reload();
            }
        });
    }
  });
  
  $(document).on("click", ".btnDelete", function(){
    var categoryId = $(this).closest("tr").find(".id").text();
    
    if(confirm("Are you sure you want to delete this category?")) {
        $.ajax({
            url: "categories.delete.php",
            type: "POST",
            data: {
                id: categoryId
            }
        }).done(function(data){
            let result = JSON.parse(data);
            if(result.res == "success"){
                location.reload();
            }
        });
    }
  });