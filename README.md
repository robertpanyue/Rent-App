# Rent-App <br/>

Default account according to seed for login: test@test.com 123456

1. Install the package <br/>
 <b>npm install</b>

2. Open MongoDB<br/>

3. Create database and collection. The script can be only run once since it create a account on firebase. If the console shows the account is already exists, change the seed.js line 34 and line 44 with new account email.
 To run the seed file please use the command<br>
  <b>npm run-script build</b> or <b>npm run build</b>
4. Run the program <br/>
<b>npm start</b>

Note:- the seed file contains only Hoboken and New York. So if the user is in some other location please manually type Hoboken as the location in search bar.<br/>


Contribution:All the team members contributed in genral error checking .<br/>
Tim Leonard:Helped with a portion of main page handlebar,forntend and js.Took care of adding security(xss),and a portion of accessibility and validation.  <br/>
Haritha Pothapragda: Wrote half of items db and seed file; main page, landing page, and profile handlebars and corresponding routings; part of validation and accesibility.<br/>
Kah Soon Yap: Dealt with things related to items; new listing page and functions, item edit, item deletion, Cloudinary (image uploading), general debugging.<br/>
Yue Pan: Wrote the registration, login, and search routing and corresponding front-end handlebars and js and database manipulation. Also, the half of the seed file.

