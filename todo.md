
create a seperate mongo schema for emial templates linked with each user. 

use pdf js by mozilla to display the pdf. 


============== EMAIL TEMPLATES ==============

exports.propertiesListByUser

use this service to return back the resultes, after getting the user's email in the 

data passsed as $Post. 



>  Make sure when i upload the data in teh mongodb,   i upload them into the specific user's cohort . 

> Also change the search api  > Make sure that it searches in the propertiesListByUser



alias ladd='mongoimport --db mean-dev --collection jp_ca@ymail.com --jsonArray --file '


How do i make sure that all the cohorts have Seperate ids ?


> CHNAGE >  make sure when i update the chnages in teh properties, it send the data to the exact cohort 
that which the user is logged in..  


> CHNAGE the above Cohort changes for the TODAY API ALSO. 


============== DO  DO  DO   DO ==============

When user signsup, it shoudl be logged in as that user , not the old user. 

-----------
> how to make the services secure ?
anybody can call a service   exports.propertiesListByUser 
How is the system checking if its called by that specific user ?

Probably in the policies,   properties.server.policy.js 

 or you can send the password in teh backend too, then make sure if its the right user by verifying the password. 
 

-----------




-----------



-----------









====================================================

Create Cohorts - 

Ability for the users to search for properties - 

Add them to their followup list. 

Signup. 



====================================================




====================================================


before deploying 
in controller 
  var todayDate = nowMoment.format('M/D/YY');
take away the static date. 

====================================================

AUTHENTICATION - 

admin- 

jp_ca
Jalliaccount9$





forgot password isn't working - hav ethe gmail email hooked up here. 
from the previous LTG folder. 






=============
LOCAL STORAGE 


Initialize the caching in the CacheUpdatePropertiesCount  service. 


> not just push the saved / changed properties but also make sure if the data is changed second time,, 
Just clone/ delete the old object and upload new object to it. 

> implement UI  spinner when the app is called, 

> IMPLEMENT AUTHENTICATION SERVICE 

>


its not updating the prop list in the local caache in browser. 
intialize it in the controller like the library... 

============================================================
============================================================
https://github.com/gsklee/ngStorage


If local storage has values, even with the first page load it should'nt call the localhost:8000 api


UPDATE THE PROP DATA ON TEH LOCAL STORAGE not call the serivces. 

AT THE END ABILITY TO UPDATE ALL THE CONTENT IN THE SERVER... 
{ create an array that keeps track of changed prop ids, so that later we can push / updat the server in one go. }


Bi_weekly doesnt pull the data from local /  doesnt update quickly... 


Implement negation of console.log ( Except for from which server is the call coming from )

UPLOAD the contents which are chnaged from cache default Arr   to the cloud.... 


============================================================
create a menu item for bi-polite people too...
Segregate items by date in all the views, for easy readibility.. 
implement date picker - https://github.com/rajeshwarpatlolla/ionic-datepicker
============================================================
ABILITY TO HIDE THE AGENT RECORD WHEN A CALL IS DONE FROM THE LIST OF TODAYS... 
ABILITY TO HIDE THE AGENT RECORD WHEN A PRIORITY IS ASSIGNED... 
{ 
IF the property have any of the following call_priorties - hide it. 

}



when displaying the DATA  it requires REFRESH |  improve it.. ! 
coz it saves the data in teh DB,  have it retrieve from the local storage. 


Implement PM2




Do somehting/ change  with last day call was made so that it disappears from there. 





IMPLEMENT SELECT TODAY properties   automatically... 


=> FOR ALL PROPERTIES CALL -  eliminate the properties that are SOLD properties and Grey Ones. 



IMPLEMENT RED PRIORITY 
IMPLEMENT "BI Weekly"





+ WrongNo VM followUp | sort then by wrong no, vm left, followup. 
SORT IT FROM TODAY TO BACK THE PAST. 



If the update to the backedend gives an error - show a toast or something... 
check the bookmark that i created named IONIC notification in chrome

Use the meanjs notificaiton system... 


If selected closing option - ability to select the date it will be closing on. 






implement ngStorage - https://github.com/gsklee/ngStorage

synch data with mongo 
https://github.com/mWater/minimongo












https://goo.gl/qK2dbZ
sudo ionic run ios --device






LOCAL STORAGE - 
bower install angular-local-storage --save





EMAIL DAVE ON hiring SOMEONE...





===== LATER ===

Transport the chat app from mean js to IONIC. 



Authentication for differnt users to log in... 

Server side - Properties only send properties that are associated with that user. 


Ability to send email from the ionic itself....


ABILITY TO ADD MULTIPLE PHOne nos like in iPhone. 

Put the phone numbers and names in google contacts in one go... 


IN TODAY - change the color or properties. 


Save the phone numbers from the db to google contacts....

LOADING....
http://ionicframework.com/docs/api/service/%24ionicLoading/



Color the priorities on the menu page by  red = "red background.. "
"Bi Weekly  green background.. "



List divider by date when date changes, 
http://ionicframework.com/docs/components/#item-dividers


Infinite scroll 
http://ionicframework.com/docs/api/directive/ionInfiniteScroll/


2. seperate the list value by thousands put commas in between. 


===== =====  SPARE TIME ===== =====  

INSTALL APPLE CERTIFICATES   

https://goo.gl/S3cett



 ============DONE ============

SEARCH 
example. 
http://codepen.io/bgrossi/pen/JtvsL

ADD - NOTES - 
http://codepen.io/ionic/pen/VLwLOG


SEARCH FUNCTIONALITY IS IMP <<----


Ionic loading gifs. 
http://codepen.io/ionic/pen/GgwVON


MODAL for creating NOTES 
http://codepen.io/kevincobain2000/pen/RWjoNR

http://codepen.io/kevincobain2000/pen/EjJzjx


Implement the search funcitonality in properties.html 
Implement the search spinner in properties.html 


minify the ionic framework 
http://blog.ionic.io/minifying-your-source-code/


List divider 
https://github.com/andrewmcgivery/ionic-ion-autoListDivider

ionic components 

https://github.com/Alexintosh/Awesome-Ionic

ionic icons 

https://www.tutorialspoint.com/ionic/ionic_icons.html
https://ionicframework.com/docs/v2/ionicons/

