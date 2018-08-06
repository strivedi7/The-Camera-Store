import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import sdsu.*;


public class Search extends HttpServlet {


    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {   
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    String parameters = request.getParameter("Keyword");   	
        out.println(DBHelper.myQuery("SELECT DISTINCT sku, vendorModel, vendor.name, category.name, quantity, retail, description, features, image FROM vendor, category, product WHERE vendor.id=product.venID AND category.id=product.catID AND description LIKE '%" + parameters +"%' OR features LIKE '%" + parameters +"%';"));
    }
    
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}