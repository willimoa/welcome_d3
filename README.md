#welcome_d3

![Screen Shot](https://github.com/willimoa/welcome_d3/blob/master/static/images/web2py_d3graphmodel.png)

Based on the web2py welcome app, with the following additions:

1. Added d3.min.js to static/js folder
2. Added a models/sample_model.py for some extra tables
3. Added d3_graph_model function to controlers/appadmin.py controller
4. Updated views/appadmin.html
  * d3 \<style\> and \<script\> included in appadmin.html.  These could be split into separate files

5. Added some screenshots under /static/images



For a full working solution, also add this to the admin app, views/default/design.html after line 109:
```html
{{=button(URL(a=app, c='appadmin',f='d3_graph_model'), T('d3 graph model'))}}
```

And you'll see:
![Admin App](https://github.com/willimoa/welcome_d3/blob/master/static/images/web2pyadmin_with_d3graph.png)

##To do
- [ ] Test with a more complex model (May need to change the sizing and force parameters)
- [ ] Improve style of graph and hover text