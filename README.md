# Rent-App
1. Install the package <br/>
 <b>npm install</b>

2. Create database and collection. The script can be only run once since it create a account on firebase. If the console shows the account is already exists, change the seed.js line 34 and line 44 with new account email.<b>Default according to seed .username:test8@8.com password:123456</b> <br/>
 To run the seed file please use the command
  <b>npm run-script build</b> or <b>npm run build</b>
3. Run the program <br/>
<b>npm start</b>

Contribution:All the team members contributed in genral error checking .<br/>
Tim Leonard:Helped with a portion of main page handlebar,forntend and js.Took care of adding security(xss),and a portion of accessibility and validation.  <br/>
Haritha Pothapragda: Wrote half of items db and seed file; main page, landing page, and profile handlebars and corresponding routings; part of validation and accesibility.<br/>
Kah Soon Yap: Dealt with things related to items; new listing page and functions, item edit, item deletion, Cloudinary (image uploading), general debugging.<br/>
Yue Pan: Wrote the registration, login, and search routing and corresponding front-end handlebars and js and database manipulation. Also, the half of the seed file.


Note:- the seed file contains only Hoboken.So if the user is in some other location please manually type Hoboken as the location in search bar.
