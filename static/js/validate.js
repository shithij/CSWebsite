function validate()
{
    var nameFormat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var Name = document.forms["Contact"]["contactName"].value;
    var Email = document.forms["Contact"]["contactEmail"].value;
    var Subject = document.forms["Contact"]["contactSubject"].value;
    var Message = document.forms["Contact"]["contactMessage"].value;
    if( nameFormat.test(Name) && !Name == "")
    {
        document.getElementById("validMessage").innerHTML = "Name cannot be blank or have special characters";
        return false;
    }
    if( !mailFormat.test(Email) && !Email == "")
    {
        document.getElementById("validMessage").innerHTML = "Invalid e-mail entered";
        return false;
    }
}