
function createAccountTab()
{
    var navlist = document.querySelector(".navlist");
    var user = document.cookie.user;
    var accountTab = document.createElement("li");
    var accountLink = document.createElement("a");
    accountLink.setAttribute("href", user?"account-settings.html":"login-page.html");
    accountLink.appendChild(document.createTextNode(user?user.username:"Log in"));
    accountTab.appendChild(accountLink);
    navlist.appendChild(accountTab);
}
createAccountTab();