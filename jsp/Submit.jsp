<html>

  <head>
    <title>Order Confrimation</title>
    <link rel="stylesheet" type="text/css" href="/jadrn046/CSS/Header.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="/jadrn046/JS/Submit.js"></script>
    <script src="/jadrn046/JS/shopping_cart.js"></script>
    <link rel="stylesheet" type="text/css" href="/jadrn046/CSS/Cart.css">
    <link rel="stylesheet" type="text/css" href="/jadrn046/CSS/Submit.css">
  </head>

  <body>
    <header>
        <div id="Title"><a href="http://jadran.sdsu.edu/jadrn046/proj2.html">The Camara Store</a></div>     
      </header>
    <h1 id="Notification">Thank you for shopping with us<br>Your order summary</h1>
    <blockquote>
      <code>
        <table id="SubmitForm" border="0">
          <thead >
        <td colspan="2"><b>Shipping Address</b></td>
      </thead>
      <tr>
        <td id="FirstColumn">Name</td>
        <td><%= request.getParameter("FName")%> <%= request.getParameter("LName")%></td>
      </tr>
      <tr>
        <td>Card</td>
        <td>XXXX XXXX XXXX <%= (request.getParameter("Card")).substring(12) %></td>
      </tr>
      <tr>
        <td>Address</td>
        <td><%= request.getParameter("Add01")%> <%= request.getParameter("Add02")%> <%= request.getParameter("City")%> <%= request.getParameter("State")%> <%= request.getParameter("Zip")%> </td>
      </tr>
      <tr>
        <td>Phone</td>
        <td><%= request.getParameter("Phone")%></td>
      </tr>
      <tr>
        <td>Email ID</td>
        <td><%= request.getParameter("EmailID")%></td>
      </tr>
    </table>
      </code>
    </blockquote>
  </body>
</html>
