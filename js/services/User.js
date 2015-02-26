////////// User //////////
// Makes the AuthenticatedUserID available across controllers

app.factory("User",function(){
	return AuthenticatedUserID;
});