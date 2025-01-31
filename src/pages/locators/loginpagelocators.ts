export default class LoginPageLocators {
    static MY_ACCOUNT_LINK = "//a[contains(.,'My account') and @role]";
    static EMAIL_INPUT = "[name=email]";
    static PASSWORD_INPUT = "[name=password]";
    static LOGIN_BUTTON = "[Value=Login]";
    static LOGOUT_LINK = "//a[contains(.,'Logout') and @class='list-group-item']";
    static CONTINUE_BUTTON = "a >> text=Continue";
}
