<%@ Page Language="C#" CodeBehind="Default.aspx.cs" Inherits="WebApplication.Default" %>

<!doctype html>

<html ng-app="CapacityPlanning" ng-controller="MainCtrl" ng-init="InitPage()">
<head>
	<script type="text/javascript">
    	// THIS MUST BE LEFT AT THE TOP OF THE PAGE.
	    var AuthenticatedUserID = '<%=Session["UserID"] %>';
	    document.write('<base href="' + document.location + '" />');
	</script>
	<meta name="viewport" content="width=device-width" />
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
    <link rel="shortcut icon" type="image/png" href="/favicon-196x196.png" sizes="196x196">
    <link rel="shortcut icon" type="image/png" href="/favicon-160x160.png" sizes="160x160">
    <link rel="shortcut icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
    <link rel="shortcut icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="shortcut icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link href="libs/webfont-opensans/stylesheet.css" rel="stylesheet" rel="stylesheet" type="text/css" />
    <link href="libs/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <link href="libs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="css/site.css"/>
    <title>{{PageTitle}}</title>
</head>
<body>
    <ng-server-select></ng-server-select>
	<div ng-include="'partials/header.html'"></div>

	<div class="">
		<div ui-view></div>
	</div>

    <div ng-include="'partials/footer.html'"></div>

    <script src="js/app.js"></script>
</body>
</html>