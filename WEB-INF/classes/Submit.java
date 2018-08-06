import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import sdsu.*;


public class Submit extends HttpServlet {


    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {   
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    String SKU = request.getParameter("SKU"); 
    String Quantity = request.getParameter("Quantity");   	

        out.println(DBHelper.upadteQuery("UPDATE product SET quantity = quantity - "+ Quantity  +" WHERE sku ='" + SKU + "';"));
    }
    
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}