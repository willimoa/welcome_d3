#welcome_d3

![model visualisation with d3](https://github.com/willimoa/welcome_d3/tree/master/static/images/web2py_d3graphmodel.png "Screen Shot 1")

Based on the web2py welcome app, with the following additions:
1. Added d3.min.js to static/js folder
2. Added a models/sample_model.py for some extra tables
3. Added d3_graph_model function to controlers/appadmin.py controller
4. Updated views/appadmin.
5. Added some screenshots under /static/images

--* d3 style and script included in appadmin.html.  These could be split into separate files

For a full working solution, also add this to the admin app, views/default/design.html:
```html
{{=button(URL(a=app, c='appadmin',f='d3_graph_model'), T('d3 graph model'))}}
```