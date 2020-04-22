package modules

import geb.spock.GebReportingSpec
import geb.Module
import geb.Browser
import pages.app.HomePage
import pages.app.SettingsProfilePage

import spock.lang.Unroll

import java.io.File
import java.io.IOException



class LoginModule extends Module {

    static content = {
      adminLogin(wait: true) { $("#authentication.signinadmin") }
      signIn { $("#authentication.signin") }
      adminLoginInput { $("#username") }
      passwordInput { $("#password") }
      commitButton { $("button", type:"submit") }

      signinButton { $("#authentication.gov") }
      loginInput { $("input", id:"login_field") }
      userDisplayPicture { $("img", class:"header-profile-image") }
      gitHubLink { $("a", "ng-click":"vm.callOauthProvider('/api/auth/github')")[0] }
   
    }
   

    Boolean "Login As An Administrator"(java.lang.String userName, java.lang.String passWord, java.lang.String fullUserName){
        // Since the targeted link is not yet visible, Chrome will fail, so we forcefully do stuff
        js.exec('window.scrollTo(0, document.body.scrollHeight);')
        js.exec('window.scrollTo(document.body.scrollHeight, 0);')
        js.exec('document.getElementById("authentication.signinadmin").scrollIntoView(true);')
        js.exec('document.getElementById("authentication.signinadmin").click();') //adminLogin.click()

        waitFor { adminLoginInput }
        adminLoginInput.value( userName ) //admin
        passwordInput.value( passWord ) //adminadmin
        js.exec('window.scrollTo(0, document.body.scrollHeight);')
        commitButton.click()

        //I do not worry if the picture is present or not
     /*   waitFor { userDisplayPicture.displayed }
        if ( userDisplayPicture.displayed ) //"ADMIN LOCAL"
            return true
        else
            return false
     */       
    }


    Boolean "Logout as administrator"(java.lang.String baseURL){
        
        def  AdminIconLocation = baseURL + "img/default.png"

        if (!$("img",src:"${AdminIconLocation}"))  {
            println("Not logged as admin")
            return true
        }
        else {
            $("img",src:"${AdminIconLocation}").click()
            sleep(1000)
            //This line click in the Log Out option of the previous drop down list
            $("a",'data-automation-id':"lnkSignOut").click()
            println("Just logged off as admin")
            return true
        }
    }


 Boolean "Logout as user"(){
        
        if ($("img",'data-automation-id':"UserAvatarImage" ).displayed) {
            println("Logged as user")
            sleep(500)
            $("img",'data-automation-id':"UserAvatarImage" ).click()
            sleep(500)
            //This line click in the Log Out option of the previous drop down list
            $("a", href:"/api/auth/signout" ).click()
            return true
        }
        else {
            println("Not logged as user")
            return true
        }
    }




  
}
