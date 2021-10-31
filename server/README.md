# portfolio-application
NODE.JS -- EXPRESS
You will need: SQUARE ACCOUNT, AMAZON WEB SERVICES ACCOUNT

.ENV VARIABLES: 
MONGO_DB_SECRET_KEY, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, SQUARE_ACCESS_TOKEN

This project is a backend portion of a application that allows the user to import resume then transform into a s3 hosting bucket website.

MODELS:

[User, Website, Project, Education, Experience, Profile, Payment, Price]



FUNCTIONS:

/controller/functions/internal [getPrice, getUserPayments, getUser, getUserProfile, getUserWebsite, etc...]

/controller/functions/external [getCustomer, getCustomerCard, uploadToBucket, createUserBucket, etc...]

AWS (S3, CLOUDWATCH(coming soon), ROUTE53(coming soon)) SDK

SQUARE CONNECT API 




ROUTES:

/dashboard -- routes to crud projects, educations, experiences for user. -- authRoute

/billing -- routes to crud subscriptions, cards, and payments for user -- authRoute

/resume -- routes to upload resume, crud resume into projects, educations, education, and website

/profile -- routes to crud profile and user 

/login -- route to authorize user

/logout -- route to unauthorize user

/register -- route to register user
