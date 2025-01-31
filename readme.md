to run test: NODE_ENV=qa  npx playwright test --project="Google Chrome" --headed

to run test with specifi tag: NODE_ENV=qa  npx playwright test --project="Google Chrome" --headed --grep '@sanity'

to run test headless: NODE_ENV=qa  npx playwright test --project="Google Chrome"

to open html report=> npx playwright show-report test-results/htmlreport


allure report:

to install allure (1 time activity only) 

			mac => sudo npm install -g allure-commandline --save-dev

			win => npm install -g allure-commandline --save-dev

to generate allure report => allure generate allure-results -o allure-report --clean

to open allure report => allure open allure-report

to genarate encrypted password: 

   open file src/utils/passwordencrypt.js

   uncomment lines 33 & 34

   enter the password you want to encrypt as 1st param of method encryptPassword

   then run the file => node src/utils/passwordencrypt.js

   encrypted password will be printed on console

   copy it and paste in .env files again password key

   makesure to comment back 33 & 34
   