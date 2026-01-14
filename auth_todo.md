 signup: "POST /api/auth/signup",  isme 4 fields hai name , email , password , and role 
 login: "POST /api/auth/login",    isme 2 chije hai email and password 
 logout: "POST /api/auth/logout",
 googleAuth: "POST /api/auth/google" google auth on button pr kam krega

 google client id and client secret .env m hai ye dono backend m b set up hai

 create protected routes for frontend 
 like without login koi roles ke home page ko acess na kr pae if koi access kre to sign in pr redirect
 and har role ke liye protected route alag alag hoga admin user client ke routes ko acess nhi kr skta and client wala user admin routes ko access nhi kr skta 
 login and sign up hote hi uske role ke hisab se uske home page pr redirect krega 

 and these are protected endpoints 
 profile": "GET /api/protected/me",
"adminDashboard": "GET /api/protected/admin-dashboard",
"advocateCases": "GET /api/protected/advocate-cases",
"clientCases": "GET /api/protected/my-cases",
"paralegalTasks": "GET /api/protected/paralegal-tasks",
"legalDocuments": "GET /api/protected/legal-documents",
"notifications": "GET /api/protected/notifications"

agar ye use m aae to use kr le and a complete auth system tyar ho jae 
and agar user loged in hai to /home abhi jo hai usme sigin signup ki jagah ek user type dikhna chahiye user ka name or ek user icon acording to ui isko b shi s laga dio or uspe click krte hi apne role ke home page pr redirect ok 

## API Endpoints Summary

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/auth/signup` | POST | Traditional signup | No |
| `/api/auth/login` | POST | Traditional login | No |
| `/api/auth/google` | POST | Google OAuth login/signup | No |
| `/api/auth/logout` | POST | Logout | No |
| `/api/protected/me` | GET | Get user profile | Yes |


and har ek sensitive chij ko try catch m likh with log message kch ese console.log("sign up eror from backend " , eror) taki eror find krne m preshani na ho

and isme jo jo packages ki jarurt hai usko install kr lio then complete working auth milna chaiye


